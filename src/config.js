import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const ROOT = path.resolve();

export const config = {
  PRIMARY_MODEL: process.env.PRIMARY_MODEL,
  BACKUP_MODEL: process.env.BACKUP_MODEL,
  EMBED_MODEL: process.env.EMBED_MODEL,
  OLLAMA_HOST: process.env.OLLAMA_HOST,

  DUPLICATE_THRESHOLD: parseFloat(process.env.DUPLICATE_THRESHOLD || '0.85'),
  BATCH_SIZE: parseInt(process.env.BATCH_SIZE || '20', 10),

  LOG_LEVEL: process.env.LOG_LEVEL || 'info',

  PATHS: {
    ROOT,
    DATA: path.join(ROOT, 'data'),
    LOGS: path.join(ROOT, 'data', 'logs'),
    QUESTIONS: path.join(ROOT, 'data', 'questions'),
  },
};

// ensure directories exist
Object.values(config.PATHS).forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});
