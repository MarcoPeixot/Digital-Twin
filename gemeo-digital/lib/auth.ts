import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
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
        
        const user = await prisma.user.findUnique({
          where: { cpf: credentials.cpf }
        })

        // **AUDITORIA DE TENTATIVA DE LOGIN**
        if (!user) {
          await prisma.auditLog.create({
            data: {
              action: "LOGIN_FAILURE",
              entity: "User",
              entityId: credentials.cpf,
              details: { reason: "User not found" }
            }
          })
          return null
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordCorrect) {
          // **AUDITORIA DE SENHA INCORRETA**
          await prisma.auditLog.create({
            data: {
              userId: user.id,
              action: "LOGIN_FAILURE",
              entity: "User",
              entityId: user.id,
              details: { reason: "Incorrect password" }
            }
          })
          return null
        }

        // **AUDITORIA DE LOGIN BEM-SUCEDIDO**
        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: "LOGIN_SUCCESS",
            entity: "User",
            entityId: user.id,
            details: {}
          }
        })

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          cpf: user.cpf,
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt" as const
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: { session: any, token: any }) {
      if (session?.user) {
        session.user.id = token.id as string
      }
      return session
    }
  }
}
