import { generateHistoryOrder } from "../generators/generateHistoryOrder.js";

(async () => {
  const count = await generateHistoryOrder();
  console.log(`\n🎉 Added ${count} chronology questions\n`);
})();
