import fs from 'fs-extra';
import path from 'path';
import { nanoid } from 'nanoid';
import { config } from '../config.js';

export class QuestionModel {
  constructor(category) {
    this.category = category;

    this.paths = {
      pending: path.join(config.PATHS.QUESTIONS, category, 'pending'),
      archive: path.join(config.PATHS.QUESTIONS, category, 'archive'),
    };

    // ensure category dirs exist
    Object.values(this.paths).forEach((dir) => {
      fs.ensureDirSync(dir);
    });
  }

  saveToPending(questionObj) {
    const id = nanoid();
    const filePath = path.join(this.paths.pending, `${id}.json`);

    fs.writeJsonSync(filePath, {
      id,
      category: this.category,
      createdAt: Date.now(),
      ...questionObj,
    });

    return id;
  }

  saveManyToPending(list) {
    return list.map((q) => this.saveToPending(q));
  }

  loadPending() {
    const files = fs.readdirSync(this.paths.pending);
    return files.map((f) => fs.readJSONSync(path.join(this.paths.pending, f)));
  }

  archiveAllPending() {
    const files = fs.readdirSync(this.paths.pending);

    files.forEach((file) => {
      const src = path.join(this.paths.pending, file);
      const dest = path.join(this.paths.archive, file);
      fs.moveSync(src, dest, { overwrite: true });
    });
  }
}
