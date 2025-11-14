import { generateGeographyFeatures } from "../generators/generateGeographyFeatures.js";

(async () => {
  const count = await generateGeographyFeatures();
  console.log(`\n🎉 Added ${count} geography feature questions\n`);
})();
