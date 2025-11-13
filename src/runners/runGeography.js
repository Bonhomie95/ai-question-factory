import { generateGeography } from '../generators/generateGeography.js';

(async () => {
  const count = await generateGeography();
  console.log(
    `\n🎉 Generation complete. Added ${count} new geoegraphy questions.\n`
  );
})();
