"use client"
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function PixTransfer() {
  const [isLoading, setIsLoading] = useState(false)
  const { mutate } = useSWRConfig()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const receiverCpf = formData.get("cpf") as string
    const amount = formData.get("amount") as string

    try {
      const response = await fetch('/api/transfer/pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverCpf, amount }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message)
      }

      toast.success("Transferência realizada com sucesso!")
      // Atualiza o saldo e o extrato automaticamente
      mutate('/api/account/balance')
      mutate('/api/account/transactions')
      ;(event.target as HTMLFormElement).reset()
    } catch (error: any) {
      toast.error("Erro na transferência", {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cpf">CPF do Destinatário</Label>
        <Input id="cpf" name="cpf" placeholder="000.000.000-00" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Valor (R$)</Label>
        <Input id="amount" name="amount" type="number" step="0.01" placeholder="100,00" required />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Enviando...' : 'Transferir'}
      </Button>
    </form>
  )
}