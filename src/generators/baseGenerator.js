import fs from 'fs';
import path from 'path';
import { generateText, getEmbedding } from '../utils/ollamaClient.js';
import { EmbeddingStore } from '../models/embeddingStore.js';
import { QuestionModel } from '../models/questionModel.js';
import { isDuplicate } from '../utils/dedupe.js';
import { validateQuestion } from '../utils/filters.js';
import { repairJsonArray } from '../utils/jsonRepair.js';

export class BaseGenerator {
  constructor(category, promptFile) {
    this.category = category;
    this.promptPath = path.join('prompts', promptFile);

    this.model = new QuestionModel(category);
    this.embeddingStore = new EmbeddingStore(category);
  }

  loadPrompt() {
    return fs.readFileSync(this.promptPath, 'utf8');
  }

  async generateBatch() {
    console.log(`\n🧠 Generating questions for ${this.category}...`);

    const prompt = this.loadPrompt();
    const raw = await generateText(prompt);

    // -------------------------------------------
    // CLEAN / SANITIZE MODEL OUTPUT
    // -------------------------------------------
    let cleaned = raw
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    // Extract only JSON array
    const firstBracket = cleaned.indexOf('[');
    const lastBracket = cleaned.lastIndexOf(']');

    if (firstBracket !== -1 && lastBracket !== -1) {
      cleaned = cleaned.substring(firstBracket, lastBracket + 1);
    }

    // -------------------------------------------
    // PARSE JSON
    // -------------------------------------------
    let parsed;
    let repaired = repairJsonArray(cleaned);
    try {
      parsed = JSON.parse(repaired);

      if (!Array.isArray(parsed)) {
        throw new Error('Parsed JSON is not an array');
      }
    } catch (err) {
      console.error('❌ Failed even after repair.');
      console.error('🔍 RAW:', raw);
      console.error('🔍 CLEANED:', cleaned);
      console.error('🔍 REPAIRED:', repaired);
      throw err;
    }

    // -------------------------------------------
    // VALIDATION + DEDUPE + SAVE
    // -------------------------------------------
    const newQuestions = [];

    for (const q of parsed) {
      const validation = validateQuestion(q);

      if (!validation.valid) {
        console.log('⚠️ Filtered out (quality):', validation.errors.join(', '));
        continue;
      }

      const text = q.question || q.prompt || JSON.stringify(q);

      const embedding = await getEmbedding(text);

      const all = this.embeddingStore.getAll();

      if (isDuplicate(text, embedding, all)) {
        console.log('⛔ DUPLICATE:', text);
        continue;
      }

      this.embeddingStore.add(text, embedding);
      newQuestions.push(q);
    }

    this.model.saveManyToPending(newQuestions);

    console.log(`✅ Saved ${newQuestions.length} new questions.`);

    return newQuestions.length;
  }
}
