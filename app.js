// app.js
import { config } from './src/config.js';
import fs from 'fs-extra';
import { startCron } from './src/utils/cron.js';

console.log(`
=========================================
🚀 AI QUESTION FACTORY — BOOTING...
=========================================
`);

//
// Ensure required directories exist
//
fs.ensureDirSync(config.PATHS.QUESTIONS);
fs.ensureDirSync(config.PATHS.LOGS);

//
// Start Cron (Immediate + Every 3 hours)
//
startCron();

//
// Display runtime config
//
console.log(`
=========================================
  AI QUESTION FACTORY — READY
=========================================
Primary Model : ${config.PRIMARY_MODEL}
Backup Model  : ${config.BACKUP_MODEL}
Embed Model   : ${config.EMBED_MODEL}
Batch Size    : ${config.BATCH_SIZE}
Dedupe Thresh : ${config.DUPLICATE_THRESHOLD}
Ollama Host   : ${config.OLLAMA_HOST}
=========================================
`);

//
// Keep Node alive forever
// (so cron does not exit on Windows/Linux)
//
process.stdin.resume();
