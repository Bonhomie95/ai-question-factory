import { generateHistory } from '../generators/generateHistory.js';

(async () => {
  const count = await generateHistory();
  console.log(
    `\n🎉 Generation complete. Added ${count} new history questions.\n`
  );
})();
