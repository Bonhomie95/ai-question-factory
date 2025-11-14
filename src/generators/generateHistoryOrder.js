import { BaseGenerator } from "./baseGenerator.js";

export async function generateHistoryOrder() {
  const generator = new BaseGenerator(
    "history_order",
    "history_order.prompt.txt"
  );
  return generator.generateBatch();
}
