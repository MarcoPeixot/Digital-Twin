# Imagem base
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json* ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript
RUN npm run build || true

# Instala ts-node globalmente para rodar o serviço em dev
RUN npm install -g ts-node

# Comando de inicialização
CMD ["ts-node", "src/index.ts"]
