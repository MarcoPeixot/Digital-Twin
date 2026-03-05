import { Kafka, EachMessagePayload } from 'kafkajs';

// Define a estrutura do evento que esperamos receber do Kafka
interface CepEvent {
  timestamp: string;
  type: 'PIX_TRANSFER_SUCCESS' | 'PIX_TRANSFER_FAILURE';
  info: {
    userId?: string;
    amount?: number;
    [key: string]: any;
  };
  description: string;
}

// --- Lógica do Motor de CEP Simples ---
const HIGH_VALUE_THRESHOLD = 1000; // Transferências acima de R$ 1000
const TIME_WINDOW_MS = 60 * 1000; // Janela de tempo de 1 minuto
const COUNT_THRESHOLD = 3; // 3 ou mais transferências na janela de tempo

// Armazena em memória os timestamps das transferências de alto valor por usuário
const userHighValueTransfers: Record<string, number[]> = {};

function processEventForCEP(event: CepEvent) {
  // Ignora eventos que não são de transferência bem-sucedida ou sem userId
  if (event.type !== 'PIX_TRANSFER_SUCCESS' || !event.info.userId || !event.info.amount) {
    return;
  }
  
  const { userId, amount } = event.info;
  const eventTimestamp = new Date(event.timestamp).getTime();

  // Filtra apenas transferências de alto valor
  if (amount >= HIGH_VALUE_THRESHOLD) {
    console.log(`[CEP] Recebido evento de alto valor para o usuário: ${userId}, Valor: ${amount}`);

    // Garante que o usuário tenha uma entrada no nosso registro
    if (!userHighValueTransfers[userId]) {
      userHighValueTransfers[userId] = [];
    }

    // Adiciona o timestamp do evento atual
    userHighValueTransfers[userId].push(eventTimestamp);

    // Remove timestamps antigos que estão fora da janela de tempo
    const currentTime = Date.now();
    userHighValueTransfers[userId] = userHighValueTransfers[userId].filter(
      (ts) => currentTime - ts < TIME_WINDOW_MS
    );
    
    // **A REGRA DO CEP**
    // Se o número de transferências na janela de tempo atingir o limite, dispare um alerta
    if (userHighValueTransfers[userId].length >= COUNT_THRESHOLD) {
      console.warn(`\n--- [ALERTA CEP] ---`);
      console.warn(`Padrão de Evento Complexo Detectado: Múltiplas transferências de alto valor.`);
      console.warn(`Usuário: ${userId}`);
      console.warn(`Contagem: ${userHighValueTransfers[userId].length} transferências nos últimos ${TIME_WINDOW_MS / 1000} segundos.`);
      console.warn(`--- [FIM DO ALERTA] ---\n`);
      
      // Limpa os registros para não disparar o mesmo alerta repetidamente
      userHighValueTransfers[userId] = [];
    }
  }
}

// --- Configuração do Consumidor Kafka ---
const kafka = new Kafka({
  clientId: 'cep-processor',
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'cep-group' });

const run = async () => {
  await consumer.connect();
  console.log("Consumidor CEP conectado ao Kafka.");

  await consumer.subscribe({ topic: 'financial-transactions', fromBeginning: true });
  console.log("Inscrito no tópico 'financial-transactions'. Aguardando eventos...");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      if (message.value) {
        try {
          const event: CepEvent = JSON.parse(message.value.toString());
          processEventForCEP(event);
        } catch (e) {
          console.error("Erro ao processar mensagem:", e);
        }
      }
    },
  });
};

run().catch(console.error);
