/**
 * English dictionary. This is the canonical source of the translation
 * shape: `type Dictionary = typeof en` is used to type every other
 * locale, so adding a key here makes it required everywhere.
 *
 * Keep user-visible English copy here — not inline in components — so
 * the French (and future) locales stay in lockstep.
 */
const en = {
  meta: {
    tagline: 'Governance · Strategic Advisory · Organisational Transformation',
    description:
      'We help organisations, executives and leadership teams scale with clarity, structure and operational excellence.',
  },

  nav: {
    items: [
      { key: 'services', label: 'Services', path: '/services' },
      { key: 'portfolio', label: 'Portfolio', path: '/portfolio' },
      { key: 'digital-media', label: 'Digital Media', path: '/digital-media' },
      { key: 'news', label: 'News', path: '/news' },
      { key: 'about', label: 'About', path: '/about' },
      { key: 'contact', label: 'Contact', path: '/contact' },
    ],
    cta: { label: 'Get in touch', path: '/contact' },
  },

  header: {
    skip: 'Skip to content',
    home: 'home',
    toggleNav: 'Toggle navigation',
    primaryNav: 'Primary',
  },

  langSwitcher: {
    label: 'Language',
    aria: 'Select language',
  },

  footer: {
    blurb: 'Governance, strategic advisory and operational leadership for modern organisations.',
    explore: 'Explore',
    contact: 'Contact',
    getInTouch: 'Get in touch',
    socialLabel: 'Social links',
    rights: 'All rights reserved.',
    tag: 'We operate at leadership level, not at task level.',
    legal: {
      heading: 'Legal',
      privacy: 'Privacy notice',
      terms: 'Terms of use',
      preferences: 'Cookie preferences',
    },
  },

  home: {
    heroPrimaryFull: 'Explore our services',
    heroPrimarySoft: 'Get in touch',
    heroSecondary: 'Start a conversation',

    approachTitle:
      'Strategic advisory partners for organisations in growth and transformation',
    approachBody:
      'Executive Founders supports companies navigating complex and evolving environments. We work alongside executives, founders and leadership teams to strengthen governance, structure transformation initiatives and create scalable operational models.',

    approach: [
      { title: 'Organisational Growth', body: 'Scaling structures and teams without losing operational coherence.' },
      { title: 'Operational Complexity', body: 'Reducing friction and improving alignment across functions.' },
      { title: 'Strategic Transformation', body: 'Structuring and guiding change initiatives from strategy to execution.' },
      { title: 'Leadership Alignment', body: 'Coordinating decision-making and execution at leadership level.' },
    ],

    pullquote:
      'Our role is to bridge strategy, governance and execution — operating at leadership level, helping organisations structure and guide transformation sustainably over time.',

    servicesTitle: 'Transforming complexity into structured execution',
    servicesLede: 'Five areas where we create lasting organisational impact.',
    services: [
      { title: 'Strategic Advisory', body: 'Guiding leadership through complexity and change.' },
      { title: 'Governance & Operational Leadership', body: 'Structuring accountability and decision-making.' },
      { title: 'PMO & Programme Governance', body: 'Coordinating execution across initiatives.' },
      { title: 'Organisational Scaling', body: 'Building structures that grow with the business.' },
      { title: 'AI Governance & Adoption', body: 'Governing AI integration responsibly.' },
    ],

    modelEyebrow: 'Our model',
    modelTitle: 'Advisory-led, execution-oriented',
    modelBody:
      'Executive Founders operates alongside leadership teams as a strategic and operational advisory partner — not to replace internal teams or provide isolated operational services.',

    helpHeading: 'We help organisations',
    helpItems: [
      'Structure transformation initiatives',
      'Strengthen governance',
      'Coordinate execution',
      'Align teams and priorities',
      'Guide organisational change',
      'Accelerate decision-making',
    ],
    roleHeading: 'Our role is to',
    roleItems: [
      'Provide direction',
      'Create operational structure',
      'Orchestrate execution',
      'Coordinate the right expertise when needed',
      'Move initiatives effectively from strategy to execution',
    ],
    callout:
      'We work closely with decision-makers through medium and long-term engagements focused on sustainable organisational evolution.',

    situationsTitle: 'Typical situations where we create value',
    situationsLede:
      'Organisations reach a point where complexity outpaces their existing structures. These are the moments where Executive Founders creates the most impact.',
    situations: [
      { title: 'Scaling Complexity', body: 'Growth generates operational friction, misalignment and execution bottlenecks that existing structures cannot absorb.' },
      { title: 'Leadership Overload', body: 'Executives and leadership teams become central decision points for operational coordination, limiting strategic focus.' },
      { title: 'Fragmented Execution', body: 'Teams, priorities and initiatives lose alignment and operational consistency across the organisation.' },
      { title: 'Transformation Pressure', body: 'Organisations struggle to evolve operationally while continuing to deliver on existing commitments.' },
      { title: 'Governance Gaps', body: 'Responsibilities, accountability and decision-making structures become unclear as the organisation grows.' },
    ],

    aiEyebrow: 'AI Governance',
    aiTitle:
      'AI is not only a technology shift — it is an organisational transformation challenge.',
    aiLede:
      'Most organisations adopt AI without a governance framework — creating shadow AI practices, fragmented adoption, unclear ownership and compliance risks.',
    aiCards: [
      { title: 'AI Governance Models', body: 'Structuring ownership, accountability and oversight.' },
      { title: 'Adoption Frameworks', body: 'Guiding responsible AI integration across the organisation.' },
      { title: 'Risk & Compliance', body: 'Managing shadow AI, data exposure and operational inconsistency.' },
    ],
    aiCallout:
      'We believe the real challenge is not how organisations use AI. The real challenge is how organisations implement, govern and scale AI responsibly and sustainably.',

    experienceTitle: 'Experience across growth and transformation environments',
    sectors: [
      { title: 'Consulting & Advisory', body: 'Supporting advisory-led organisations in structuring governance and scaling operational models.' },
      { title: 'Fintech & Technology', body: 'Guiding fast-growth technology and fintech businesses through operational complexity and transformation.' },
      { title: 'Digital Platforms', body: 'Structuring programme governance and execution coordination for digital-first organisations.' },
      { title: 'Innovation-Driven Businesses', body: 'Helping innovation-led companies align leadership, scale operations and govern transformation.' },
    ],
    experienceFootnote:
      'Typical initiatives include governance structuring, strategic programme leadership, operational transformation, PMO governance, organisational scaling, leadership alignment and execution coordination. We collaborate with specialised experts and operational partners when specific competencies are required, ensuring organisations receive the right expertise within a structured governance framework.',

    closingTitle: 'Modern organisations do not fail because of lack of vision.',
    closingLede:
      'They fail when governance, execution and organisational alignment do not scale at the same speed as complexity.',
    closingBody:
      'Executive Founders operates alongside leadership teams to help organisations structure transformation, coordinate execution and scale sustainably over time. We provide strategic and operational advisory designed to bring clarity, alignment and governance to organisations navigating growth and change.',
    closingButton: 'Discuss your situation',

    latestTitle: 'Latest insights',
    latestAll: 'All news →',
  },

  services: {
    seoTitle: 'Services',
    seoDescription:
      'Strategic advisory, governance, PMO, organisational scaling and AI governance — the five areas where Executive Founders creates lasting organisational impact.',
    eyebrow: 'What we do',
    title: 'Strategic advisory, governance and operational leadership',
    lede: 'We design and steer the structures that turn strategy into execution — from governance and PMO orchestration to AI adoption and organisational scaling.',
    items: [
      {
        title: 'Strategic Advisory',
        body: 'We work alongside executives and founders to navigate inflection points — clarifying priorities, sharpening strategic options and supporting decision-making with structure and discipline.',
        bullets: [
          'Leadership team coaching and decision support',
          'Strategic prioritisation and roadmap design',
          'Board and investor preparation',
        ],
      },
      {
        title: 'Governance & Operational Leadership',
        body: 'We help organisations structure accountability and decision-making — designing governance models that match the complexity of the business and the pace of change.',
        bullets: [
          'Governance model design and operating rhythm',
          'RACI / decision rights frameworks',
          'Interim operational leadership',
        ],
      },
      {
        title: 'PMO & Programme Governance',
        body: 'We coordinate execution across initiatives — establishing programme governance, transparent reporting and the operating cadence required to move at scale.',
        bullets: [
          'Strategic PMO set-up and uplift',
          'Portfolio prioritisation and dependency management',
          'Programme delivery oversight',
        ],
      },
      {
        title: 'Organisational Scaling',
        body: 'We build structures that grow with the business — designing operating models, role architecture and processes that absorb complexity instead of breaking under it.',
        bullets: [
          'Target operating model design',
          'Org design and leadership team architecture',
          'Process and workflow standardisation',
        ],
      },
      {
        title: 'AI Governance & Adoption',
        body: 'We govern AI integration responsibly — structuring ownership, risk management and adoption frameworks so AI scales sustainably across the organisation.',
        bullets: [
          'AI governance and policy frameworks',
          'Shadow-AI assessment and remediation',
          'Responsible AI adoption roadmap',
        ],
      },
    ],
    closingTitle: 'Looking for a structured conversation about your organisation?',
    closingBody:
      'We work with leadership teams through medium and long-term engagements focused on sustainable organisational evolution.',
    closingButton: 'Get in touch',
  },

  about: {
    seoTitle: 'About',
    seoDescription:
      'Executive Founders is a strategic and operational advisory firm. We work with executives, founders and leadership teams to bring clarity, structure and governance to organisations navigating growth and change.',
    eyebrow: 'About',
    title: 'We operate at leadership level, not at task level.',
    lede: 'Executive Founders is a strategic and operational advisory firm. We work with executives, founders and leadership teams to bring clarity, structure and governance to organisations navigating growth and change.',
    whoTitle: 'Who we are',
    whoBody: [
      'Modern organisations do not fail because of lack of vision. They fail when governance, execution and organisational alignment do not scale at the same speed as complexity.',
      'We operate alongside leadership teams to help organisations structure transformation, coordinate execution and scale sustainably over time. Our work bridges strategy, governance and execution.',
    ],
    engageTitle: 'How we engage',
    engageBody:
      'We work through medium and long-term engagements focused on sustainable organisational evolution — not isolated deliverables. Where specialised competencies are required, we coordinate the right experts within a clear governance framework.',
    side: [
      { title: 'Our mission', body: 'Helping organisations scale operationally with clarity, structure and sustainable governance.' },
      { title: 'Our approach', body: 'Advisory-led, execution-oriented partnerships at leadership level for lasting organisational impact.' },
      { title: 'Where we focus', body: 'Consulting & advisory, fintech & technology, digital platforms, innovation-driven businesses.' },
    ],
  },

  contact: {
    seoTitle: 'Contact',
    seoDescription:
      'Tell us about your organisation, the moment you are in, and what you would like to achieve. We will respond personally to discuss whether a structured engagement makes sense.',
    eyebrow: 'Contact',
    title: 'Start a conversation',
    lede: 'Tell us about your organisation, the moment you are in, and what you would like to achieve. We will respond personally to discuss whether a structured engagement makes sense.',
    form: {
      name: 'Name',
      email: 'Email',
      organisation: 'Organisation & role',
      topic: 'Area of interest',
      topicPlaceholder: 'Please choose…',
      options: [
        { value: 'strategic-advisory', label: 'Strategic Advisory' },
        { value: 'governance', label: 'Governance & Operational Leadership' },
        { value: 'pmo', label: 'PMO & Programme Governance' },
        { value: 'scaling', label: 'Organisational Scaling' },
        { value: 'ai-governance', label: 'AI Governance & Adoption' },
        { value: 'other', label: 'Other' },
      ],
      message: 'What would you like to discuss?',
      submit: 'Send message',
      note: 'We treat every message confidentially. We respond within two working days.',
      honeypot: 'Company URL',
    },
    feedback: {
      sending: 'Sending…',
      success: 'Thanks — we received your message and will reply shortly.',
      error: 'Something went wrong. Please try again in a moment.',
      networkError: 'Network error. Please try again in a moment.',
    },
    asideHeading: 'Get in touch',
    aside: [
      { title: 'What to expect', body: 'We respond within two working days with proposed next steps or a short call to scope the engagement.' },
      { title: 'Confidentiality', body: 'Every message is treated confidentially and only seen by the partners reviewing inbound enquiries.' },
    ],
  },

  portfolio: {
    seoTitle: 'Portfolio',
    seoDescription:
      'Selected engagements — governance redesigns, transformation programmes and scaling initiatives across consulting, fintech, technology and digital platforms.',
    eyebrow: 'Portfolio',
    title: 'Selected engagements',
    lede: 'A view into the organisations we partner with — governance redesigns, transformation programmes and scaling initiatives across consulting, fintech, technology and digital platforms.',
    emptyTitle: 'Case studies coming soon',
    emptyBody:
      'We are preparing a curated selection of engagements to share publicly. In the meantime, we are happy to discuss relevant references on a confidential basis.',
    emptyButton: 'Request references',
  },

  digitalMedia: {
    seoTitle: 'Digital Media',
    seoDescription:
      'Short-form videos, talks and interviews on the operational realities of scaling, governance gaps, transformation pressure and AI adoption.',
    eyebrow: 'Digital Media',
    title: 'Conversations on governance and transformation',
    lede: 'Short-form videos, talks and interviews on the operational realities of scaling, governance gaps, transformation pressure and AI adoption.',
    emptyTitle: 'Videos coming soon',
    emptyBody:
      'We are producing a library of short-form videos on governance, transformation and AI adoption.',
    emptyButton: 'Stay informed',
  },

  news: {
    seoTitle: 'News & insights',
    seoDescription:
      'Perspectives on governance, transformation, leadership and operational scaling — from engagements, not from theory.',
    eyebrow: 'News & insights',
    title: 'Perspectives from the field',
    lede: 'Articles, observations and frameworks on governance, transformation, leadership and operational scaling.',
    empty: 'No posts yet. Check back soon for updates.',
    rssTitle: 'News & insights',
  },

  notFound: {
    seoTitle: 'Page not found',
    seoDescription: 'The page you were looking for may have moved or been retired.',
    eyebrow: 'Not found',
    title: "This page couldn't be located.",
    lede: 'The page you were looking for may have moved or been retired. Try returning to the homepage or get in touch.',
    backHome: 'Back to home',
    contact: 'Contact us',
  },

  cards: {
    readArticle: 'Read article →',
    readEngagement: 'Read engagement →',
    caseStudyFallback: 'Case study',
  },

  legal: {
    eyebrow: 'Legal',
    effectiveDate: 'Effective',
    updatedAt: 'Last updated',
    reviewBanner:
      'Working draft — to be reviewed by counsel before publication. Verify legal entity, address, contact email and effective date.',
    privacyPath: '/privacy',
    termsPath: '/terms',
    privacySeoTitle: 'Privacy notice',
    privacySeoDescription:
      'How Executive Founders handles personal data on executivefounders.com. Contact-form data, retention, your rights under GDPR and Swiss revDSG.',
    termsSeoTitle: 'Terms of use',
    termsSeoDescription:
      'Terms governing the use of executivefounders.com — intellectual property, disclaimers, and Swiss governing law.',
  },

  cookieBanner: {
    title: 'A short note about this website',
    body:
      'We do not use cookies for analytics, advertising or tracking. Your browser only stores a small record once you acknowledge this notice, so we do not show it on every visit.',
    moreInfo: 'Read our privacy notice',
    acknowledge: 'Got it',
    closeAria: 'Dismiss notice',
  },
};

export default en;

export type Dictionary = typeof en;
