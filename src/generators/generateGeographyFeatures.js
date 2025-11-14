import { BaseGenerator } from "./baseGenerator.js";

export async function generateGeographyFeatures() {
  const generator = new BaseGenerator(
    "geography_features",
    "geography_features.prompt.txt"
  );
  return generator.generateBatch();
}
