import { BaseGenerator } from "./baseGenerator.js";

export async function generateGeographyBorders() {
  const generator = new BaseGenerator(
    "geography_borders",
    "geography_borders.prompt.txt"
  );
  return generator.generateBatch();
}
