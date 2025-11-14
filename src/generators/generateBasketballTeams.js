import { BaseGenerator } from './baseGenerator.js';

export async function generateBasketballTeams() {
  const generator = new BaseGenerator(
    'basketball_teams',
    'basketball_teams.prompt.txt'
  );
  return generator.generateBatch();
}
