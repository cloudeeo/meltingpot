export type IconKey =
  | 'advisory'
  | 'positioning'
  | 'governance'
  | 'pmo'
  | 'scale'
  | 'ai'
  | 'compliance';

export const ICONS: Record<IconKey, string> = {
  advisory:
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M4 26h24M8 26V14h4v12M16 26V8h4v18M24 26v-6h-3v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  positioning:
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="16" cy="16" r="3" fill="currentColor"/><path d="M16 2v6m0 16v6M2 16h6m16 0h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  governance:
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M16 4 4 10v2h24v-2L16 4Zm-9 9v11M12 13v11M20 13v11M25 13v11M4 28h24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pmo:
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><rect x="13" y="4" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="22" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="13" y="22" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="22" y="22" width="6" height="6" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 10v6m-9 6v-3a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v3" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  scale:
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M4 26 14 16l6 6 8-10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 12h6v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  ai:
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><circle cx="16" cy="16" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 4v4m0 16v4M4 16h4m16 0h4M7 7l3 3m12 12 3 3M7 25l3-3m12-12 3-3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  compliance:
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M16 4 26 8v6c0 6-4 11-10 14-6-3-10-8-10-14V8l10-4Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M11 16l3.5 3.5L21 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};
