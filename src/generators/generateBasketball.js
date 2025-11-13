import { BaseGenerator } from './baseGenerator.js';

export async function generateBasketball() {
  const generator = new BaseGenerator('basketball', 'basketball.prompt.txt');
  return generator.generateBatch();
}
