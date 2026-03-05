// Define a estrutura base de todos os eventos CEP
export interface CepEvent {
  timestamp: string;  // ISO 8601 timestamp
  type: string;       // Ex: USER_LOGIN_SUCCESS, PIX_TRANSFER_FAILURE
  info: {
    userId?: string;
    correlationId?: string; // ID para rastrear uma requisição inteira
    [key: string]: any;     // Permite outros campos
  };
  description: string; // Descrição legível do evento
}

// Exemplo de uma função para criar um evento de transferência
export function createPixTransferEvent(
  type: 'PIX_TRANSFER_SUCCESS' | 'PIX_TRANSFER_FAILURE',
  details: { userId: string, receiverCpf: string, amount: number, error?: string }
): CepEvent {
  return {
    timestamp: new Date().toISOString(),
    type,
    info: {
      userId: details.userId,
      receiverCpf: details.receiverCpf,
      amount: details.amount,
      error: details.error,
    },
    description: type === 'PIX_TRANSFER_SUCCESS'
      ? `Transferência PIX de ${details.amount} para ${details.receiverCpf} realizada com sucesso.`
      : `Falha na transferência PIX para ${details.receiverCpf}. Motivo: ${details.error}`
  };
}
