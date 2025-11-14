import { Ollama } from 'ollama';
import { config } from '../config.js';

const client = new Ollama({
  host: config.OLLAMA_HOST,
});

export async function generateText(prompt) {
  try {
    const response = await client.generate({
      model: config.PRIMARY_MODEL,
      prompt,
      options: {
        num_gpu: 0,
      },
      stream: false,
    });

    return response.response;
  } catch (err) {
    console.error(
      '⚠️ Primary model failed. Retrying with backup...',
      err.message
    );

    const response = await client.generate({
      model: config.BACKUP_MODEL,
      prompt,
      options: {
        num_gpu: 0,
      },
      stream: false,
    });

    return response.response;
  }
}

export async function getEmbedding(text) {
  const resp = await client.embeddings({
    model: config.EMBED_MODEL,
    input: text,
    options: {
      num_gpu: 0,
    },
  });

  return resp.embedding;
}
