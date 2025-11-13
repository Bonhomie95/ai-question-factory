import { generateHistory } from '../generators/generateHistory.js';
import { generateGeography } from '../generators/generateGeography.js';
import { generateFootball } from '../generators/generateFootball.js';
import { generateBasketball } from '../generators/generateBasketball.js';

async function runAll() {
  console.log('\n==============================');
  console.log(' BULK QUESTION GENERATOR');
  console.log('==============================\n');

  const categories = [
    { name: 'History', fn: generateHistory },
    { name: 'Geography', fn: generateGeography },
    { name: 'Football', fn: generateFootball },
    { name: 'Basketball', fn: generateBasketball },
  ];

  for (const cat of categories) {
    console.log(`\n▶ Starting ${cat.name}...`);
    const count = await cat.fn();
    console.log(`✔ ${cat.name} completed — ${count} questions added.`);
  }

  console.log('\n🎉 ALL CATEGORIES DONE.\n');
}

runAll();
