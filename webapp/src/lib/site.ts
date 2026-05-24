import { isHidden } from './launch';

const FULL_NAV = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Digital Media', href: '/digital-media' },
  { label: 'News', href: '/news' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SITE = {
  name: 'Executive Founders',
  tagline: 'Governance · Strategic Advisory · Organisational Transformation',
  description:
    'We help organisations, executives and leadership teams scale with clarity, structure and operational excellence.',
  url: (import.meta.env.PUBLIC_SITE_URL ?? 'https://executivefounders.com').replace(/\/$/, ''),
  social: {
    linkedin: 'https://www.linkedin.com/company/executive-founders',
    youtube: '',
    twitter: '',
  },
  nav: FULL_NAV.filter((item) => !isHidden(item.href)),
  cta: { label: 'Get in touch', href: '/contact' },
} as const;

export type NavItem = (typeof FULL_NAV)[number];
