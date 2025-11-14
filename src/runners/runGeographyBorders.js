import { generateGeographyBorders } from "../generators/generateGeographyBorders.js";

(async () => {
  const count = await generateGeographyBorders();
  console.log(`\n🎉 Added ${count} border-logic questions\n`);
})();
