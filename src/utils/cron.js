import { CronJob } from "cron";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function startCron() {
  console.log("🕒 Starting Global Cron Job...");

  // Run runAll.js every 3 hours
  new CronJob("0 */3 * * *", () => {
    console.log("\n⏳ CRON: Running full batch generator...");

    const runnerPath = path.join(__dirname, "..", "runners", "runAll.js");

    exec(`node "${runnerPath}"`, (err, stdout, stderr) => {
      if (err) {
        console.error("❌ Cron execution error:", err);
        return;
      }
      console.log(stdout);
      if (stderr) console.error(stderr);
    });
  }).start();
}
