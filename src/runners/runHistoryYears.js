import { generateHistoryYears } from "../generators/generateHistoryYears.js";

(async () => {
  const count = await generateHistoryYears();
  console.log(`\n🎉 Added ${count} history year-match questions\n`);
})();
