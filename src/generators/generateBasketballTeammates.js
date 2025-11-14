import { BaseGenerator } from "./baseGenerator.js";

export async function generateBasketballTeammates() {
  const generator = new BaseGenerator(
    "basketball_teammates",
    "basketball_teammates.prompt.txt"
  );

  return generator.generateBatch();
}
