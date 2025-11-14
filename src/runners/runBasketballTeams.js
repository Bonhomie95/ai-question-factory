import { generateBasketballTeams } from "../generators/generateBasketballTeams.js";

(async () => {
  const count = await generateBasketballTeams();
  console.log(`\n🎉 Added ${count} basketball team-path questions\n`);
})();
