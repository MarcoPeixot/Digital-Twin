"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, LogOut, Wallet } from "lucide-react"
import { TransactionHistory } from "@/components/transaction-history"
import { BalanceCard } from "@/components/balance-card"
import { PixTransfer } from "@/components/pix-transfer"
import { useSession, signOut } from "next-auth/react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [router, status])

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" })
  }

  if (!isClient || status === "loading") {
    return null // Evita renderização no servidor
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Banco Digital</h1>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sair</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <BalanceCard />

        <Tabs defaultValue="extrato" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="extrato">
              <Wallet className="mr-2 h-4 w-4" />
              Extrato
            </TabsTrigger>
            <TabsTrigger value="pix">
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Transferência PIX
            </TabsTrigger>
          </TabsList>
          <TabsContent value="extrato">
            <Card>
              <CardHeader>
                <CardTitle>Extrato</CardTitle>
                <CardDescription>Histórico de transações da sua conta</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionHistory />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pix">
            <Card>
              <CardHeader>
                <CardTitle>Transferência PIX</CardTitle>
                <CardDescription>Envie dinheiro instantaneamente</CardDescription>
              </CardHeader>
              <CardContent>
                <PixTransfer />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

