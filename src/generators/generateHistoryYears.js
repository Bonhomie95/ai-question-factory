import { BaseGenerator } from "./baseGenerator.js";

export async function generateHistoryYears() {
  const generator = new BaseGenerator(
    "history_years",
    "history_years.prompt.txt"
  );
  return generator.generateBatch();
}
