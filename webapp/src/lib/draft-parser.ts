/**
 * Parser for the copywriter Insights template (see
 * docs/content/insights-copywriter-template.md).
 *
 * Input: the raw text body of an .md attachment, structured as
 * field-label blocks separated by blank lines, e.g.:
 *
 *     TITLE:
 *     Some title
 *
 *
 *     SUBTITLE / LEDE:
 *     Some subtitle...
 *
 * Output: a normalised draft object ready to be inserted into the
 * `PostDraft` table. Unknown fields are ignored; missing required
 * fields produce a `notes` line so the editor can see what was
 * incomplete and fix it in the admin UI.
 */

export interface ParsedDraft {
  locale: 'en' | 'fr';
  slug: string;
  title: string;
  description: string;
  body: string;
  tags: string[];
  ctaHook: string | null;
  publishedAt: Date | null;
  imageBrief: string | null;
  parseNotes: string[];
}

/** Field labels we recognise. The parser does case-insensitive
 *  matching and tolerates spaces and "/". */
const FIELD_LABELS = [
  'TITLE',
  'SUBTITLE / LEDE',
  'SUBTITLE',
  'LEDE',
  'LOCALE',
  'PUBLICATION DATE',
  'TAGS',
  'BODY',
  'CTA HOOK',
  'IMAGE BRIEF',
] as const;

const LABEL_PATTERN = new RegExp(
  `^\\s*(${FIELD_LABELS.map((l) => l.replace(/[\\/]/g, '\\$&')).join('|')})\\s*:\\s*$`,
  'i',
);

function splitFields(input: string): Record<string, string> {
  const lines = input.replace(/\r\n?/g, '\n').split('\n');
  const out: Record<string, string> = {};
  let current: string | null = null;
  const buf: string[] = [];

  const flush = (): void => {
    if (current) {
      out[current] = buf.join('\n').trim();
    }
    buf.length = 0;
  };

  for (const line of lines) {
    const match = line.match(LABEL_PATTERN);
    if (match) {
      flush();
      current = match[1].toUpperCase().replace(/\s+/g, ' ');
    } else if (current) {
      buf.push(line);
    }
  }
  flush();
  return out;
}

function slugify(input: string): string {
  return (input || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['"`]/g, '')
    .replace(/[^a-z0-9\s-]+/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80) || 'draft';
}

function parseTags(raw: string): string[] {
  return raw
    .split(/[,;\n]+/)
    .map((s) => s.trim().toLowerCase().replace(/^[#*]+/, ''))
    .filter(Boolean);
}

function parseDate(raw: string): Date | null {
  const match = raw.match(/\d{4}-\d{2}-\d{2}/);
  if (!match) return null;
  const d = new Date(match[0] + 'T00:00:00Z');
  return Number.isNaN(d.getTime()) ? null : d;
}

function normaliseLocale(raw: string): 'en' | 'fr' {
  const v = raw.trim().toLowerCase();
  if (v === 'fr' || v.startsWith('fr')) return 'fr';
  return 'en';
}

export function parseDraftMarkdown(input: string): ParsedDraft {
  const notes: string[] = [];
  const fields = splitFields(input);

  const get = (...keys: string[]): string => {
    for (const k of keys) {
      const v = fields[k];
      if (v && v.trim()) return v.trim();
    }
    return '';
  };

  const title = get('TITLE');
  const description = get('SUBTITLE / LEDE', 'SUBTITLE', 'LEDE');
  const body = get('BODY');
  const tagsRaw = get('TAGS');
  const ctaHook = get('CTA HOOK');
  const localeRaw = get('LOCALE');
  const dateRaw = get('PUBLICATION DATE');
  const imageBrief = get('IMAGE BRIEF');

  if (!title) notes.push('Missing TITLE field.');
  if (!description) notes.push('Missing SUBTITLE / LEDE field.');
  if (!body) {
    // Fall back: if no BODY field was found, treat the whole input as
    // body so the editor can salvage what's there.
    notes.push('No BODY field detected — using the whole email body as draft body.');
  }
  if (!ctaHook) notes.push('Missing CTA HOOK field.');
  if (!tagsRaw) notes.push('No TAGS provided — defaulting to empty tag list.');

  return {
    locale: normaliseLocale(localeRaw),
    slug: slugify(title),
    title: title || '(no title provided)',
    description: description || '',
    body: body || input.trim(),
    tags: tagsRaw ? parseTags(tagsRaw) : [],
    ctaHook: ctaHook || null,
    publishedAt: dateRaw ? parseDate(dateRaw) : null,
    imageBrief: imageBrief || null,
    parseNotes: notes,
  };
}

/** Render a `ParsedDraft` (with any user edits applied) as a fully
 *  formed MDX file body — frontmatter + body — ready to be written
 *  to `src/content/posts/<locale>/<slug>.mdx`. */
export function renderDraftAsMdx(draft: ParsedDraft, opts: { coverFilename?: string } = {}): string {
  const fm: string[] = ['---'];
  fm.push(`title: ${JSON.stringify(draft.title)}`);
  fm.push(`description: ${JSON.stringify(draft.description)}`);
  if (draft.publishedAt) {
    fm.push(`publishedAt: ${draft.publishedAt.toISOString().slice(0, 10)}`);
  } else {
    fm.push(`publishedAt: ${new Date().toISOString().slice(0, 10)}`);
  }
  fm.push(`author: "Executive Founders"`);
  fm.push(`tags: [${draft.tags.map((t) => JSON.stringify(t)).join(', ')}]`);
  if (draft.ctaHook) {
    fm.push('cta:');
    fm.push(`  hook: ${JSON.stringify(draft.ctaHook)}`);
    fm.push(`  label: "Tell us about your situation"`);
  }
  fm.push('draft: false');
  if (opts.coverFilename) {
    fm.push(`cover: ./${opts.coverFilename}`);
  }
  fm.push('---');
  fm.push('');
  fm.push(draft.body.trim());
  fm.push('');
  return fm.join('\n');
}
