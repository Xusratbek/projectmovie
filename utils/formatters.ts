export function formatRating(value: number | undefined): string {
  if (value === undefined || Number.isNaN(value)) return '—';
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function formatAgeLabel(age: string | undefined): string {
  if (!age) return '';
  const trimmed = age.trim();
  if (trimmed.endsWith('+')) return trimmed;
  if (/^\d+$/.test(trimmed)) return `${trimmed}+`;
  return trimmed;
}
