import { BaseGenerator } from "./baseGenerator.js";

export async function generateGeographyReverseBorders() {
  const generator = new BaseGenerator(
    "geography_reverse_borders",
    "geography_reverse_borders.prompt.txt"
  );
  return generator.generateBatch();
}
