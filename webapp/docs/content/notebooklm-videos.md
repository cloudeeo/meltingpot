# NotebookLM video briefs

Reusable briefs for generating short Audio/Video Overviews with Google
NotebookLM, formatted for Executive Founders' Swiss professional
audience.

## A note on the on-screen-text constraint

Every Customize prompt in this doc contains a paragraph beginning
"**On screen: keep the slide visuals minimal…**". This is intentional.
NotebookLM Video Overview generates its slide visuals with an image
model that hallucinates on-screen text — paragraphs that look correct
at a glance but contain garbled words on closer inspection, which is
disqualifying for a corporate Swiss audience. The constraint caps each
slide at ~five words, which dramatically reduces (though does not
eliminate) the surface area for that failure mode. If a generation
still produces unacceptable slides, regenerate; if the second
generation also fails, switch that video to Audio Overview and let the
YouTube thumbnail carry the visual.

## Workflow per video

1. Open <https://notebooklm.google.com> → **New notebook**.
2. For each *Source* block below, click **Add source → Paste text** and
   paste the block verbatim. Most videos use one source; the more
   substantive ones use two.
3. In the **Audio Overview** or **Video Overview** panel, click
   **Customize** and paste the *Customize prompt* for that video.
4. Generate. Listen / watch end-to-end. Tone slips happen on first take —
   re-run with a stronger version of the Customize prompt if you hear
   any of: jokes, irony, "so basically…", "let me tell you why this is
   amazing", American conversational cadence, hosts agreeing with each
   other constantly.
5. When you're happy, **Export** as MP4 (Video Overview) or M4A
   (Audio Overview).
6. Upload to YouTube as **Unlisted** (or Public if you want
   discoverability) and copy the watch URL.
7. Create an MDX entry under `src/content/videos/en/<slug>.mdx` (and
   `src/content/videos/fr/<slug>.mdx` once the French version is
   produced). Use the scaffold given at the end of each brief.

## Tone calibration that applies to every video

**Avoid:**

- Jokes, irony, sarcasm, banter between the hosts.
- "So basically…", "And that's huge!", "Let me tell you why…".
- American conversational cadence ("right?", "you know?", "for sure").
- Buzzwords: synergy, leverage as a verb, best-in-class, world-class,
  robust, seamless, holistic, ecosystem, journey, north star,
  double down, take it to the next level.
- Vague verbs: "we help organisations".

**Use:**

- A measured, slightly formal Swiss professional register.
- Concrete operational verbs: *rebuilt, restructured, surfaced,
  re-anchored, untangled, collapsed, separated, re-granted*.
