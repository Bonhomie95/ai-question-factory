import fs from 'fs';
import path from 'path';
import { generateText, getEmbedding } from '../utils/ollamaClient.js';
import { EmbeddingStore } from '../models/embeddingStore.js';
import { QuestionModel } from '../models/questionModel.js';
import { isDuplicate } from '../utils/dedupe.js';
import { validateQuestion } from '../utils/filters.js';

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
    const prompt = this.loadPrompt();

    console.log(`\n🧠 Generating questions for ${this.category}...`);

    const raw = await generateText(prompt);

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error('❌ Failed to parse model output. Dumping text:\n', raw);
      throw err;
    }

    const newQuestions = [];

    for (const q of parsed) {
      const validation = validateQuestion(q);

      if (!validation.valid) {
        console.log('⚠️ Filtered out (quality):', validation.errors.join(', '));
        continue;
      }
      const text = q.question || q.prompt || JSON.stringify(q);

      // embed for dedupe
      const embedding = await getEmbedding(text);

      // load existing embeddings
      const all = this.embeddingStore.getAll();

      if (isDuplicate(text, embedding, all)) {
        console.log('⛔ DUPLICATE:', text);
        continue;
      }

      // save embedding
      this.embeddingStore.add(text, embedding);

      // collect question for saving
      newQuestions.push(q);
    }

    // save final batch
    this.model.saveManyToPending(newQuestions);

    console.log(`✅ Saved ${newQuestions.length} new questions.`);

    return newQuestions.length;
  }
}
