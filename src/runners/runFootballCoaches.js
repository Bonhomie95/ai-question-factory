import { generateFootballCoaches } from '../generators/generateFootballCoaches.js';

(async () => {
  const count = await generateFootballCoaches();
  console.log(`\n🎉 Added ${count} football coach questions\n`);
})();
