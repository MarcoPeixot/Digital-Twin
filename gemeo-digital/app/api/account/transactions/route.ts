import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import logger from '@/lib/logger'

export async function GET(request: NextRequest) { // Mude para NextRequest para ler a URL
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    logger.warn({ event: 'transactions_unauthorized' }, 'Tentativa de acesso não autorizado ao extrato')
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  
  // Extrai parâmetros de paginação da URL
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const skip = (page - 1) * limit

  try {
    const account = await prisma.account.findUnique({
      where: { userId: (session.user as any).id },
    })
    if (!account) {
      logger.warn({ event: 'transactions_account_not_found', userId: (session.user as any).id }, 'Conta não encontrada ao consultar extrato')
      return NextResponse.json({ error: 'Conta não encontrada' }, { status: 404 })
    }

    // Modifica a query do Prisma para usar 'take' (limite) e 'skip' (pular)
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ senderAccountId: account.id }, { receiverAccountId: account.id }],
      },
      include: {
        senderAccount: { include: { user: { select: { name: true } } } },
        receiverAccount: { include: { user: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit, // Pega 'limit' registros
      skip: skip,   // Pula 'skip' registros
    })

    // Opcional: Retornar o total para o frontend saber quantas páginas existem
    const totalTransactions = await prisma.transaction.count({
        where: { OR: [{ senderAccountId: account.id }, { receiverAccountId: account.id }] }
    })

    logger.info({
      event: 'transactions_success',
      userId: (session.user as any).id,
      count: transactions.length,
      page,
      limit,
      totalPages: Math.ceil(totalTransactions / limit)
    }, 'Consulta de extrato realizada com sucesso')

    return NextResponse.json({ transactions, totalPages: Math.ceil(totalTransactions / limit) })
  } catch (error) {
    logger.error({ event: 'transactions_error', error: (error as Error).message }, 'Erro ao consultar extrato')
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}