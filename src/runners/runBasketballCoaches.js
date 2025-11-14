import { generateBasketballCoaches } from "../generators/generateBasketballCoaches.js";

(async () => {
  const count = await generateBasketballCoaches();
  console.log(`\n🎉 Added ${count} basketball coach questions\n`);
})();
