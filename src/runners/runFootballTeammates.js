import { generateFootballTeammates } from "../generators/generateFootballTeammates.js";

(async () => {
  const count = await generateFootballTeammates();
  console.log(`\n🎉 Added ${count} NEW football teammate questions.\n`);
})();
