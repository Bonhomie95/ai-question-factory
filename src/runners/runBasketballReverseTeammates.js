import { generateBasketballReverseTeammates } from "../generators/generateBasketballReverseTeammates.js";

(async () => {
  const count = await generateBasketballReverseTeammates();
  console.log(`\n🎉 Added ${count} basketball reverse-teammate questions.\n`);
})();
