"use client"
import useSWR from 'swr'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetcher } from '@/lib/fetcher' // <-- Importe o novo fetcher

export function BalanceCard() {
  const { data, error } = useSWR('/api/account/balance', fetcher, { refreshInterval: 10000 })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saldo Disponível</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Agora este 'error' vai funcionar corretamente! */}
        {error && <p className="text-red-500">{error.message}</p>}
        {!data && !error && <p>Carregando...</p>}
        {data && <p className="text-2xl font-bold">{formatCurrency(data.balance)}</p>}
      </CardContent>
    </Card>
  )
}