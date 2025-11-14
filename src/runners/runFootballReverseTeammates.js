import { generateFootballReverseTeammates } from '../generators/generateFootballReverseTeammates.js';

(async () => {
  const count = await generateFootballReverseTeammates();
  console.log(`\n🎉 Added ${count} football reverse-teammate questions.\n`);
})();
