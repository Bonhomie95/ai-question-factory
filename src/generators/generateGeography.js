import { BaseGenerator } from './baseGenerator.js';

export async function generateGeography() {
  const generator = new BaseGenerator('geography', 'geography.prompt.txt');
  return generator.generateBatch();
}
