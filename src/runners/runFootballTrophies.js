import { generateFootballTrophies } from "../generators/generateFootballTrophies.js";

(async () => {
  const count = await generateFootballTrophies();
  console.log(`\n🎉 Added ${count} trophy questions\n`);
})();
