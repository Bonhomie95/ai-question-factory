import { generateFootball } from '../generators/generateFootball.js';

(async () => {
  const count = await generateFootball();
  console.log(
    `\n🎉 Generation complete. Added ${count} new football questions.\n`
  );
})();
