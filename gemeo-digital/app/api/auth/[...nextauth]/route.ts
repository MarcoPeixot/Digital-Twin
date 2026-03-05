// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma" // Importe sua instância do Prisma
import bcrypt from "bcryptjs"
import { authOptions } from "@/lib/auth"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        cpf: { label: "CPF", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.cpf || !credentials.password) {
          return null
        }

        // 1. Encontra o usuário no banco de dados pelo CPF
        const user = await prisma.user.findUnique({
          where: { cpf: credentials.cpf }
        })

        if (!user) {
          return null // Usuário não encontrado
        }

        // 2. Compara a senha enviada com a senha (hash) no banco
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (isPasswordCorrect) {
          // 3. Retorna o objeto do usuário se a senha estiver correta
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
          }
        }

        return null // Senha incorreta
      }
    })
  ],
  // O resto da sua configuração (pages, session, callbacks) permanece igual...
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.cpf = (user as any).cpf
      }
      return token
    },
    async session({ session, token }) {
      if (!session.user) session.user = {} as any
      if (session.user) {
        (session.user as any).id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        (session.user as any).cpf = token.cpf as string
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }