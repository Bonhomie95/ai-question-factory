import { BaseGenerator } from "./baseGenerator.js";

export async function generateBasketballReverseTeammates() {
  const generator = new BaseGenerator(
    "basketball_reverse_teammates",
    "basketball_reverse_teammates.prompt.txt"
  );
  return generator.generateBatch();
}
