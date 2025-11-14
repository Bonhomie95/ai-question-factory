import { generateGeographyReverseBorders } from "../generators/generateGeographyReverseBorders.js";

(async () => {
  const count = await generateGeographyReverseBorders();
  console.log(`\n🎉 Added ${count} reverse border questions.\n`);
})();
