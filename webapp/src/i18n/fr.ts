import type { Dictionary } from './en';

/**
 * French dictionary. Typed as `Dictionary` so the compiler enforces that
 * every key present in `en.ts` is translated here. Route `path`s and form
 * option `value`s intentionally mirror English — only display copy differs.
 */
const fr: Dictionary = {
  meta: {
    tagline: 'Gouvernance · Conseil stratégique · Transformation organisationnelle',
    description:
      "Nous aidons les organisations, les dirigeants et les équipes de direction à se développer avec clarté, structure et excellence opérationnelle.",
  },

  nav: {
    items: [
      { key: 'services', label: 'Services', path: '/services' },
      { key: 'portfolio', label: 'Réalisations', path: '/portfolio' },
      { key: 'digital-media', label: 'Médias', path: '/digital-media' },
      { key: 'news', label: 'Actualités', path: '/news' },
      { key: 'about', label: 'À propos', path: '/about' },
      { key: 'contact', label: 'Contact', path: '/contact' },
    ],
    cta: { label: 'Nous contacter', path: '/contact' },
  },

  header: {
    skip: 'Aller au contenu',
    home: 'accueil',
    toggleNav: 'Afficher ou masquer la navigation',
    primaryNav: 'Principale',
  },

  langSwitcher: {
    label: 'Langue',
    aria: 'Choisir la langue',
  },

  footer: {
    blurb: 'Gouvernance, conseil stratégique et leadership opérationnel pour les organisations modernes.',
    explore: 'Explorer',
    contact: 'Contact',
    getInTouch: 'Nous contacter',
    socialLabel: 'Liens sociaux',
    rights: 'Tous droits réservés.',
    tag: 'Nous intervenons au niveau de la direction, pas au niveau des tâches.',
  },

  home: {
    heroPrimaryFull: 'Découvrir nos services',
    heroPrimarySoft: 'Nous contacter',
    heroSecondary: 'Démarrer la conversation',

    approachTitle:
      'Partenaires de conseil stratégique pour les organisations en croissance et en transformation',
    approachBody:
      "Executive Founders accompagne les entreprises évoluant dans des environnements complexes et changeants. Nous travaillons aux côtés des dirigeants, des fondateurs et des équipes de direction pour renforcer la gouvernance, structurer les initiatives de transformation et créer des modèles opérationnels évolutifs.",

    approach: [
      { title: 'Croissance organisationnelle', body: "Faire évoluer les structures et les équipes sans perdre la cohérence opérationnelle." },
      { title: 'Complexité opérationnelle', body: "Réduire les frictions et améliorer l'alignement entre les fonctions." },
      { title: 'Transformation stratégique', body: "Structurer et guider les initiatives de changement, de la stratégie à l'exécution." },
      { title: 'Alignement de la direction', body: "Coordonner la prise de décision et l'exécution au niveau de la direction." },
    ],

    pullquote:
      "Notre rôle est de relier stratégie, gouvernance et exécution — en intervenant au niveau de la direction, pour aider les organisations à structurer et guider leur transformation de manière durable dans le temps.",

    servicesTitle: 'Transformer la complexité en exécution structurée',
    servicesLede: 'Cinq domaines dans lesquels nous créons un impact organisationnel durable.',
    services: [
      { title: 'Conseil stratégique', body: "Accompagner la direction à travers la complexité et le changement." },
      { title: 'Gouvernance et leadership opérationnel', body: 'Structurer les responsabilités et la prise de décision.' },
      { title: 'PMO et gouvernance de programme', body: "Coordonner l'exécution entre les initiatives." },
      { title: "Mise à l'échelle organisationnelle", body: "Construire des structures qui évoluent avec l'entreprise." },
      { title: "Gouvernance et adoption de l'IA", body: "Encadrer l'intégration de l'IA de manière responsable." },
    ],

    modelEyebrow: 'Notre modèle',
    modelTitle: "Guidé par le conseil, orienté vers l'exécution",
    modelBody:
      "Executive Founders intervient aux côtés des équipes de direction en tant que partenaire de conseil stratégique et opérationnel — non pas pour remplacer les équipes internes ni pour fournir des prestations opérationnelles isolées.",

    helpHeading: 'Nous aidons les organisations à',
    helpItems: [
      'Structurer les initiatives de transformation',
      'Renforcer la gouvernance',
      "Coordonner l'exécution",
      'Aligner les équipes et les priorités',
      'Guider le changement organisationnel',
      'Accélérer la prise de décision',
    ],
    roleHeading: 'Notre rôle consiste à',
    roleItems: [
      'Donner une direction',
      'Créer une structure opérationnelle',
      "Orchestrer l'exécution",
      'Coordonner la bonne expertise au moment voulu',
      "Faire passer efficacement les initiatives de la stratégie à l'exécution",
    ],
    callout:
      "Nous travaillons en étroite collaboration avec les décideurs dans le cadre de missions à moyen et long terme, axées sur une évolution organisationnelle durable.",

    situationsTitle: 'Situations typiques où nous créons de la valeur',
    situationsLede:
      "Les organisations atteignent un point où la complexité dépasse leurs structures existantes. Ce sont les moments où Executive Founders crée le plus d'impact.",
    situations: [
      { title: "Complexité de la mise à l'échelle", body: "La croissance génère des frictions opérationnelles, des désalignements et des goulets d'étranglement que les structures existantes ne peuvent absorber." },
      { title: 'Surcharge de la direction', body: "Les dirigeants et les équipes de direction deviennent les points de décision centraux de la coordination opérationnelle, ce qui limite leur concentration stratégique." },
      { title: 'Exécution fragmentée', body: "Les équipes, les priorités et les initiatives perdent leur alignement et leur cohérence opérationnelle à l'échelle de l'organisation." },
      { title: 'Pression de transformation', body: "Les organisations peinent à évoluer sur le plan opérationnel tout en continuant d'honorer leurs engagements existants." },
      { title: 'Lacunes de gouvernance', body: "Les responsabilités, l'imputabilité et les structures de décision deviennent floues à mesure que l'organisation grandit." },
    ],

    aiEyebrow: "Gouvernance de l'IA",
    aiTitle:
      "L'IA n'est pas seulement un changement technologique — c'est un défi de transformation organisationnelle.",
    aiLede:
      "La plupart des organisations adoptent l'IA sans cadre de gouvernance — créant des pratiques d'IA fantôme, une adoption fragmentée, une responsabilité floue et des risques de conformité.",
    aiCards: [
      { title: "Modèles de gouvernance de l'IA", body: "Structurer la responsabilité, l'imputabilité et la supervision." },
      { title: "Cadres d'adoption", body: "Guider une intégration responsable de l'IA dans toute l'organisation." },
      { title: 'Risque et conformité', body: "Gérer l'IA fantôme, l'exposition des données et l'incohérence opérationnelle." },
    ],
    aiCallout:
      "Nous pensons que le véritable défi n'est pas la manière dont les organisations utilisent l'IA. Le véritable défi est la manière dont les organisations mettent en œuvre, encadrent et déploient l'IA de façon responsable et durable.",

    experienceTitle: 'Une expérience dans des environnements de croissance et de transformation',
    sectors: [
      { title: 'Conseil et accompagnement', body: "Accompagner les organisations de conseil dans la structuration de leur gouvernance et la mise à l'échelle de leurs modèles opérationnels." },
      { title: 'Fintech et technologie', body: 'Guider les entreprises technologiques et fintech à forte croissance à travers la complexité opérationnelle et la transformation.' },
      { title: 'Plateformes numériques', body: "Structurer la gouvernance de programme et la coordination de l'exécution pour les organisations nativement numériques." },
      { title: "Entreprises tournées vers l'innovation", body: "Aider les entreprises portées par l'innovation à aligner leur direction, faire évoluer leurs opérations et encadrer leur transformation." },
    ],
    experienceFootnote:
      "Les missions typiques comprennent la structuration de la gouvernance, la direction stratégique de programmes, la transformation opérationnelle, la gouvernance de PMO, la mise à l'échelle organisationnelle, l'alignement de la direction et la coordination de l'exécution. Nous collaborons avec des experts spécialisés et des partenaires opérationnels lorsque des compétences spécifiques sont requises, afin que les organisations bénéficient de la bonne expertise dans un cadre de gouvernance structuré.",

    closingTitle: "Les organisations modernes n'échouent pas par manque de vision.",
    closingLede:
      "Elles échouent lorsque la gouvernance, l'exécution et l'alignement organisationnel n'évoluent pas au même rythme que la complexité.",
    closingBody:
      "Executive Founders intervient aux côtés des équipes de direction pour aider les organisations à structurer leur transformation, coordonner leur exécution et se développer durablement dans le temps. Nous offrons un conseil stratégique et opérationnel conçu pour apporter clarté, alignement et gouvernance aux organisations en croissance et en transformation.",
    closingButton: 'Discuter de votre situation',

    latestTitle: 'Derniers articles',
    latestAll: 'Toutes les actualités →',
  },

  services: {
    seoTitle: 'Services',
    seoDescription:
      "Conseil stratégique, gouvernance, PMO, mise à l'échelle organisationnelle et gouvernance de l'IA — les cinq domaines dans lesquels Executive Founders crée un impact organisationnel durable.",
    eyebrow: 'Ce que nous faisons',
    title: 'Conseil stratégique, gouvernance et leadership opérationnel',
    lede: "Nous concevons et pilotons les structures qui transforment la stratégie en exécution — de la gouvernance et l'orchestration du PMO à l'adoption de l'IA et la mise à l'échelle organisationnelle.",
    items: [
      {
        title: 'Conseil stratégique',
        body: "Nous travaillons aux côtés des dirigeants et des fondateurs pour franchir les moments charnières — en clarifiant les priorités, en affinant les options stratégiques et en soutenant la prise de décision avec structure et rigueur.",
        bullets: [
          "Accompagnement de l'équipe de direction et aide à la décision",
          'Priorisation stratégique et conception de la feuille de route',
          "Préparation du conseil d'administration et des investisseurs",
        ],
      },
      {
        title: 'Gouvernance et leadership opérationnel',
        body: "Nous aidons les organisations à structurer les responsabilités et la prise de décision — en concevant des modèles de gouvernance adaptés à la complexité de l'entreprise et au rythme du changement.",
        bullets: [
          'Conception du modèle de gouvernance et rythme opérationnel',
          'Cadres RACI / droits de décision',
          'Direction opérationnelle de transition',
        ],
      },
      {
        title: 'PMO et gouvernance de programme',
        body: "Nous coordonnons l'exécution entre les initiatives — en établissant la gouvernance de programme, un reporting transparent et la cadence opérationnelle nécessaire pour avancer à grande échelle.",
        bullets: [
          "Mise en place et montée en puissance d'un PMO stratégique",
          'Priorisation du portefeuille et gestion des dépendances',
          'Supervision de la livraison des programmes',
        ],
      },
      {
        title: "Mise à l'échelle organisationnelle",
        body: "Nous construisons des structures qui évoluent avec l'entreprise — en concevant des modèles opérationnels, une architecture des rôles et des processus qui absorbent la complexité au lieu de céder sous son poids.",
        bullets: [
          'Conception du modèle opérationnel cible',
          "Conception organisationnelle et architecture de l'équipe de direction",
          'Standardisation des processus et des flux de travail',
        ],
      },
      {
        title: "Gouvernance et adoption de l'IA",
        body: "Nous encadrons l'intégration de l'IA de manière responsable — en structurant la responsabilité, la gestion des risques et les cadres d'adoption afin que l'IA se déploie durablement dans toute l'organisation.",
        bullets: [
          "Cadres de gouvernance et de politique de l'IA",
          "Évaluation et remédiation de l'IA fantôme",
          "Feuille de route d'adoption responsable de l'IA",
        ],
      },
    ],
    closingTitle: 'Vous souhaitez une conversation structurée au sujet de votre organisation ?',
    closingBody:
      'Nous travaillons avec les équipes de direction dans le cadre de missions à moyen et long terme, axées sur une évolution organisationnelle durable.',
    closingButton: 'Nous contacter',
  },

  about: {
    seoTitle: 'À propos',
    seoDescription:
      "Executive Founders est un cabinet de conseil stratégique et opérationnel. Nous travaillons avec les dirigeants, les fondateurs et les équipes de direction pour apporter clarté, structure et gouvernance aux organisations en croissance et en transformation.",
    eyebrow: 'À propos',
    title: 'Nous intervenons au niveau de la direction, pas au niveau des tâches.',
    lede: "Executive Founders est un cabinet de conseil stratégique et opérationnel. Nous travaillons avec les dirigeants, les fondateurs et les équipes de direction pour apporter clarté, structure et gouvernance aux organisations en croissance et en transformation.",
    whoTitle: 'Qui nous sommes',
    whoBody: [
      "Les organisations modernes n'échouent pas par manque de vision. Elles échouent lorsque la gouvernance, l'exécution et l'alignement organisationnel n'évoluent pas au même rythme que la complexité.",
      "Nous intervenons aux côtés des équipes de direction pour aider les organisations à structurer leur transformation, coordonner leur exécution et se développer durablement dans le temps. Notre travail relie stratégie, gouvernance et exécution.",
    ],
    engageTitle: 'Comment nous intervenons',
    engageBody:
      "Nous travaillons dans le cadre de missions à moyen et long terme, axées sur une évolution organisationnelle durable — et non sur des livrables isolés. Lorsque des compétences spécialisées sont requises, nous coordonnons les bons experts dans un cadre de gouvernance clair.",
    side: [
      { title: 'Notre mission', body: "Aider les organisations à se développer sur le plan opérationnel avec clarté, structure et une gouvernance durable." },
      { title: 'Notre approche', body: "Des partenariats guidés par le conseil et orientés vers l'exécution, au niveau de la direction, pour un impact organisationnel durable." },
      { title: 'Nos domaines de prédilection', body: "Conseil et accompagnement, fintech et technologie, plateformes numériques, entreprises tournées vers l'innovation." },
    ],
  },

  contact: {
    seoTitle: 'Contact',
    seoDescription:
      "Parlez-nous de votre organisation, du moment que vous traversez et de ce que vous souhaitez accomplir. Nous vous répondrons personnellement pour déterminer si une mission structurée a du sens.",
    eyebrow: 'Contact',
    title: 'Démarrer la conversation',
    lede: "Parlez-nous de votre organisation, du moment que vous traversez et de ce que vous souhaitez accomplir. Nous vous répondrons personnellement pour déterminer si une mission structurée a du sens.",
    form: {
      name: 'Nom',
      email: 'E-mail',
      organisation: 'Organisation et fonction',
      topic: "Domaine d'intérêt",
      topicPlaceholder: 'Veuillez choisir…',
      options: [
        { value: 'strategic-advisory', label: 'Conseil stratégique' },
        { value: 'governance', label: 'Gouvernance et leadership opérationnel' },
        { value: 'pmo', label: 'PMO et gouvernance de programme' },
        { value: 'scaling', label: "Mise à l'échelle organisationnelle" },
        { value: 'ai-governance', label: "Gouvernance et adoption de l'IA" },
        { value: 'other', label: 'Autre' },
      ],
      message: 'Que souhaitez-vous aborder ?',
      submit: 'Envoyer le message',
      note: 'Chaque message est traité de manière confidentielle. Nous répondons sous deux jours ouvrés.',
      honeypot: "URL de l'entreprise",
    },
    feedback: {
      sending: 'Envoi…',
      success: 'Merci — nous avons bien reçu votre message et vous répondrons sous peu.',
      error: 'Une erreur est survenue. Veuillez réessayer dans un instant.',
      networkError: 'Erreur réseau. Veuillez réessayer dans un instant.',
    },
    asideHeading: 'Nous contacter',
    aside: [
      { title: "À quoi s'attendre", body: "Nous répondons sous deux jours ouvrés en proposant les prochaines étapes ou un court échange pour cadrer la mission." },
      { title: 'Confidentialité', body: "Chaque message est traité de manière confidentielle et n'est consulté que par les associés examinant les demandes entrantes." },
    ],
  },

  portfolio: {
    seoTitle: 'Réalisations',
    seoDescription:
      "Missions sélectionnées — refontes de gouvernance, programmes de transformation et initiatives de mise à l'échelle dans le conseil, la fintech, la technologie et les plateformes numériques.",
    eyebrow: 'Réalisations',
    title: 'Missions sélectionnées',
    lede: "Un aperçu des organisations que nous accompagnons — refontes de gouvernance, programmes de transformation et initiatives de mise à l'échelle dans le conseil, la fintech, la technologie et les plateformes numériques.",
    emptyTitle: 'Études de cas à venir',
    emptyBody:
      "Nous préparons une sélection de missions à partager publiquement. En attendant, nous serons heureux d'échanger sur des références pertinentes à titre confidentiel.",
    emptyButton: 'Demander des références',
  },

  digitalMedia: {
    seoTitle: 'Médias',
    seoDescription:
      "Vidéos courtes, conférences et entretiens sur les réalités opérationnelles de la mise à l'échelle, les lacunes de gouvernance, la pression de transformation et l'adoption de l'IA.",
    eyebrow: 'Médias',
    title: 'Conversations sur la gouvernance et la transformation',
    lede: "Vidéos courtes, conférences et entretiens sur les réalités opérationnelles de la mise à l'échelle, les lacunes de gouvernance, la pression de transformation et l'adoption de l'IA.",
    emptyTitle: 'Vidéos à venir',
    emptyBody:
      "Nous produisons une bibliothèque de vidéos courtes sur la gouvernance, la transformation et l'adoption de l'IA.",
    emptyButton: 'Rester informé',
  },

  news: {
    seoTitle: 'Actualités et analyses',
    seoDescription:
      "Perspectives sur la gouvernance, la transformation, le leadership et la mise à l'échelle opérationnelle — issues de missions réelles, pas de la théorie.",
    eyebrow: 'Actualités et analyses',
    title: 'Perspectives de terrain',
    lede: "Articles, observations et cadres sur la gouvernance, la transformation, le leadership et la mise à l'échelle opérationnelle.",
    empty: 'Aucun article pour le moment. Revenez bientôt pour des nouveautés.',
    rssTitle: 'Actualités et analyses',
  },

  notFound: {
    seoTitle: 'Page introuvable',
    seoDescription: 'La page que vous recherchiez a peut-être été déplacée ou retirée.',
    eyebrow: 'Introuvable',
    title: 'Cette page est introuvable.',
    lede: "La page que vous recherchiez a peut-être été déplacée ou retirée. Essayez de revenir à l'accueil ou de nous contacter.",
    backHome: "Retour à l'accueil",
    contact: 'Nous contacter',
  },

  cards: {
    readArticle: "Lire l'article →",
    readEngagement: 'Lire la mission →',
    caseStudyFallback: 'Étude de cas',
  },
};

export default fr;
