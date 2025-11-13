import { config } from './src/config.js';
import fs from 'fs-extra';
import { startCron } from "./src/utils/cron.js";

console.log("\n🚀 AI Question Factory Booted!");
startCron();


console.log(`
=========================================
  AI QUESTION FACTORY — READY
=========================================
Primary Model: ${config.PRIMARY_MODEL}
Backup Model : ${config.BACKUP_MODEL}
Embed Model  : ${config.EMBED_MODEL}
Batch Size   : ${config.BATCH_SIZE}
Dedupe Thresh: ${config.DUPLICATE_THRESHOLD}
=========================================
`);

fs.ensureDirSync('data/questions');
