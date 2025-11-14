import { BaseGenerator } from "./baseGenerator.js";

export async function generateFootballTrophies() {
  const generator = new BaseGenerator(
    "football_trophies",
    "football_trophies.prompt.txt"
  );
  return generator.generateBatch();
}
