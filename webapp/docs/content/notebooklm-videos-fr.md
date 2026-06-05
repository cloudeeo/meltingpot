# Briefs vidéo NotebookLM — version française

Versions françaises des quatre briefs vidéo. Mêmes thèmes, même
structure, même séquence de publication que la version anglaise (voir
`notebooklm-videos.md` pour le workflow détaillé, qui est identique).

## À propos de la contrainte « À l'écran »

Chaque prompt de personnalisation contient un paragraphe commençant
par « **À l'écran : conservez des visuels de diapositive minimaux…** ».
C'est volontaire. NotebookLM Video Overview produit ses diapositives
avec un modèle d'image qui hallucine le texte affiché — des
paragraphes plausibles au premier coup d'œil, mais dont les mots sont
en réalité incohérents. Pour une audience professionnelle suisse,
c'est rédhibitoire. La contrainte limite chaque diapositive à environ
cinq mots, ce qui réduit considérablement (sans l'éliminer) la
surface d'erreur. Si une génération produit encore des diapositives
inacceptables, régénérez ; si la seconde échoue aussi, basculez cette
vidéo en Audio Overview et laissez la vignette YouTube assurer le
visuel.

## Particularité de NotebookLM en français

NotebookLM choisit la langue de sortie en fonction de la langue de ses
sources. Pour obtenir une voix française :

- coller la **source** ci-dessous en français (texte fourni) ;
- coller le **prompt de personnalisation** en français (texte fourni).

Si une voix française à l'accent américain apparaît malgré tout,
ajoutez explicitement à la fin du prompt : *« Voix française neutre,
sans accent américain. »*

## Calibrage du ton, valable pour les quatre vidéos

**À éviter :**

- Blagues, ironie, plaisanteries, complicité entre animateurs.
- « Bon, en gros... », « C'est juste incroyable », tics conversationnels
  américains.
- Mots à la mode : synergie, levier (comme verbe), best-in-class,
  robuste, fluide, holistique, écosystème, parcours, étoile polaire,
  monter au niveau supérieur.
- Verbes vagues : « nous aidons les organisations ».

**À privilégier :**

- Un registre professionnel suisse mesuré, légèrement formel.
- Verbes d'action opérationnels : *restructurer, recadrer, refondre,
  rétablir, dénouer, séparer, redonner*.
- Scénarios concrets et plausibles plutôt que des abstractions
  (« une fintech de série B avec 180 ingénieurs » plutôt que
  « une entreprise technologique en forte croissance »).
- Un résultat quantitatif ou qualitativement clair par sujet.

**Audience :**
Direction générale, conseil d'administration, cadres dirigeants des
grands groupes et PME suisses ; cadres dirigeants des administrations
publiques. Auditeurs multilingues, à l'aise en français comme en
anglais. Peu de temps, intolérants aux abstractions.

## Style des vignettes (commun aux quatre vidéos)

Mêmes prompts d'image qu'en anglais (les générateurs d'images
fonctionnent mieux en anglais ; le sujet de la vignette n'a pas de
texte visible). Voir `notebooklm-videos.md`, section "Thumbnail style".

---

## Vidéo 1 — *Pourquoi les stratégies échouent — et que faire*

Vidéo socle. La thèse Executive Founders : la plupart des échecs
stratégiques ne sont pas des échecs de vision. Ce sont des échecs de
gouvernance, d'exécution et d'alignement qui ne suivent pas le rythme
de la complexité.

**Description (carte sur `/fr/digital-media`) :**
« La plupart des stratégies n'échouent pas parce que la vision était
fausse. Elles échouent parce que la gouvernance, l'exécution et
l'alignement cessent de se mettre à l'échelle au même rythme que
l'organisation. Court explicatif sur ce que cela donne — et sur ce
qu'on peut corriger. »

### Source NotebookLM

À coller comme source texte unique :

```text
Executive Founders — Pourquoi les stratégies échouent, et que faire

La thèse

Les organisations modernes échouent rarement parce que leur stratégie
était mauvaise. Elles échouent quand la gouvernance, l'exécution et
l'alignement organisationnel ne se mettent pas à l'échelle au même
rythme que la complexité. La vision survit à la revue trimestrielle.
Le rythme opérationnel, lui, ne suit pas.

À quoi ressemble une « gouvernance, exécution et alignement qui ne se
mettent pas à l'échelle »

Trois symptômes apparaissent presque toujours ensemble.

Premier symptôme : les décisions sont rouvertes. Le même arbitrage
revient au comité de pilotage trois semaines de suite parce que le
cadre de décision n'a jamais été délégué à un niveau autre que le
comité de direction. Les droits de décision sont implicites, donc
l'escalade devient le mode par défaut.

Deuxième symptôme : la direction devient le goulot d'étranglement. Les
fondateurs ou les dirigeants deviennent de fait les coordinateurs
transversaux entre fonctions parce qu'aucun mécanisme horizontal
n'existe. Chaque fonction fonctionne correctement en silo ; les
interfaces entre elles n'appartiennent à personne.

Troisième symptôme : l'exécution diverge de la stratégie sans que
personne ne le remarque pendant un trimestre. Aucun rythme opérationnel
ne fait apparaître l'écart entre ce qui a été engagé et ce qui se
passe réellement.

À quoi ressemble une intervention en pratique

Nous reconstruisons trois couches plutôt que de réécrire la stratégie.

Nous restructurons les droits de décision. Qui décide quoi, avec
quelle autorité, à quelle cadence — et nous posons cela sur une page
que le comité de direction utilise réellement, pas une slide qui
finit enterrée.

Nous installons une source unique de vérité opérationnelle. Une vue
portefeuille unique, hebdomadaire, avec des responsables nommés.
Statut, capacité, blocages, décisions à prendre. Une seule page,
utilisée en réunion de trente minutes. Pas un tableau de bord que
personne n'ouvre.

Nous séparons la cadence de la stratégie de la cadence de l'exécution.
La revue stratégique est trimestrielle et lente. La revue d'exécution
est hebdomadaire et rapide. Les deux sont reliées par un petit nombre
d'engagements explicites, pas par un alignement supposé.

Pourquoi nous travaillons ainsi

Nous intervenons au niveau de la direction, pas au niveau des tâches.
Nous sommes un partenaire de conseil stratégique et opérationnel —
nous ne remplaçons pas les équipes internes, nous ne reprenons pas la
main sur des fonctions, et nous ne produisons pas des présentations
pour elles-mêmes. Nos missions sont de moyen et long terme parce que
les structures que nous mettons en place doivent être vécues pour
s'installer.

Un signal pratique

Si la réponse honnête à « est-ce que le travail avance ? » dans votre
organisation est « nous sommes tous très occupés », ce n'est pas une
réponse. C'est le symptôme que nous décrivons. La solution est
rarement plus de capacité. C'est une structure qui permet à la
capacité existante de devenir visible.
```

### Prompt de personnalisation NotebookLM

```text
Audience : direction générale et cadres dirigeants dans les grands
groupes et l'administration publique suisses. Professionnels
multilingues, à l'aise en français.

Ton : mesuré, légèrement formel, professionnel. Pas de blague. Pas
d'ironie. Pas de cadence conversationnelle américaine. Pas de
complicité entre animateurs. Pas de « bon, en gros », pas de « voilà,
c'est juste énorme ». Pas de mots à la mode (synergie, levier comme
verbe, robuste, fluide, parcours, écosystème).

Durée : environ deux minutes.

À l'écran : conservez des visuels de diapositive minimaux. Chaque diapositive doit afficher au plus cinq mots — un titre ou une courte expression. Pas de paragraphes, phrases, définitions, notes de bas de page, légendes, corps de texte ou citations sur les diapositives. Pas de graphiques inventés, pas de fausses captures d'écran, pas de faux schémas. Préférez des mots concrets isolés aux expressions.

Angle : la thèse centrale est que les échecs stratégiques sont des
échecs de gouvernance et d'exécution, pas des échecs de vision.
Commencez par cela. Décrivez ensuite les trois symptômes (décisions
rouvertes, direction goulot d'étranglement, exécution qui diverge sans
alerte). Décrivez ensuite à quoi ressemble une intervention structurée
— droits de décision, source unique de vérité opérationnelle,
séparation des cadences stratégie / exécution.

Concluez sur le signal pratique : si la réponse honnête à « est-ce que
le travail avance » est « nous sommes tous très occupés », c'est un
symptôme, pas une réponse.

Adressez-vous à l'auditeur comme à un pair. Ne sur-expliquez pas les
termes de base. Voix française neutre, sans accent américain.
```

### Scaffold MDX

`src/content/videos/fr/why-strategy-fails.mdx`

```yaml
---
title: "Pourquoi les stratégies échouent — et que faire"
description: "La plupart des stratégies n'échouent pas parce que la vision était fausse. Elles échouent parce que la gouvernance, l'exécution et l'alignement cessent de se mettre à l'échelle au même rythme que l'organisation."
publishedAt: 2026-06-14
url: "https://www.youtube.com/watch?v=À-REMPLACER-APRÈS-UPLOAD"
duration: "2:00"
order: 1
draft: true
---
```

---

## Vidéo 2 — *Cinq situations où apparaissent les lacunes de gouvernance*

Vidéo de reconnaissance. L'auditeur doit se reconnaître dans trois ou
quatre des cinq schémas. Ancrée à la grille « Situations typiques » de
la page d'accueil.

**Description (carte sur `/fr/digital-media`) :**
« Complexité d'échelle, surcharge de la direction, exécution
fragmentée, pression de transformation, failles de gouvernance. Les
cinq schémas que nous observons le plus souvent dans les organisations
en croissance et dans les administrations publiques. »

### Source NotebookLM

```text
Executive Founders — Cinq situations où apparaissent les lacunes de
gouvernance

Cinq schémas reviennent systématiquement dans les organisations en
croissance et dans les administrations publiques sous pression
d'expansion. La plupart des comités de direction se reconnaîtront dans
au moins trois d'entre eux à un moment donné.

1. Complexité d'échelle

La croissance génère plus de friction opérationnelle que les
structures existantes peuvent absorber. L'équipe qui traitait quinze
conversations clients par semaine en traite maintenant cinquante. Le
nombre de dépendances entre fonctions a à peu près doublé. Rien n'est
formellement cassé, mais l'énergie de l'organisation est consommée par
la coordination interne, pas par le travail lui-même.

2. Surcharge de la direction

Les dirigeants deviennent les points de décision centraux pour la
coordination opérationnelle parce qu'aucun mécanisme horizontal
n'existe. Chaque semaine, le directeur général est appelé à arbitrer
entre deux responsables de département sur un arbitrage récurrent.
Pris séparément, chaque arbitrage est raisonnable. Cumulativement, la
focalisation stratégique du comité de direction est consommée par des
arbitrages opérationnels qui n'auraient jamais dû lui parvenir.

3. Exécution fragmentée

Les équipes, les priorités et les initiatives perdent leur alignement
et leur cohérence opérationnelle d'un bout à l'autre de
l'organisation. Deux fonctions travaillent sur des initiatives qui se
chevauchent sans responsable commun. Une troisième a discrètement
déprioritisé un sujet que la dernière revue stratégique plaçait dans
les trois priorités principales. Aucun endroit ne rend tout cela
visible en même temps.

4. Pression de transformation

On demande aux organisations d'évoluer opérationnellement tout en
continuant à tenir leurs engagements existants. Le programme de
transformation est financé ; la base opérationnelle ne l'est pas. Au
bout de six mois, les équipes sont fatiguées, la base a glissé, et la
transformation a livré des gains partiels qui deviennent difficiles à
défendre.

5. Failles de gouvernance

Les responsabilités, l'imputabilité et les structures de décision
deviennent floues à mesure que l'organisation grandit. Des décisions
sont prises deux fois. Des décisions sont rouvertes. Certaines
décisions appartiennent à tout le monde, ce qui revient à dire qu'elles
n'appartiennent à personne. La structure qui fonctionnait à trente
collaborateurs ne fonctionne plus à cent vingt, et personne ne l'a
repensée.

Ce que ces schémas ont en commun

Ce ne sont pas des problèmes de compétence. Les gens sont
compétents. La stratégie est raisonnable. Ce qui manque, c'est un
petit nombre de mécanismes structurels — droits de décision, rythme
opérationnel, propriété nommée des interfaces entre fonctions — qui
transforment la compétence individuelle en progrès collectif.

Pourquoi nous dressons cette liste

Si vous lisez cette liste en reconnaissant votre organisation dans
trois ou quatre des schémas, le travail n'est pas « faire plus de
choses ». Le travail consiste à installer une structure légère là où
la structure existante ne suffit plus. C'est le travail que nous
faisons.
```

### Prompt de personnalisation NotebookLM

```text
Audience : cadres dirigeants des grands groupes, PME suisses et
administrations publiques. Multilingues, à l'aise en français.

Ton : mesuré, professionnel, diagnostique. Pas de blague, pas
d'ironie, pas de complicité, pas de cadence conversationnelle
américaine. Pas de mots à la mode. Ne dites pas « parcours ». Ne
dites pas « bon, en gros ».

Durée : environ deux minutes.

À l'écran : conservez des visuels de diapositive minimaux. Chaque diapositive doit afficher au plus cinq mots — un titre ou une courte expression. Pas de paragraphes, phrases, définitions, notes de bas de page, légendes, corps de texte ou citations sur les diapositives. Pas de graphiques inventés, pas de fausses captures d'écran, pas de faux schémas. Préférez des mots concrets isolés aux expressions.

Format : parcourez les cinq schémas nommés dans la source (complexité
d'échelle, surcharge de la direction, exécution fragmentée, pression
de transformation, failles de gouvernance). Pour chaque schéma : une
courte description concrète et un symptôme observable. N'inventez pas
de schémas supplémentaires. Concluez sur le méta-point : ce sont des
problèmes structurels, pas des problèmes de compétence, et la réponse
est une structure légère, pas plus d'activité.

Énoncez chaque schéma avec une autorité calme. N'adoucissez pas par
« c'est très fréquent » ou similaire. Chaque auditeur se reconnaîtra
dans trois ou quatre des schémas ; laissez la reconnaissance opérer.

Voix française neutre, sans accent américain.
```

### Scaffold MDX

`src/content/videos/fr/five-situations.mdx`

```yaml
---
title: "Cinq situations où apparaissent les lacunes de gouvernance"
description: "Complexité d'échelle, surcharge de la direction, exécution fragmentée, pression de transformation, failles de gouvernance — les cinq schémas que nous observons le plus souvent."
publishedAt: 2026-06-28
url: "https://www.youtube.com/watch?v=À-REMPLACER-APRÈS-UPLOAD"
duration: "2:00"
order: 2
draft: true
---
```

---

## Vidéo 3 — *Guidés par le conseil, orientés vers l'exécution*

Le modèle opérationnel d'Executive Founders — ce que signifie
« intervenir au niveau de la direction, pas au niveau des tâches ».
Différenciateur face aux modèles classiques du conseil.

**Description (carte sur `/fr/digital-media`) :**
« Nous ne remplaçons pas les équipes internes et nous ne livrons pas
de prestations opérationnelles isolées. Court explicatif de ce à quoi
ressemble réellement une mission au niveau de la direction. »

### Source NotebookLM

```text
Executive Founders — Guidés par le conseil, orientés vers l'exécution

Comment nous nous engageons auprès des organisations

Deux modèles dominent l'industrie du conseil. Le premier livre un
rapport et s'en va. Le second prend la main sur une fonction et la
fait tourner. Nous ne faisons ni l'un ni l'autre.

Nous intervenons aux côtés des comités de direction comme partenaire
de conseil stratégique et opérationnel. Nous ne remplaçons pas les
équipes internes. Nous ne produisons pas des présentations pour
elles-mêmes. Nous ne reprenons pas une responsabilité opérationnelle
qui doit rester à l'intérieur de l'organisation. Notre rôle est de
donner une direction, d'installer une structure opérationnelle,
d'orchestrer l'exécution entre fonctions et de coordonner l'expertise
spécialisée quand une compétence particulière est requise.

Ce que signifie « au niveau de la direction, pas au niveau des
tâches »

La plupart des missions de conseil décrivent leur valeur au niveau
des tâches. Nous avons livré N ateliers. Nous avons produit M
livrables. Nous avons mobilisé Q analystes. Ce langage ne dit rien
sur la capacité de l'organisation à décider et à exécuter mieux.

Nous décrivons la valeur au niveau de la direction. Le comité de
pilotage arrive à une décision en une réunion plutôt qu'en trois. Le
directeur général sait, le lundi matin, ce que l'entreprise va
facturer ce mois-ci. Le programme de transformation tient ses
engagements sans dévorer la base opérationnelle. Ce sont les
déplacements que nous cherchons à produire.

À quoi ressemble une mission

Les six à huit premières semaines sont consacrées à une évaluation et
à une proposition structurée. Nous n'arrivons pas avec une
méthodologie pré-construite. Nous cartographions la mécanique
opérationnelle réelle — comment les décisions circulent, où
l'information se rompt, sur quoi le comité de direction passe
réellement son temps — et nous construisons une proposition qui adresse
ces frictions spécifiques.

Le cœur de la mission est de moyen à long terme. Les structures que
nous installons — droits de décision, rythme opérationnel, gouvernance
de programme, propriété nommée — doivent être vécues pendant au moins
un trimestre pour s'installer. Nous sommes présents pendant cette
période comme couche de pilotage, pas comme auditeurs externes qui
passent une fois tous les quinze jours.

La transition est délibérée. Nous travaillons à nous retirer. Le test
de succès est la capacité de l'organisation à maintenir le nouveau
modèle opérationnel après notre départ, et non sa dépendance à notre
présence.

Avec qui nous travaillons

Nous collaborons avec des experts spécialisés et des partenaires
opérationnels quand une compétence particulière est requise — conduite
du changement à grande échelle, gouvernance de l'IA, transformation
technologique — à l'intérieur d'un cadre de gouvernance structuré que
nous tenons. Le client reçoit la bonne expertise. Personne n'est
sommé d'être un généraliste qu'il n'est pas.

Le test honnête

Si, à la fin du premier trimestre, la mission n'a pas rendu le travail
du comité de direction structurellement plus facile, la mission ne
fonctionne pas. C'est l'exigence que nous nous fixons.
```

### Prompt de personnalisation NotebookLM

```text
Audience : dirigeants évaluant des cabinets de conseil. Direction
générale et cadres supérieurs des grandes entreprises et de
l'administration publique suisses. Multilingues, à l'aise en français.

Ton : mesuré, légèrement formel. Sûr de soi sans s'auto-promouvoir.
Pas de blague, pas de complicité entre animateurs, pas de tics
conversationnels américains. Ne dites pas « nous sommes passionnés
par ». N'utilisez pas « partenaire » comme verbe.

Durée : environ deux minutes.

À l'écran : conservez des visuels de diapositive minimaux. Chaque diapositive doit afficher au plus cinq mots — un titre ou une courte expression. Pas de paragraphes, phrases, définitions, notes de bas de page, légendes, corps de texte ou citations sur les diapositives. Pas de graphiques inventés, pas de fausses captures d'écran, pas de faux schémas. Préférez des mots concrets isolés aux expressions.

Angle : expliquez ce que signifie opérationnellement « guidés par le
conseil, orientés vers l'exécution », en le contrastant avec les deux
modèles qui dominent le conseil — livrer-un-rapport-et-partir et
prendre-la-main-sur-une-fonction. Décrivez ensuite à quoi ressemble
une mission en trois phases : évaluation et proposition structurée,
présence de moyen à long terme au niveau du pilotage, transition
délibérée.

Concluez sur le test honnête : si la mission n'a pas rendu le travail
du comité de direction structurellement plus facile à la fin du
premier trimestre, la mission ne fonctionne pas.

Adressez-vous à l'auditeur comme à l'acheteur de prestations de
conseil. Ne le condescendez pas.

Voix française neutre, sans accent américain.
```

### Scaffold MDX

`src/content/videos/fr/advisory-led-execution-oriented.mdx`

```yaml
---
title: "Guidés par le conseil, orientés vers l'exécution"
description: "Nous ne remplaçons pas les équipes internes et nous ne livrons pas de prestations opérationnelles isolées. À quoi ressemble réellement une mission au niveau de la direction."
publishedAt: 2026-07-12
url: "https://www.youtube.com/watch?v=À-REMPLACER-APRÈS-UPLOAD"
duration: "2:00"
order: 3
draft: true
---
```

---

## Vidéo 4 — *La gouvernance de l'IA est un défi d'organisation*

Sujet différenciateur. L'IA n'est pas d'abord une question de
technologie, c'est une question de conception organisationnelle.

**Description (carte sur `/fr/digital-media`) :**
« La plupart des organisations adoptent l'IA sans cadre de
gouvernance — et le paient en IA fantôme, adoption fragmentée et
risque de conformité. L'IA est d'abord un problème de conception
organisationnelle. »

### Source NotebookLM

```text
Executive Founders — La gouvernance de l'IA comme défi d'organisation

La prémisse

L'adoption de l'IA est traitée, dans la plupart des organisations que
nous voyons, comme une décision technologique. Quel modèle. Quel
fournisseur. Quel cas d'usage piloter en premier. Ce sont de vraies
questions. Ce sont les mauvaises pour commencer.

Les organisations qui passent à l'échelle l'IA de manière durable la
traitent d'abord comme un problème de conception organisationnelle,
puis comme un problème technologique. Qui est imputable de quelles
décisions. Quels contrôles s'appliquent à quelles données. Comment
distingue-t-on une expérimentation d'un système en production. Qui
revoit quels résultats. Comment retire-t-on un déploiement qui ne
fonctionne pas.

Les trois modes d'échec que nous observons

L'IA fantôme. Des collaborateurs adoptent individuellement des outils
d'IA grand public et y font passer discrètement des données sensibles.
Personne n'a approuvé, personne n'a interdit ; le comité de direction
l'apprend des mois plus tard, par hasard. Le coût n'est pas
l'exposition immédiate. C'est que l'organisation a perdu la
visibilité requise pour gouverner.

L'adoption fragmentée. Cinq départements lancent cinq pilotes sans
contrôles partagés, sans cadre d'évaluation commun et sans définition
partagée de « prêt pour la production ». L'organisation accumule une
dette technique déguisée en innovation, et le prochain comité de
direction hérite d'un parc qu'il ne peut pas inventorier.

Le théâtre de la conformité. Un lourd document de politique est
approuvé. Il n'est pas opérationnalisé. Il ne change rien aux
comportements du quotidien. Quand le régulateur demande, le document
existe. Quand quelque chose tourne mal, le document ne protège
personne.

À quoi ressemble une intervention de gouvernance de l'IA

Nous commençons généralement par une évaluation discrète de l'endroit
où l'IA est déjà utilisée : par qui, sur quelles données, avec quelle
autorisation. C'est presque toujours plus révélateur que ce que la
direction anticipe. Nous concevons ensuite trois choses.

Un modèle de gouvernance. La propriété des décisions liées à l'IA. Un
petit nombre de rôles nommés — responsable de modèle, responsable des
données, responsable métier — et l'autorité que chacun détient. Une
instance permanente qui passe en revue les déploiements à une cadence
adaptée à la vitesse des cas d'usage, pas au calendrier.

Un cadre d'adoption. Un chemin commun que parcourent les pilotes et
les systèmes de production. Critères d'évaluation documentés,
contrôles de données définis, déclencheurs de retrait. Pas un
document de politique. Un workflow que les gens utilisent.

Un registre des risques qui est vivant. Les risques que l'IA introduit
sont d'une nature différente des risques informatiques traditionnels —
dynamiques, dépendants du contexte, et souvent invisibles tant qu'ils
ne se matérialisent pas. Le registre doit être revu dans la même
instance que celle qui approuve les déploiements, pas rangé dans un
silo de conformité séparé.

Pourquoi cela importe maintenant

Les organisations qui construisent la gouvernance d'abord ne sont pas
celles qui avancent lentement. Ce sont celles qui peuvent avancer vite
en sécurité. Le coût de rétro-installer la gouvernance sur un parc
d'IA fragmenté est structurellement plus élevé que le coût de la
concevoir délibérément dès le départ.

La vraie question n'est pas comment les organisations utilisent l'IA.
La vraie question est comment elles l'implémentent, la gouvernent et
la mettent à l'échelle de manière responsable et durable.
```

### Prompt de personnalisation NotebookLM

```text
Audience : direction générale, directeurs des opérations, directeurs
des risques, responsables data et technologie dans les grands groupes
et administrations publiques suisses. Beaucoup seront prudents face à
l'emballement IA. Traitez-les en interlocuteurs informés.

Ton : sérieux, mesuré, diagnostique. Pas d'emballement. Aucun
enthousiasme pour l'IA comme catégorie. Pas de « c'est juste
incroyable ». Pas de blague. N'anthropomorphisez pas la technologie.
La vidéo porte sur la manière de gouverner l'IA, pas sur la
fascination qu'elle suscite.

Durée : environ deux minutes.

À l'écran : conservez des visuels de diapositive minimaux. Chaque diapositive doit afficher au plus cinq mots — un titre ou une courte expression. Pas de paragraphes, phrases, définitions, notes de bas de page, légendes, corps de texte ou citations sur les diapositives. Pas de graphiques inventés, pas de fausses captures d'écran, pas de faux schémas. Préférez des mots concrets isolés aux expressions.

Structure : ouvrez en recadrant l'adoption de l'IA, d'une question
technologique vers une question de conception organisationnelle.
Parcourez les trois modes d'échec nommés dans la source (IA fantôme,
adoption fragmentée, théâtre de la conformité). Décrivez ensuite les
trois composantes d'une intervention de gouvernance (modèle de
gouvernance, cadre d'adoption, registre des risques vivant).
Concluez sur la formule : la vraie question n'est pas comment les
organisations utilisent l'IA ; c'est comment elles la gouvernent et
la mettent à l'échelle.

Ne dites pas « l'IA transforme tout ». Ne listez pas d'industries. Ne
prédisez pas l'avenir.

Voix française neutre, sans accent américain.
```

### Scaffold MDX

`src/content/videos/fr/ai-governance-organisational.mdx`

```yaml
---
title: "La gouvernance de l'IA est un défi d'organisation"
description: "La plupart des organisations adoptent l'IA sans cadre de gouvernance — et le paient en IA fantôme, adoption fragmentée et risque de conformité. L'IA est d'abord un problème de conception organisationnelle."
publishedAt: 2026-07-26
url: "https://www.youtube.com/watch?v=À-REMPLACER-APRÈS-UPLOAD"
duration: "2:00"
order: 4
draft: true
---
```

---

## Notes spécifiques au français

- **Voix française.** NotebookLM dispose de voix françaises mais leur
  qualité varie. Si la voix par défaut sonne trop synthétique, essayez
  l'autre voix proposée dans le panneau de personnalisation.
- **« Au niveau de la direction, pas au niveau des tâches. »** Cette
  formulation est volontairement plus formelle en français que son
  équivalent anglais. Conservez-la dans toutes les vidéos pour la
  cohérence du discours.
- **« Bâle » et « Genève »** apparaissent dans les versions textuelles
  des vidéos uniquement si elles racontent une histoire client. Dans
  les vidéos prévues ici, aucune ville n'est citée — c'est volontaire :
  les concepts présentés s'appliquent à toutes les régions.
- **Synchronisation EN / FR.** Publier d'abord la version anglaise et
  observer comment elle est reçue. La version française suit avec un
  décalage d'une ou deux semaines, ce qui laisse le temps de corriger
  un éventuel angle si la version anglaise révèle un problème.

## Workflow post-génération

Identique à la version anglaise (voir `notebooklm-videos.md`,
section "After upload") :

1. Décommenter l'URL YouTube dans le scaffold MDX ci-dessus.
2. Déposer une vignette WebP (~80 Ko) à côté du MDX :
   `<slug>.webp` puis `thumbnail: ./<slug>.webp` dans le frontmatter.
3. Passer `draft: false`.
4. Déployer.
