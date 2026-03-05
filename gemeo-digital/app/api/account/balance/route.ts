import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import logger from '@/lib/logger'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    logger.warn({ event: 'balance_unauthorized' }, 'Tentativa de acesso não autorizado ao saldo')
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const account = await prisma.account.findUnique({
      where: { userId: (session.user as any).id },
    })

    if (!account) {
      logger.warn({ event: 'balance_not_found', userId: (session.user as any).id }, 'Conta não encontrada ao consultar saldo')
      return NextResponse.json({ error: 'Conta não encontrada' }, { status: 404 })
    }

    logger.info({ event: 'balance_success', userId: (session.user as any).id, balance: account.balance }, 'Consulta de saldo realizada com sucesso')
    return NextResponse.json({ balance: account.balance })
  } catch (error) {
    logger.error({ event: 'balance_error', error: (error as Error).message }, 'Erro ao consultar saldo')
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}