import { Ollama } from 'ollama';
import { config } from '../config.js';

const client = new Ollama();

export async function generateText(prompt) {
  try {
    const response = await client.generate({
      model: config.PRIMARY_MODEL,
      prompt,
      stream: false,
    });

    return response.response;
  } catch (err) {
    console.error('⚠️ Primary model failed. Retrying with backup...');

    const response = await client.generate({
      model: config.BACKUP_MODEL,
      prompt,
      stream: false,
    });

    return response.response;
  }
}

export async function getEmbedding(text) {
  const resp = await client.embeddings({
    model: config.EMBED_MODEL,
    input: text,
  });

  return resp.embedding;
}
