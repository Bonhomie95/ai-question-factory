import cosineSimilarity from "cosine-similarity";
import { lexicalSimilarity } from "./lexicalDedupe.js";
import { config } from "../config.js";

export function isDuplicate(questionText, newEmbedding, stored) {
  for (const item of stored) {
    const semantic = cosineSimilarity(newEmbedding, item.embedding);
    const lexical = lexicalSimilarity(questionText, item.question);

    // semantic threshold OR textual similarity threshold
    if (
      semantic >= config.DUPLICATE_THRESHOLD ||
      lexical >= 0.45
    ) {
      return true;
    }
  }

  return false;
}
