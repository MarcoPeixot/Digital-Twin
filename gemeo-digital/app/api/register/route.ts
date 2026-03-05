import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import logger from '@/lib/logger'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, cpf, email, password } = body

    if (!name || !cpf || !email || !password) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios' }, { status: 400 })
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ cpf }, { email }] },
    })

    if (existingUser) {
      // **REGISTRO DE AUDITORIA DE CONFLITO**
      await prisma.auditLog.create({
        data: {
          action: "REGISTER_CONFLICT",
          entity: "User",
          entityId: cpf, // Usamos o CPF como identificador da tentativa
          details: {
            message: "Tentativa de registro com CPF ou Email já existente.",
            cpf,
            email,
          }
        }
      })
      return NextResponse.json({ message: 'CPF ou Email já cadastrado' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: { name, cpf, email, password: hashedPassword },
      })

      await tx.account.create({
        data: { userId: newUser.id, balance: 1000.00 },
      })

      // **REGISTRO DE AUDITORIA DE SUCESSO**
      await tx.auditLog.create({
        data: {
          userId: newUser.id,
          action: "REGISTER_SUCCESS",
          entity: "User",
          entityId: newUser.id,
          details: { ip: request.headers.get('x-forwarded-for') }
        }
      })

      return newUser
    })

    return NextResponse.json({ id: user.id, name: user.name, email: user.email }, { status: 201 })
  } catch (error) {
    logger.error({ event: 'register_error', error: (error as Error).message }, 'Erro no registro de usuário')
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}
