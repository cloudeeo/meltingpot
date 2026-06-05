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
      { title: 'Corporate Compliance with AI Frameworks', body: 'Aligning AI operations with ISO/IEC 42001, the EU AI Act and NIST AI RMF.' },
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
      {
        title: 'Corporate Compliance with AI Frameworks',
        body: 'We help organisations meet their obligations under the emerging AI governance landscape — designing the controls, documentation and accountability needed for compliance with ISO/IEC 42001, the EU AI Act and the NIST AI Risk Management Framework.',
        bullets: [
          'ISO/IEC 42001 readiness and AI Management System design',
          'EU AI Act compliance mapping and risk classification',
          'NIST AI RMF integration and operationalisation',
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

  aiGovernance: {
    path: '/ai-governance',
    seoTitle: 'AI Readiness & Governance Programme',
    seoDescription:
      'A governance-first, advisory-led programme that helps leadership teams make informed AI decisions before making AI investments — across opportunity assessment, governance framework and business case simulation.',
    homeCtaLabel: 'Discover the AI Readiness & Governance Programme',

    hero: {
      eyebrow: 'Flagship programme',
      title: 'AI Readiness & Governance Programme',
      lede: 'Helping organisations adopt AI with clarity, governance and confidence.',
      body:
        'Executive Founders supports organisations in making informed AI decisions before making AI investments. The programme is governance-first, advisory-led and designed for leadership teams responsible for AI strategy and investment.',
      primaryCta: 'Talk to us',
      secondaryCta: 'See the three stages',
    },

    wrongWay: {
      title: 'Most organisations are approaching AI the wrong way',
      lede: 'They start with technology. They should start with governance.',
      intro: 'Today, organisations are rapidly adopting AI solutions without a clear framework for:',
      cards: [
        { title: 'Governance', body: 'No structured policies or oversight for AI adoption.' },
        { title: 'Accountability', body: 'Unclear ownership and responsibility across teams.' },
        { title: 'Risk management', body: 'Uncontrolled exposure to operational and compliance risks.' },
        { title: 'Operational integration', body: 'Fragmented adoption with no cohesive execution model.' },
      ],
      callout:
        'The result is fragmented adoption, growing risks and unclear business value. We help organisations build the foundations required for responsible and scalable AI adoption.',
    },

    readiness: {
      title: 'Why AI readiness matters',
      lede: 'The challenge is not whether organisations will adopt AI. The challenge is whether they are prepared to do so successfully.',
      cards: [
        { title: 'Shadow AI practices', body: 'Unmanaged AI usage emerging across teams without oversight or controls.' },
        { title: 'Uncontrolled data exposure', body: 'Sensitive data entering AI systems without proper governance or policies.' },
        { title: 'Compliance risks', body: 'Regulatory and legal exposure from unstructured AI integration.' },
        { title: 'Fragmented initiatives', body: 'Duplicated investments and unclear ownership across the organisation.' },
        { title: 'Limited business impact', body: 'Experimentation that fails to translate into sustainable business value.' },
      ],
      callout:
        'AI readiness creates the structure required to transform experimentation into sustainable business value.',
    },

    stages: {
      eyebrow: 'Our approach',
      title: 'Three stages. One objective.',
      lede: 'Building the foundations for successful AI adoption.',
      stages: [
        {
          number: '01',
          title: 'AI opportunity assessment',
          body: 'Identify where AI can create measurable business value across business processes, workflows and operations.',
        },
        {
          number: '02',
          title: 'AI governance framework',
          body: 'Build the governance, ownership structures, policies and decision-making frameworks required for responsible adoption.',
        },
        {
          number: '03',
          title: 'AI business case simulation',
          body: 'Evaluate implementation scenarios, investment requirements, expected benefits and ROI before committing.',
        },
      ],
      callout:
        'Understand where AI should be introduced, govern how it is adopted, and validate investment decisions based on facts rather than assumptions.',
    },

    governance: {
      title: 'Why governance matters',
      lede:
        'Organisations are not exposed to AI risks because they use AI. They are exposed to AI risks because they use AI without governance.',
      challengesHeading: 'Common challenges',
      challenges: [
        'Uncontrolled AI adoption',
        'Shadow AI initiatives',
        'Data security concerns',
        'Compliance exposure',
      ],
      withoutHeading: 'Without structure',
      without: [
        'Fragmented technology choices',
        'Inconsistent operational practices',
        'Unclear accountability',
        'Unmanaged risk exposure',
      ],
      callout:
        'Governance is not a limitation. It is the foundation that enables AI to scale responsibly and sustainably.',
    },

    audience: {
      title: 'Designed for decision makers',
      lede: 'The programme is designed for the leaders responsible for AI strategy and investment decisions.',
      cards: [
        {
          title: 'CEOs & general managers',
          body: 'Setting the strategic direction for AI adoption across the organisation.',
        },
        {
          title: 'Executive committees & board members',
          body: 'Overseeing governance, risk and investment decisions at the highest level.',
        },
        {
          title: 'Department heads & transformation leaders',
          body: 'Leading operational integration and organisational change initiatives.',
        },
      ],
      callout:
        'The objective is simple: provide leadership teams with the clarity required to make confident AI decisions.',
    },

    engagement: {
      title: 'Flexible engagement model',
      lede: 'Organisations can engage with us through individual modules or the complete programme.',
      modules: [
        {
          number: '01',
          title: 'AI opportunity assessment',
          body: 'Identify where AI can create measurable business value across your processes and operations.',
        },
        {
          number: '02',
          title: 'AI governance framework',
          body: 'Build the governance structures, ownership models and policies required for responsible AI adoption.',
        },
        {
          number: '03',
          title: 'AI business case simulation',
          body: 'Evaluate investment requirements, operational costs, expected benefits and ROI before making commitments.',
        },
      ],
      bundleLabel: 'Complete programme',
      bundle:
        'A structured roadmap covering assessment, governance and investment readiness — delivered as a single integrated engagement.',
    },

    next: {
      title: 'What happens next',
      lede:
        'Once readiness, governance and business viability have been established, organisations can move forward with confidence.',
      cards: [
        {
          title: 'Coordinating transformation',
          body: 'Structuring and overseeing the execution of AI transformation initiatives.',
        },
        {
          title: 'Sustaining governance',
          body: 'Maintaining governance structures and aligning stakeholders as adoption scales.',
        },
        {
          title: 'Mobilising the right expertise',
          body: 'Connecting organisations with the capabilities needed to execute successfully.',
        },
      ],
      callout:
        'We remain focused on governance, advisory and transformation leadership while ensuring organisations have access to the capabilities needed to execute successfully.',
    },

    closing: {
      title: 'Start with governance. Scale with confidence.',
      body:
        'Whether you engage us for a single module or the complete programme, the outcome is the same — a leadership team able to make informed AI decisions before committing investment.',
      button: 'Discuss your situation',
    },
  },
};

export default en;

export type Dictionary = typeof en;
