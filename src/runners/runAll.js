import { generateHistory } from '../generators/generateHistory.js';
import { generateGeography } from '../generators/generateGeography.js';
import { generateFootball } from '../generators/generateFootball.js';
import { generateBasketball } from '../generators/generateBasketball.js';

import { generateFootballTeammates } from '../generators/generateFootballTeammates.js';
import { generateBasketballTeammates } from '../generators/generateBasketballTeammates.js';

import { generateFootballCoaches } from '../generators/generateFootballCoaches.js';
import { generateBasketballCoaches } from '../generators/generateBasketballCoaches.js';

import { generateFootballClubs } from '../generators/generateFootballClubs.js';
import { generateBasketballTeams } from '../generators/generateBasketballTeams.js';

import { generateGeographyBorders } from '../generators/generateGeographyBorders.js';
import { generateGeographyFeatures } from '../generators/generateGeographyFeatures.js';

import { generateHistoryYears } from '../generators/generateHistoryYears.js';
import { generateHistoryOrder } from '../generators/generateHistoryOrder.js';

import { generateFootballTrophies } from '../generators/generateFootballTrophies.js';
import { generateFootballReverseTeammates } from '../generators/generateFootballReverseTeammates.js';
import { generateBasketballReverseTeammates } from '../generators/generateBasketballReverseTeammates.js';
import { generateGeographyReverseBorders } from '../generators/generateGeographyReverseBorders.js';
import { generateHistoryReverseEvents } from '../generators/generateHistoryReverseEvents.js';

async function runAll() {
  console.log('\n==============================');
  console.log(' 🔥 BULK QUESTION GENERATOR 🔥');
  console.log('==============================\n');

  const categories = [
    { name: 'History', fn: generateHistory },
    { name: 'Geography', fn: generateGeography },
    { name: 'Football', fn: generateFootball },
    { name: 'Basketball', fn: generateBasketball },

    { name: 'Football Teammates', fn: generateFootballTeammates },
    { name: 'Basketball Teammates', fn: generateBasketballTeammates },

    { name: 'Football Coaches', fn: generateFootballCoaches },
    { name: 'Basketball Coaches', fn: generateBasketballCoaches },

    { name: 'Football Clubs', fn: generateFootballClubs },
    { name: 'Basketball Teams', fn: generateBasketballTeams },

    { name: 'Geography Borders', fn: generateGeographyBorders },
    { name: 'Geography Features', fn: generateGeographyFeatures },

    { name: 'History Years', fn: generateHistoryYears },
    { name: 'History Order', fn: generateHistoryOrder },

    { name: 'Football Trophies', fn: generateFootballTrophies },

    {
      name: 'Football Reverse Teammates',
      fn: generateFootballReverseTeammates,
    },
    {
      name: 'Basketball Reverse Teammates',
      fn: generateBasketballReverseTeammates,
    },
    { name: 'Geography Reverse Borders', fn: generateGeographyReverseBorders },
    { name: 'History Reverse Events', fn: generateHistoryReverseEvents },
  ];

  for (const cat of categories) {
    console.log(`\n▶ Starting ${cat.name}...`);

    try {
      const count = await cat.fn();
      if (count === 0) {
        console.log(`⚠ No questions were added for ${cat.name}.`);
        continue;
      }
      console.log(`✔ ${cat.name} — ${count} new questions added.`);
    } catch (err) {
      console.error(`❌ Error in ${cat.name}:`, err.message);
    }
  }

  console.log('\n🎉 ALL CATEGORIES COMPLETED.\n');
}

runAll();
