import { generateBasketball } from '../generators/generateBasketball.js';

(async () => {
  const count = await generateBasketball();
  console.log(
    `\n🎉 Generation complete. Added ${count} new geoegraphy questions.\n`
  );
})();
