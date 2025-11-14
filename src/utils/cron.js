import { CronJob } from 'cron';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export function startCron() {
  console.log('🕒 Starting Global Cron Job...');

  const runnerPath = path.join(__dirname, '..', 'runners', 'runAll.js');

  // 1. RUN IMMEDIATELY
  exec(`node "${runnerPath}"`, (err, stdout, stderr) => {
    console.log('🚀 Initial Run Started...');
    if (err) console.error('❌ Initial Error:', err);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  });

  // 2. RUN EVERY 3 HOURS
  new CronJob('0 */3 * * *', () => {
    console.log('\n⏳ CRON: Running full batch generator...');

    exec(`node "${runnerPath}"`, (err, stdout, stderr) => {
      if (err) {
        console.error('❌ Cron execution error:', err);
        return;
      }
      console.log(stdout);
      if (stderr) console.error(stderr);
    });
  }).start();
}
