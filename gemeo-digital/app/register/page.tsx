"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner" // Mantemos o sonner para notificações

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const cpf = formData.get("cpf") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // Faz a chamada para a nossa nova API de registro
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, cpf, email, password }),
      })

      // Se o registro foi bem-sucedido (status 201)
      if (response.ok) {
        toast.success("Conta criada com sucesso!", {
          description: "Estamos te redirecionando para o login.",
        })

        // Redireciona para a página de login após um breve momento
        setTimeout(() => {
          router.push("/login")
        }, 2000)

      } else {
        // Se houver erro, exibe a mensagem retornada pela API
        const errorData = await response.json()
        toast.error("Erro ao criar conta", {
          description: errorData.message || "Por favor, tente novamente.",
        })
      }
    } catch (error) {
      console.error("Falha na chamada de registro:", error)
      toast.error("Erro de comunicação", {
        description: "Não foi possível se conectar ao servidor. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
          <CardDescription>Preencha os dados para abrir sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" name="name" placeholder="Digite seu nome completo" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" name="cpf" placeholder="Digite seu CPF" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Digite seu email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" placeholder="Crie uma senha" required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" className="px-0" onClick={() => router.push("/login")}>
            Já tem uma conta? Entrar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}