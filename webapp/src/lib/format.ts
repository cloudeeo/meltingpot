export function formatDate(value: Date | string): string {
  const d = typeof value === 'string' ? new Date(value) : value;
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function toIsoDate(value: Date | string): string {
  const d = typeof value === 'string' ? new Date(value) : value;
  return d.toISOString();
}

export function truncate(input: string, max = 160): string {
  if (input.length <= max) return input;
  return `${input.slice(0, max - 1).trimEnd()}…`;
}

export function hash(input: string): string {
  // Tiny deterministic hash for IPs in form submissions. Not crypto.
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(16);
}
