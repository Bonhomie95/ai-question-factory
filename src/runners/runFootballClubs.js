import { generateFootballClubs } from "../generators/generateFootballClubs.js";

(async () => {
  const count = await generateFootballClubs();
  console.log(`\n🎉 Added ${count} football club-path questions\n`);
})();
