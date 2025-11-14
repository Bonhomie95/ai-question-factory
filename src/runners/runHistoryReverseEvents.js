import { generateHistoryReverseEvents } from "../generators/generateHistoryReverseEvents.js";

(async () => {
  const count = await generateHistoryReverseEvents();
  console.log(`\n🎉 Added ${count} history reverse-event questions.\n`);
})();
