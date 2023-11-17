import { createClient } from 'redis';
import { randomBytes } from 'crypto';

const redisClient = createClient({ url: 'redis://localhost:6379' });

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis'));

(async () => {
  await redisClient.connect();
})();

export async function tokenizeCard(cardData: any) {
  const token = randomBytes(8).toString('hex');
  await redisClient.set(token, JSON.stringify(cardData), { EX: 900 });

  return token;
}

export async function findCardByToken(token: string) {
  try {
    const cardData = await redisClient.get(token);
    if (cardData) {
      return JSON.parse(cardData);
    } else {
      console.log("No se encuentran datos para el token solicitado");
      return null;
    }
  } catch (error) {
    console.error('Error al buscar la tarjeta:', error);
    throw error;
  }
}

