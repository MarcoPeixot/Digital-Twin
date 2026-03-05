import pino from 'pino'

// Usa configuração básica para compatibilidade com Next.js API routes
const logger = pino({})

export default logger