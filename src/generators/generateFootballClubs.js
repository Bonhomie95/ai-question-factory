import { BaseGenerator } from "./baseGenerator.js";

export async function generateFootballClubs() {
  const generator = new BaseGenerator(
    "football_clubs",
    "football_clubs.prompt.txt"
  );
  return generator.generateBatch();
}
