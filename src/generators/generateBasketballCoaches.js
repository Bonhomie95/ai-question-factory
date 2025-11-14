import { BaseGenerator } from "./baseGenerator.js";

export async function generateBasketballCoaches() {
  const generator = new BaseGenerator(
    "basketball_coaches",
    "basketball_coaches.prompt.txt"
  );
  return generator.generateBatch();
}
