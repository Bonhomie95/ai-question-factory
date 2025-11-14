import fs from 'fs-extra';
import path from 'path';
import { config } from '../config.js';

export class EmbeddingStore {
  constructor(category) {
    this.filePath = path.join(
      config.PATHS.QUESTIONS,
      `${category}_embeddings.json`
    );

    fs.ensureDirSync(config.PATHS.QUESTIONS);

    if (!fs.existsSync(this.filePath)) {
      fs.writeJsonSync(this.filePath, [], { spaces: 2 });
    }

    try {
      this.data = fs.readJSONSync(this.filePath);
      if (!Array.isArray(this.data)) this.data = [];
    } catch {
      this.data = [];
      fs.writeJsonSync(this.filePath, [], { spaces: 2 });
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
