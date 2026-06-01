# Executive Founders — house style for news posts

The voice of a strategic-advisory firm that operates at leadership level. Calm, specific, slightly understated. We describe outcomes, never claim heroics.

## Tone tests (gut-check every paragraph)

- Would a former McKinsey partner read it without rolling their eyes?
- Would a Series-B CTO recognise the symptoms in the first two sentences?
- Could a competitor copy the post and have it pass for theirs? **If yes, it's too generic — rewrite.**
- Is anything in here a buzzword that doesn't survive being defined out loud? ("synergy", "drive value", "world-class")

## Length budget

- **Total body: 300–420 words.** Strict ceiling at 450.
- Title: 6–10 words. No colons unless the colon earns it.
- Subtitle (`description` in frontmatter): 20–32 words, complete sentence(s), no ellipsis.
- 4–6 short paragraphs in the body. Single-sentence paragraphs are allowed and encouraged for emphasis.
- One pull-quote (optional) between paragraphs 2 and 3.

## Five-beat structure — every post follows this

1. **Hook (1–2 sentences)** — drop the reader into a specific situation. Sector, scale, symptom. No "in today's fast-paced business environment" anywhere, ever.
2. **Tension (1–2 paragraphs)** — what was breaking. Symptoms, not diagnoses. The reader should think *I have seen this*.
3. **Intervention (1–2 paragraphs)** — what we actually did, *operationally*. Verbs, not nouns. "We rebuilt the steering cadence" beats "we provided strategic guidance".
4. **Outcome (1 short paragraph)** — measurable change OR an unambiguous qualitative shift. If the only outcome is "they were happy", do not publish.
5. **Closing insight (1 sentence)** — the broader pattern, drawn from the brief's "Key insight" field. Stands alone as the last paragraph of the body.

The **CTA box** is *not* written in the body. It is auto-rendered from the `cta` frontmatter field after the closing insight; writing it inline produces duplicates.

## Forbidden words and phrases

- "Synergy", "leverage" (as a verb), "best-in-class", "world-class", "robust", "seamless", "holistic", "ecosystem" (unless the topic genuinely is an ecosystem), "DNA" (of a company), "journey", "north star", "double down", "circle back", "actionable insights".
- "We helped them" — show, don't tell.
- "Drive" anything. ("Drove change", "drive results".)
- "Take it to the next level."
- Em-dashes everywhere — used judiciously they're a tool. The whole post should not look like a Twitter thread.

## Anonymisation rules

Engagements must be unrecognisable. The rule of thumb: **sector + size + geography, never company shape that pins it down.**

- "A mid-market industrial group in DACH" ✓
- "A Series B fintech, ~180 engineers, EMEA" ✓
- "A logistics operator headquartered in Zürich with three regional hubs" ✗ (too specific — that's three companies)
- Never name a person, an industry-specific product, or a regulator interaction.
- Composite engagements are fine and explicit composites are honest: "Across two recent engagements with..."

## What to include in every post

- A specific size signal (€20M, 80 engineers, three business units, Series B) — relatability comes from concreteness.
- One verb that describes what we *changed* (rebuilt, restructured, re-anchored, reset, surfaced, untangled). Avoid passive "was improved".
- One sentence in the outcome that's quantitative if possible (delivery predictability moved from ~50% to ~85%, board reviews cut from 4 hours to 90 minutes, decision cycle on critical issues compressed from 3 weeks to 5 days).
- A CTA hook that names the symptom — not "contact us for more info". Example: "If steering meetings have become status updates, that pattern usually has a name."

## What to leave out

- Methodology names (no "we ran a SIPOC workshop") unless the post is explicitly about methodology.
- Theory framing ("according to research from..."). We write from engagement experience, not from textbooks.
- Hedges: "in many cases", "often", "tends to". Pick a side or rephrase.
- The first person plural beyond the intervention paragraph. The post is about *the client's situation*, not about us.

## Frontmatter checklist

```yaml
---
title: "..."                                          # 6–10 words
description: "..."                                    # 20–32 words, doubles as subtitle + SEO
publishedAt: 2026-MM-DD                               # the publish day
author: "Executive Founders"                          # default; change for guest posts
cover: ./<post-slug>.webp                             # 1672×941 WebP, q≈82
tags: ["governance", "pmo"]                           # 2–4 tags from the canonical list
cta:
  hook: "If [recognisable symptom], that pattern usually has a name."
  label: "Tell us about your situation"
draft: false                                          # flip to true while iterating
---
```

Canonical tag list (use these exact strings, sorted alphabetically when adding):
`ai-governance`, `change-management`, `communication`, `decision-rights`, `governance`, `m&a`, `operating-model`, `pmo`, `scaling`, `strategy`, `transformation`.
