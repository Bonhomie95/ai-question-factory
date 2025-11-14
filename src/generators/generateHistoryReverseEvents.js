import { BaseGenerator } from "./baseGenerator.js";

export async function generateHistoryReverseEvents() {
  const generator = new BaseGenerator(
    "history_reverse_events",
    "history_reverse_events.prompt.txt"
  );
  return generator.generateBatch();
}
