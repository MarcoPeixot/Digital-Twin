import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Banco Digital</CardTitle>
          <CardDescription>Acesse sua conta para gerenciar suas finanças</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link href="/login" className="w-full">
            <Button className="w-full" size="lg">
              Entrar
            </Button>
          </Link>
          <Link href="/register" className="w-full">
            <Button variant="outline" className="w-full" size="lg">
              Criar Conta
            </Button>
          </Link>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Banco Digital © {new Date().getFullYear()}
        </CardFooter>
      </Card>
    </div>
  )
}