- Specific, plausible scenarios over abstractions ("a Series B fintech
  with 180 engineers" beats "a fast-growing tech company").
- One quantitative or unambiguously qualitative outcome per piece.

**Audience:**
C-suite, board members and senior operators in Swiss corporates, mid-cap
companies, and public administration. Multilingual but reading/listening
in English. They are time-poor and allergic to abstractions.

## Thumbnail style (shared across all videos)

Base prompt for ChatGPT / DALL-E / Midjourney (mirrors the hero
photography on the site — keep the look consistent):

> A cinematic, photo-realistic image, landscape 16:9 aspect ratio.
> Setting: a modern, minimalist boardroom or office interior in Basel,
> Switzerland, with floor-to-ceiling windows revealing a Rhine-side
> cityscape with distant Jura hills. Architectural details: polished
> concrete floor, glass partitions, clean lines, natural daylight.
> Subject: **[SCENE PER VIDEO]**.
> Mood: refined, executive, contemplative. Cool, slightly desaturated
> palette — cool greys, navy, soft white, hints of warm timber.
> Photographic style: editorial cinematic. Soft natural side light.
> Composition leaves negative space on the left third for a title
> overlay. No text or logos in the image.

Per-video subject replacements are given in each brief below.

### Thumbnail workflow — generating, encoding, wiring up

Once you have a generated image:

1. **Encode to WebP** next to the video's MDX file:
   ```bash
   cd webapp/src/content/videos/en
   ffmpeg -y -i ~/Downloads/<generated>.png \
     -c:v libwebp -quality 82 -compression_level 6 \
     <slug>.webp
   ```
   The output should be ~50–120 KB. The filename must match the MDX
   slug exactly (e.g. `why-strategy-fails.webp` next to
   `why-strategy-fails.mdx`).
2. **Reference it in the MDX frontmatter** with a relative path:
   ```yaml
   thumbnail: ./why-strategy-fails.webp
   ```
   Astro's `image()` schema validates that the file exists at build
   time — a missing file fails the build, which is what we want.
3. **For the French version,** reuse the English thumbnail rather than
   regenerating. In `src/content/videos/fr/<slug>.mdx`:
   ```yaml
   thumbnail: ../en/<slug>.webp
   ```

Notes:

- The card container is 16:10. Generated images at 16:9 are
  acceptable; `object-fit: cover` crops about 6% off the top/bottom.
  If a key element sits flush against the top or bottom edge of the
  generated image, regenerate or recompose.
- No text in the image. The card overlays its own title and duration.
- Image optimisation is currently passthrough (sharp isn't available
  in the Docker build). Whatever you encode is what gets served, so
  aim for ~1600 × 900 source → ~80 KB WebP. Don't ship a 5 MB PNG.

---

## Video 1 — *Why strategy fails — and what to do about it*

Cornerstone. The EF thesis: strategic failures are rarely failures of
vision. They are failures of governance, execution and alignment scaling
at the same speed as complexity.

**Card description (for `/digital-media`):**
"Most strategies don't fail because the vision was wrong. They fail
because governance, execution and alignment stop scaling at the same
speed as the organisation. A short explainer on what that looks like —
and where it can be fixed."

### NotebookLM source

Paste as one text source:

```text
Executive Founders — Why strategy fails, and what to do about it

The thesis

Modern organisations rarely fail because their strategy was wrong.
They fail when governance, execution and organisational alignment do
not scale at the same speed as complexity. The vision survives the
quarterly review. The operating cadence does not.

What "governance, execution and alignment failing to scale" looks like

Three symptoms are almost always present together.

First, decisions reopen. The same trade-off comes back to the steering
committee three weeks running because the framework for making it was
never granted to anyone below the executive level. Decision rights are
implicit, so escalation is the default.

Second, leadership is the bottleneck. Founders or executives become the
de-facto coordinator across functions because no horizontal mechanism
exists. Each function works competently in isolation; the seams between
them are owned by no one.

Third, execution diverges from the strategy without anyone noticing for
a quarter. There is no operating cadence that surfaces the difference
between what was committed and what is happening.

What an intervention looks like in practice

We rebuild three layers rather than rewriting the strategy.

We restructure decision rights. Who decides what, with what authority,
at what cadence — and we put it on a page that the executive team
actively uses, not a slide that gets buried.

We install a single source of operating truth. One portfolio view,
weekly, with named owners. Status, capacity, blockers, decisions
required. One page. Used in a thirty-minute meeting. Not a dashboard
nobody opens.

We separate the cadence of strategy from the cadence of execution. The
strategy refresh is quarterly and slow. The execution review is weekly
and fast. The two are connected through a small number of explicit
commitments, not through wishful alignment.

Why we work the way we do

We operate at leadership level, not at task level. We are an advisory
and operational partner — we do not replace internal teams, we do not
take over functions, and we do not produce decks for their own sake.
Our engagements are medium and long term because the structures we
build need to be lived in to settle.

A practical signal

If the answer to "is the work flowing?" in your organisation is "we are
all very busy", that is not an answer. It is the symptom we are
describing. The fix is rarely more capacity. It is structure that lets
the existing capacity become visible.
```

### NotebookLM Customize prompt

```text
Audience: C-suite and senior operators in Swiss corporates and public
administration. Multilingual professionals who read in English.

Tone: measured, slightly formal, professional. No jokes. No irony. No
American conversational cadence. No host banter. No "so basically".
No buzzwords (synergy, leverage, robust, seamless, holistic, journey,
ecosystem).

Length: about two minutes.

On screen: keep the slide visuals minimal. Each slide should display at most five words — a heading or a short phrase only. Do not place paragraphs, sentences, definitions, footnotes, captions, body text or quotations on the slides. No invented charts, no fake screenshots, no fake diagrams. Prefer single concrete words over phrases.

Angle: the central thesis is that strategic failures are governance
and execution failures, not vision failures. Lead with that. Then
describe the three symptoms (decisions reopen, leadership becomes the
bottleneck, execution diverges from strategy unnoticed). Then describe
what a structured intervention looks like — decision rights, single
source of operating truth, separating strategy cadence from execution
cadence.

Close with the practical signal: if the honest answer to "is the work
flowing" is "we are all very busy", that is a symptom, not an answer.

Speak to the listener as a peer. Do not over-explain basic terms.
```

### Thumbnail subject

Replace `[SCENE PER VIDEO]` in the base prompt with:

> A single executive in a dark suit standing at the floor-to-ceiling
> window, viewed from inside the room and slightly behind, looking out
> at a calm cityscape at dusk. Composed, thoughtful, alone.

### MDX scaffold

`src/content/videos/en/why-strategy-fails.mdx`

```yaml
---
title: "Why strategy fails — and what to do about it"
description: "Most strategies don't fail because the vision was wrong. They fail because governance, execution and alignment stop scaling at the same speed as the organisation."
publishedAt: 2026-06-14
url: "https://www.youtube.com/watch?v=REPLACE-AFTER-UPLOAD"
duration: "2:00"
order: 1
draft: true
---
```

---

## Video 2 — *Five situations where governance gaps show up*

Recognition-driven. Reads back the listener's reality so they think
"that's me". Anchored to the "Typical situations" grid on the home
page.

**Card description:**
"Scaling complexity, leadership overload, fragmented execution,
transformation pressure, governance gaps. The five patterns we see most
often in growth-stage organisations and public administrations."

### NotebookLM source

```text
Executive Founders — Five situations where governance gaps show up

There are five patterns that appear consistently in growth-stage
organisations and in public administrations under expansion pressure.
Most leadership teams will recognise at least three of them at any
given time.

1. Scaling complexity

Growth generates operational friction faster than the existing
structures can absorb it. The team that fielded fifteen client
conversations a week now fields fifty. The number of dependencies
between functions has roughly doubled. Nothing has formally broken,
but the energy of the organisation is being spent on internal
coordination, not on the work itself.

2. Leadership overload

Executives become central decision points for operational coordination
because no horizontal mechanism exists. The CEO is asked, every week,
to arbitrate between two department heads about a recurring
trade-off. Each individual call is reasonable. Cumulatively, the
strategic focus of the leadership team is consumed by operational
arbitration that should never have reached them.

3. Fragmented execution

Teams, priorities and initiatives lose alignment and operational
consistency across the organisation. Two functions are working on
overlapping initiatives with no shared owner. A third function has
quietly de-prioritised something the strategy refresh said was a
top-three priority. There is no single place where this is visible at
the same time.

4. Transformation pressure

Organisations are asked to evolve operationally while continuing to
deliver on existing commitments. The transformation programme is
funded; the operational baseline is not protected. After six months,
people are tired, the baseline has slipped, and the transformation has
delivered partial gains that are now hard to defend.

5. Governance gaps

Responsibilities, accountability and decision-making structures become
unclear as the organisation grows. Decisions are made twice. Decisions
are reopened. Some decisions are owned by everyone, which means they
are owned by no one. The structure that worked at thirty headcount
does not work at one hundred and twenty, and nobody has redesigned it.

What these patterns have in common

They are not capability problems. The people are competent. The
strategy is reasonable. What is missing is a small number of structural
mechanisms — decision rights, an operating rhythm, named ownership of
the seams between functions — that turn individual competence into
collective progress.

Why we make this list

If you are looking at this list and recognising your own organisation
in three or four of them, the work is not "do more things". The work
is to install lightweight structure where the existing structure is no
longer enough. That is the work we do.
```

### NotebookLM Customize prompt

```text
Audience: senior leaders in Swiss corporates, mid-cap companies and
public administration. Multilingual, English-comfortable.

Tone: measured, professional, diagnostic. No jokes, no irony, no
banter, no American conversational cadence. No buzzwords. Do not use
the word "journey". Do not say "so basically".

Length: about two minutes.

On screen: keep the slide visuals minimal. Each slide should display at most five words — a heading or a short phrase only. Do not place paragraphs, sentences, definitions, footnotes, captions, body text or quotations on the slides. No invented charts, no fake screenshots, no fake diagrams. Prefer single concrete words over phrases.

Format: walk through the five patterns named in the source (scaling
complexity, leadership overload, fragmented execution, transformation
pressure, governance gaps). For each pattern, one short concrete
description and one short observable symptom. Do not invent additional
patterns. Close with the meta-point: these are structural problems,
not capability problems, and the response is lightweight structure not
more activity.

Read each pattern with calm authority. Do not soften with "this is
super common" or similar. Each listener will recognise themselves in
three or four of them; let that recognition do the work.
```

### Thumbnail subject

Replace `[SCENE PER VIDEO]` with:

> An empty modern boardroom photographed from the door, late afternoon
> light slanting in. Long table, ten or twelve empty leather chairs, a
> single open laptop on the table, no people. Quiet, slightly tense,
> on the threshold of a meeting.

### MDX scaffold

`src/content/videos/en/five-situations.mdx`

```yaml
---
title: "Five situations where governance gaps show up"
description: "Scaling complexity, leadership overload, fragmented execution, transformation pressure, governance gaps — the five patterns we see most often in growth-stage organisations."
publishedAt: 2026-06-28
url: "https://www.youtube.com/watch?v=REPLACE-AFTER-UPLOAD"
duration: "2:00"
order: 2
draft: true
---
```

---

## Video 3 — *Advisory-led, execution-oriented*

The EF operating model — what it means to operate at leadership level
rather than at task level. Differentiator vs. classic consulting firms.

**Card description:**
"We don't replace internal teams and we don't deliver isolated
operational services. A short explanation of how an advisory-led,
execution-oriented engagement actually works at leadership level."

### NotebookLM source

```text
Executive Founders — Advisory-led, execution-oriented

How we engage with organisations

Two models dominate the consulting industry. The first delivers a
report and leaves. The second takes over a function and runs it. We do
neither.

We operate alongside leadership teams as a strategic and operational
advisory partner. We do not replace internal teams. We do not produce
decks for their own sake. We do not absorb operational responsibility
that should sit inside the organisation. Our role is to provide
direction, install operational structure, orchestrate execution across
functions, and coordinate specialised expertise when a specific
competency is required.

What "leadership level, not task level" means in practice

Most consulting engagements describe their value at task level. We
delivered N workshops. We produced M deliverables. We staffed Q
analysts. That language tells you nothing about whether the
organisation became more capable of making and executing decisions.

We describe value at leadership level. The steering committee now
reaches decisions in one meeting instead of three. The CEO knows, on a
Monday morning, what the company will bill that month. The
transformation programme is delivering against its committed outcomes
without consuming the operational baseline. These are the kinds of
shifts we set out to produce.

What an engagement looks like

The first six to eight weeks are an assessment and a structured
proposal. We do not arrive with a pre-built methodology. We map the
actual operating mechanics — how decisions move, where information
flows break, what the leadership team actually spends its time on —
and we build a proposal that addresses those specific frictions.

The body of the engagement is medium to long term. The structures we
install — decision rights, operating rhythm, programme governance,
named ownership — need to be lived in for at least a quarter before
they settle. We are present through that period as the steering layer,
not as outside auditors visiting once a fortnight.

The handover is deliberate. We work to remove ourselves. The success
test is whether the organisation can sustain the new operating model
after we are gone, not whether it depends on us to maintain it.

Who we work with

We collaborate with specialised experts and operational partners when
a specific competency is required — change management at scale, AI
governance, technology transformation — within a structured governance
framework that we hold. The client receives the right expertise.
Nobody is asked to be a generalist they are not.

The honest test

If the engagement has not made the leadership team's job structurally
easier by the end of the first quarter, the engagement is not working.
That is the bar we hold ourselves to.
```

### NotebookLM Customize prompt

```text
Audience: senior executives evaluating advisory firms. Swiss corporate
and public-administration backgrounds. Multilingual, English-comfortable.

Tone: measured, slightly formal. Confident without being self-promoting.
No jokes, no banter, no American conversational tics. Do not say "we
are passionate about". Do not use the word "partner" as a verb.

Length: about two minutes.

On screen: keep the slide visuals minimal. Each slide should display at most five words — a heading or a short phrase only. Do not place paragraphs, sentences, definitions, footnotes, captions, body text or quotations on the slides. No invented charts, no fake screenshots, no fake diagrams. Prefer single concrete words over phrases.

Angle: explain what "advisory-led, execution-oriented" means
operationally, by contrasting it with the two models that dominate
consulting — report-and-leave and take-over-a-function. Then describe
what an engagement looks like in three phases: assessment with a
structured proposal; medium-to-long-term presence at steering level;
deliberate handover.

Close with the honest test: if the engagement has not made the
leadership team's job structurally easier within the first quarter,
the engagement is not working.

Speak directly to the listener as the buyer of advisory services. Do
not condescend.
```

### Thumbnail subject

Replace `[SCENE PER VIDEO]` with:

> Two professionals in dark business attire in a quiet glass-walled
> meeting room, mid-conversation. One is gesturing at a printed sheet
> on the table; the other is listening attentively. Late morning,
> natural light from the side. The diagram on the printed sheet is
> visible but illegible — abstract boxes and arrows.

### MDX scaffold

`src/content/videos/en/advisory-led-execution-oriented.mdx`

```yaml
---
title: "Advisory-led, execution-oriented"
description: "We don't replace internal teams and we don't deliver isolated operational services. How an engagement at leadership level actually works."
publishedAt: 2026-07-12
url: "https://www.youtube.com/watch?v=REPLACE-AFTER-UPLOAD"
duration: "2:00"
order: 3
draft: true
---
```

---

## Video 4 — *AI governance is an organisational challenge*

Differentiator topic. AI is not a technology procurement question;
it is a governance design question.

**Card description:**
"Most organisations adopt AI without a governance framework — and pay
for it in shadow AI, fragmented adoption and compliance risk. AI is
not primarily a technology challenge. It is an organisational one."

### NotebookLM source

```text
Executive Founders — AI governance as an organisational challenge

The premise

AI adoption is treated, in most organisations we see, as a technology
decision. Which model. Which vendor. Which use case to pilot. These
are real questions. They are the wrong ones to start with.

The organisations that scale AI sustainably treat it as an
organisational design problem first and a technology problem second.
Who is accountable for which decisions. What controls apply to which
data. How do you tell the difference between an experiment and a
production system. Who reviews which outputs. How do you retire a
deployment that is not working.

The three failure modes we see

Shadow AI. Individual team members adopt consumer AI tools and quietly
process sensitive data through them. Nobody approved this; nobody
forbade it; the leadership team finds out months later, by accident.
The cost is not the immediate exposure. It is that the organisation
has lost the visibility required to govern.

Fragmented adoption. Five departments run five pilots with no shared
controls, no shared evaluation framework and no shared definition of
"ready for production". The organisation accumulates technical debt
disguised as innovation, and the next leadership team inherits an
estate they cannot inventory.

Compliance theatre. A heavy policy document is approved. It is not
operationalised. It does not change anyone's day-to-day behaviour.
When the regulator asks, the document exists. When something goes
wrong, the document does not protect anyone.

What an AI governance intervention looks like

We typically begin with a quiet assessment of where AI is already
being used, by whom, on which data, with what authorisation. This is
almost always more revealing than leadership expects. We then design
three things.

A governance model. Ownership of AI decisions. A small number of
named roles — model owner, data owner, business owner — and the
authority each holds. A standing forum that reviews AI deployments at
a cadence that matches the velocity of the use cases, not the
calendar.

An adoption framework. A common path that pilots and production
systems travel along. Documented evaluation criteria, defined data
controls, retirement triggers. Not a policy document. A workflow that
people use.

A risk register that is alive. The risks AI introduces are different
in kind from traditional IT risks — they are dynamic, context-
dependent and frequently invisible until exercised. The register
needs to be reviewed in the same forum that approves deployments, not
stored in a separate compliance silo.

Why this matters now

The organisations that build governance first are not the ones moving
slowly. They are the ones that can move fast safely. The cost of
retrofitting governance onto a fragmented AI estate is structurally
higher than the cost of designing it deliberately at the start.

The real question is not how organisations use AI. The real question
is how organisations implement, govern and scale AI responsibly and
sustainably.
```

### NotebookLM Customize prompt

```text
Audience: C-suite, COOs, CROs, heads of data and technology in Swiss
corporates and public administrations. Many will be cautious about AI
hype. Treat them as informed.

Tone: serious, measured, diagnostic. No hype. No enthusiasm about AI as
a category. No "this is super exciting". No jokes. Do not anthropomorphise
the technology. The video is about how to govern AI, not about how
amazing AI is.

Length: about two minutes.

On screen: keep the slide visuals minimal. Each slide should display at most five words — a heading or a short phrase only. Do not place paragraphs, sentences, definitions, footnotes, captions, body text or quotations on the slides. No invented charts, no fake screenshots, no fake diagrams. Prefer single concrete words over phrases.

Structure: open by reframing AI adoption from a technology question to
an organisational design question. Walk through the three failure modes
named in the source (shadow AI, fragmented adoption, compliance
theatre). Then describe the three components of a governance
intervention (governance model, adoption framework, live risk
register). Close with the punch line: the real question is not how
organisations use AI; it is how they govern and scale it.

Do not say "AI is transforming everything". Do not list industries. Do
not predict the future.
```

### Thumbnail subject

Replace `[SCENE PER VIDEO]` with:

> A large glass wall covered in handwritten flow diagrams about
> governance — boxes labelled with abstract terms like Owner, Review,
> Approval, Retire — but the text is intentionally unreadable / out of
> focus. In front of the wall, two professionals in dark attire are
> mid-conversation, one pointing at the diagram. The composition feels
> analytical and grounded, not techy or glowing.

### MDX scaffold

`src/content/videos/en/ai-governance-organisational.mdx`

```yaml
---
title: "AI governance is an organisational challenge"
description: "Most organisations adopt AI without a governance framework — and pay for it in shadow AI, fragmented adoption and compliance risk. AI is an organisational design problem first."
publishedAt: 2026-07-26
url: "https://www.youtube.com/watch?v=REPLACE-AFTER-UPLOAD"
duration: "2:00"
order: 4
draft: true
---
```

---

## After the first generation

NotebookLM Video Overview output will not be perfect on the first take.
What to listen for, in priority order:

1. **Length.** If it is significantly under two minutes, your source is
   probably too thin — add a second source with one concrete example,
   or expand the existing one. If it is significantly over, add
   *"Length: closer to two minutes than three"* to the Customize prompt.
2. **Tone slips.** If you hear a joke, a "so basically", or excessive
   agreement between hosts, re-prompt with the tone directives weighted
   harder — e.g. add *"Do not crack jokes. Do not say 'so basically'.
   Avoid the words 'amazing', 'super', 'huge'."*
3. **Buzzword leakage.** If "synergy", "leverage" as a verb, or
   "journey" appears, add them by name to the forbidden list in the
   prompt and regenerate.
4. **Wrong angle.** If the video starts with a generic preamble before
   reaching the thesis, instruct the prompt to *"Open with the
   thesis. Do not preamble."*

Two regenerations is normal. Five regenerations means the source
document is too vague — strengthen it before re-prompting.

## After upload

For each video, once it is on YouTube and you have the URL:

1. Uncomment the URL in the MDX scaffold above.
2. Drop a thumbnail image (WebP, ~80 KB) alongside the MDX file as
   `<slug>.webp` and reference it via `thumbnail: ./<slug>.webp`.
3. Flip `draft: false`.
4. Translate the title, description and (when available) auto-generated
   captions to French. Create the FR MDX under
   `src/content/videos/fr/<same-slug>.mdx`.
5. Deploy.

The `/digital-media` page is already wired to surface published videos
in `publishedAt` order. The cards link out to YouTube; you don't need
to host the MP4.
