import { generateBasketballTeammates } from "../generators/generateBasketballTeammates.js";

(async () => {
  const count = await generateBasketballTeammates();
  console.log(`\n🎉 Added ${count} NEW basketball teammate questions.\n`);
})();
