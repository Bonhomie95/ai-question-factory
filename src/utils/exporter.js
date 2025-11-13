import fs from 'fs-extra';
import path from 'path';
import { config } from '../config.js';

export function exportQuestions({
  category,
  count = 50,
  difficulty = null,
  format = 'json',
}) {
  const folder = path.join(config.PATHS.QUESTIONS, category, 'pending');

  if (!fs.existsSync(folder)) {
    throw new Error('Category folder does not exist');
  }

  const files = fs.readdirSync(folder);
  let questions = files.map((f) => fs.readJSONSync(path.join(folder, f)));

  // Filter by difficulty if needed
  if (difficulty) {
    questions = questions.filter((q) => q.difficulty === difficulty);
  }

  // Shuffle randomly
  questions = questions.sort(() => Math.random() - 0.5);

  // Trim to desired count
  const selected = questions.slice(0, count);

  const timestamp = Date.now();
  const outDir = path.join('exports');
  fs.ensureDirSync(outDir);

  const outFile = path.join(outDir, `${category}-${timestamp}.${format}`);

  // FORMAT HANDLING
  if (format === 'json') {
    fs.writeJsonSync(outFile, selected, { spaces: 2 });
  } else if (format === 'ndjson') {
    const lines = selected.map((o) => JSON.stringify(o)).join('\n');
    fs.writeFileSync(outFile, lines);
  } else if (format === 'csv') {
    const header =
      'question,optionA,optionB,optionC,optionD,answer,difficulty\n';
    const rows = selected
      .map((q) => {
        const o = q.options;
        return `"${q.question.replace(/"/g, '""')}","${o[0]}","${o[1]}","${
          o[2]
        }","${o[3]}","${q.answer}","${q.difficulty}"`;
      })
      .join('\n');
    fs.writeFileSync(outFile, header + rows);
  } else {
    throw new Error('Unsupported export format');
  }

  return outFile;
}
