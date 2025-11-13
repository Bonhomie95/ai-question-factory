export function validateQuestion(q) {
  const errors = [];

  // Basic fields must exist
  if (!q.question || typeof q.question !== 'string') {
    errors.push('Question text missing');
  }

  if (!Array.isArray(q.options) || q.options.length < 3) {
    errors.push('Options missing or too few');
  }

  if (!q.answer || typeof q.answer !== 'string') {
    errors.push('Answer missing');
  }

  if (!['easy', 'medium', 'hard'].includes(q.difficulty)) {
    errors.push('Invalid difficulty level');
  }

  // Length check
  if (q.question.length < 10) {
    errors.push('Question too short');
  }

  // Repetitive or AI filler noise
  const badPatterns = [
    'as an ai',
    'cannot answer',
    'i am unable',
    'lorem',
    'placeholder',
  ];
  if (badPatterns.some((p) => q.question.toLowerCase().includes(p))) {
    errors.push('Unacceptable phrasing/noise detected');
  }

  // Options uniqueness
  const unique = new Set(q.options.map((o) => o.trim().toLowerCase()));
  if (unique.size !== q.options.length) {
    errors.push('Duplicate options detected');
  }

  // Answer must match one of the options
  const normalizedOpts = q.options.map((o) => o.trim().toLowerCase());
  if (!normalizedOpts.includes(q.answer.trim().toLowerCase())) {
    errors.push('Answer does not match options');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
