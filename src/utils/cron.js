import { CronJob } from 'cron';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runScript() {
  const runnerPath = path.join(__dirname, '..', 'runners', 'runAll.js');

  console.log('⚡ Running batch generator...');

  const child = spawn('node', [runnerPath], {
    stdio: 'inherit', // keep logs visible
    shell: false,
  });

  child.on('close', (code) => {
    console.log(`✔ Batch process finished with code ${code}`);
  });

  child.on('error', (err) => {
    console.error('❌ Spawn error:', err);
  });
}

export function startCron() {
  console.log('🕒 Global Cron Job Started');

  // 1. Run immediately
  runScript();

  // 2. Run every 3 hours
  new CronJob('0 */3 * * *', runScript).start();
}

// Allow direct testing: node cron.js
if (process.argv[1].includes('cron.js')) {
  startCron();
}
