import { BaseGenerator } from "./baseGenerator.js";

export async function generateFootballCoaches() {
  const generator = new BaseGenerator(
    "football_coaches",
    "football_coaches.prompt.txt"
  );
  return generator.generateBatch();
}
