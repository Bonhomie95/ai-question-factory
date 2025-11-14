import { BaseGenerator } from "./baseGenerator.js";

export async function generateFootballReverseTeammates() {
  const generator = new BaseGenerator(
    "football_reverse_teammates",
    "football_reverse_teammates.prompt.txt"
  );
  return generator.generateBatch();
}
