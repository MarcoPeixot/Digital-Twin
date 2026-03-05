"use client"
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { fetcher } from '@/lib/fetcher'
// Você precisará dos componentes de paginação do shadcn/ui ou similar
// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useState } from 'react'

export function TransactionHistory() {
  const { data: session, status } = useSession()
  const [page, setPage] = useState(1)

  // A URL agora inclui a página atual para a paginação funcionar
  const { data, error } = useSWR(`/api/account/transactions?page=${page}&limit=10`, fetcher)

  if (status === 'loading') {
    return <div>Carregando sessão...</div>
  }

  if (error) return <div>Falha ao carregar o extrato: {error.message}</div>
  if (!data) return <div>Carregando...</div>

  const userId = (session?.user as any)?.id

  // **AQUI ESTÁ A CORREÇÃO PRINCIPAL:**
  // Extraímos o array de transações de dentro do objeto 'data'
  const transactions = data?.transactions || []
  // const totalPages = data?.totalPages || 1

  return (
    <div className="space-y-4">
      {transactions.length === 0 && <p>Nenhuma transação encontrada.</p>}
      {transactions.map((tx: any) => {
        const isSent = tx.senderAccount?.userId === userId
        const amount = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tx.amount)
        const date = new Date(tx.createdAt).toLocaleDateString('pt-BR')
        const otherPartyName = isSent
          ? tx.receiverAccount?.user?.name || 'Destinatário desconhecido'
          : tx.senderAccount?.user?.name || 'Remetente desconhecido'
          
        return (
          <div key={tx.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {isSent ? `PIX Enviado para ${otherPartyName}` : `PIX Recebido de ${otherPartyName}`}
              </p>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
            <p className={`font-bold ${isSent ? 'text-red-600' : 'text-green-600'}`}>
              {isSent ? `- ${amount}` : `+ ${amount}`}
            </p>
          </div>
        )
      })}
      
      {/* Aqui entrariam os controles de paginação. 
        Você pode implementar usando os valores de 'page' e 'totalPages'.
        Ex: <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>Anterior</Button>
            <Button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>Próxima</Button>
      */}
    </div>
  )
}