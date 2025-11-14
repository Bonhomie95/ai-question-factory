import { BaseGenerator } from "./baseGenerator.js";

export async function generateFootballTeammates() {
  const generator = new BaseGenerator(
    "football_teammates",
    "football_teammates.prompt.txt"
  );

  return generator.generateBatch();
}
