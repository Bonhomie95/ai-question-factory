import fs from 'fs-extra';
import path from 'path';
import { config } from '../config.js';

export class QuestionModel {
  constructor(category) {
    this.category = category;

    // Single file per category
    this.filePath = path.join(config.PATHS.QUESTIONS, `${category}.json`);

    // Ensure directory exists
    fs.ensureDirSync(config.PATHS.QUESTIONS);

    // Ensure file exists
    if (!fs.existsSync(this.filePath)) {
      fs.writeJsonSync(this.filePath, [], { spaces: 2 });
    }

    // Load into memory
    try {
      this.data = fs.readJSONSync(this.filePath);
      if (!Array.isArray(this.data)) this.data = [];
    } catch (err) {
      console.error(`⚠️ Failed reading ${category}.json, resetting...`);
      this.data = [];
      fs.writeJsonSync(this.filePath, [], { spaces: 2 });
    }
  }

  saveMany(list) {
    // append new questions
    this.data.push(...list);

    // write back to disk
    fs.writeJsonSync(this.filePath, this.data, { spaces: 2 });

    return list.length;
  }

  getAll() {
    return this.data;
  }
}
