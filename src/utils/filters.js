export function validateQuestion(q) {
  const errors = [];

  // VALIDATE QUESTION TEXT
  if (!q || typeof q !== 'object') {
    return { valid: false, errors: ['Invalid object'] };
  }

  if (!q.question || typeof q.question !== 'string') {
    errors.push('Question text missing');
    return { valid: false, errors };
  }

  if (q.question.length < 8) {
    errors.push('Question too short');
  }

  // VALIDATE OPTIONS
  if (!Array.isArray(q.options)) {
    errors.push('Options field missing');
    return { valid: false, errors };
  }

  if (q.options.length < 3) {
    errors.push('Not enough options');
    return { valid: false, errors };
  }

  // Ensure all options are strings
  const allStrings = q.options.every(
    (o) => typeof o === 'string' && o.trim().length > 0
  );
  if (!allStrings) {
    errors.push('Invalid option format');
  }

  // UNIQUE OPTIONS
  const unique = new Set(q.options.map((o) => o.trim().toLowerCase()));
  if (unique.size !== q.options.length) {
    errors.push('Duplicate options');
  }

  // VALIDATE ANSWER
  if (!q.answer || typeof q.answer !== 'string') {
    errors.push('Answer missing');
    return { valid: false, errors };
  }

  const normalized = q.options.map((o) => o.trim().toLowerCase());
  if (!normalized.includes(q.answer.trim().toLowerCase())) {
    errors.push('Answer does not match options');
  }

  // VALIDATE DIFFICULTY
  if (!['easy', 'medium', 'hard'].includes(q.difficulty)) {
    errors.push('Difficulty missing or invalid');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
