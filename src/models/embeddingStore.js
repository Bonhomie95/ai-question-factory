import fs from 'fs-extra';
import path from 'path';
import { config } from '../config.js';

export class EmbeddingStore {
  constructor(category) {
    this.filePath = path.join(
      config.PATHS.QUESTIONS,
      category,
      'embeddings',
      'embeddings.json'
    );

    fs.ensureFileSync(this.filePath);

    try {
      this.data = fs.readJSONSync(this.filePath);
    } catch {
      this.data = [];
      fs.writeJsonSync(this.filePath, this.data);
    }
  }

  add(questionText, embedding) {
    this.data.push({
      question: questionText,
      embedding,
      addedAt: Date.now(),
    });

    fs.writeJsonSync(this.filePath, this.data, { spaces: 2 });
  }

  getAll() {
    return this.data;
  }
}
