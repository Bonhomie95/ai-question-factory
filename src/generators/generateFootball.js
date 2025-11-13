import { BaseGenerator } from './baseGenerator.js';

export async function generateFootball() {
  const generator = new BaseGenerator('football', 'football.prompt.txt');
  return generator.generateBatch();
}
