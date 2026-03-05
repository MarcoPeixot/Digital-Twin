import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
// CORREÇÃO: Importe cada função do seu respectivo arquivo.
import { createPixTransferEvent } from '@/lib/events'
import { publishCepEvent } from '@/lib/kafka'
import logger from '@/lib/logger'


export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { receiverCpf, amount } = await request.json()
  const parsedAmount = parseFloat(amount)
  const senderId = (session.user as any).id

  if (!receiverCpf || !parsedAmount || parsedAmount <= 0) {
    return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 })
  }

  try {
    // A transação do banco continua a mesma para garantir a atomicidade dos dados
    await prisma.$transaction(async (tx) => {
      const senderAccount = await tx.account.findUnique({ where: { userId: senderId } })
      if (!senderAccount) throw new Error('Conta do remetente não encontrada')

      const receiver = await tx.user.findUnique({ where: { cpf: receiverCpf } })
      if (!receiver) throw new Error('CPF do destinatário não encontrado')
      if (receiver.id === senderId) throw new Error('Não é possível transferir para si mesmo')
      
      const receiverAccount = await tx.account.findUnique({ where: { userId: receiver.id } })
      if (!receiverAccount) throw new Error('Conta do destinatário não encontrada')

      if (senderAccount.balance < parsedAmount) throw new Error('Saldo insuficiente')

      await tx.account.update({ where: { id: senderAccount.id }, data: { balance: { decrement: parsedAmount } } })
      await tx.account.update({ where: { id: receiverAccount.id }, data: { balance: { increment: parsedAmount } } })

      await tx.transaction.create({
        data: {
          amount: parsedAmount,
          senderAccountId: senderAccount.id,
          receiverAccountId: receiverAccount.id,
          description: `PIX para ${receiver.name}`,
        },
      })
    })

    // **PUBLICA EVENTO DE SUCESSO NO KAFKA**
    const successEvent = createPixTransferEvent('PIX_TRANSFER_SUCCESS', {
      userId: senderId,
      receiverCpf,
      amount: parsedAmount
    });
    await publishCepEvent('financial-transactions', successEvent);

    return NextResponse.json({ message: 'Transferência realizada com sucesso!' })
  } catch (error: any) {
    // **PUBLICA EVENTO DE FALHA NO KAFKA**
    const failureEvent = createPixTransferEvent('PIX_TRANSFER_FAILURE', {
      userId: senderId,
      receiverCpf,
      amount: parsedAmount,
      error: error.message
    });
    await publishCepEvent('financial-transactions', failureEvent);
    
    logger.error({ event: 'transfer_error', error: error.message }, 'Erro na transferência PIX')
    return NextResponse.json({ message: error.message || 'Erro na transferência' }, { status: 400 })
  }
}
