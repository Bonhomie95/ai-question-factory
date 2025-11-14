export function repairJsonArray(text) {
  let fixed = text;

  // Fix keys without proper colon
  fixed = fixed.replace(/"(\w+)\s*:\s*"/g, '"$1": "');

  // Fix keys missing quotes — e.g. {question: "..."}
  fixed = fixed.replace(/\{(\s*)(\w+)\s*:/g, '{"$2":');

  // Fix missing commas between items
  fixed = fixed.replace(/\}\s*\{/g, '}, {');

  // Remove trailing commas before ]
  fixed = fixed.replace(/,(\s*])/g, '$1');

  // Remove trailing commas before }
  fixed = fixed.replace(/,(\s*})/g, '$1');

  return fixed;
}
