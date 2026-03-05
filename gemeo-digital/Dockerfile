# Estágio 1: Instalar dependências
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Estágio 2: Construir a aplicação
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Gera o cliente do Prisma
RUN npx prisma generate
# Constrói a aplicação Next.js
RUN npm run build

# Estágio 3: Imagem final de produção
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copia os arquivos da build e as dependências
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]