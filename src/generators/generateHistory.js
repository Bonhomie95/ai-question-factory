import { BaseGenerator } from './baseGenerator.js';

export async function generateHistory() {
  const generator = new BaseGenerator('history', 'history.prompt.txt');
  return generator.generateBatch();
}
