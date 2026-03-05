import { Kafka, Producer } from 'kafkajs';
import { CepEvent } from './events';
import logger from './logger';

const kafka = new Kafka({
  clientId: 'banking-app',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer: Producer = kafka.producer();
let isProducerConnected = false;

// Conecta o producer ao iniciar a aplicação
export const connectProducer = async () => {
  if (isProducerConnected) return;
  try {
    await producer.connect();
    isProducerConnected = true;
    logger.info('Kafka Producer conectado com sucesso.');
  } catch (error) {
    logger.error({ error }, 'Falha ao conectar o Kafka Producer.');
  }
};

// Desconecta o producer ao desligar a aplicação
export const disconnectProducer = async () => {
  if (!isProducerConnected) return;
  try {
    await producer.disconnect();
    isProducerConnected = false;
    logger.info('Kafka Producer desconectado.');
  } catch (error) {
    logger.error({ error }, 'Falha ao desconectar o Kafka Producer.');
  }
};

// Função para enviar um evento CEP para um tópico específico
export const publishCepEvent = async (topic: string, event: CepEvent) => {
  if (!isProducerConnected) {
    logger.warn('Producer não está conectado. Tentando conectar...');
    await connectProducer();
  }
  
  try {
    await producer.send({
      topic,
      messages: [
        { value: JSON.stringify(event) },
      ],
    });
  } catch (error) {
    logger.error({ error, topic, event }, 'Falha ao publicar evento no Kafka.');
  }
};
