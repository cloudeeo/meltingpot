# Insights — post template

A minimal hand-off template for one Executive Founders Insights post.
The copywriter fills the fields below. Claude (or any assistant) then
converts it to MDX in the exact shape the platform expects — see
"How Claude turns this into MDX" at the bottom.

---

## Fields to fill in

```
TITLE:


SUBTITLE / LEDE:


LOCALE:
en/fr/de/it

PUBLICATION DATE:


TAGS:


BODY:


CTA HOOK:


IMAGE BRIEF:

```

Notes on the fields:

- **TITLE** — plain text, no surrounding quotes.
- **SUBTITLE / LEDE** — one or two complete sentences. Becomes the
  `description` in frontmatter and the post lede on the site.
- **LOCALE** — `en` or `fr`. Picks the output folder
  (`src/content/posts/<locale>/`).
- **PUBLICATION DATE** — `YYYY-MM-DD`. Leave blank to default to today.
- **TAGS** — comma-separated list, e.g. `operating-model, communication`.
  Canonical set: `ai-governance, change-management, communication,
  decision-rights, governance, m&a, operating-model, pmo, scaling,
  strategy, transformation`.
- **BODY** — Markdown. Paragraphs separated by blank lines. The body
  is dropped into the MDX file verbatim, after the frontmatter.
- **CTA HOOK** — one sentence. Rendered in the CTA box at the bottom
  of the post. Leave blank to omit the box.
- **IMAGE BRIEF** — optional, only used to describe the desired hero
  image. Not written into the MDX. If a hero image file is provided
  separately, it should be named `<slug>.webp` and placed in the same
  folder as the MDX.

---

## How Claude turns this into MDX

When the user pastes a filled template, produce **one MDX file** in
exactly this shape and nothing else. The file name is
`src/content/posts/<LOCALE>/<slug>.mdx`, where `<slug>` is a
kebab-case slugification of `TITLE` (lowercase, ASCII, alphanumerics
and hyphens only, collapse runs of hyphens, trim leading/trailing
hyphens).

```mdx
---
title: "<TITLE>"
description: "<SUBTITLE / LEDE>"
publishedAt: <PUBLICATION DATE or today's date>
author: "Executive Founders"
tags: [<each tag double-quoted, comma-separated>]
cta:
  hook: "<CTA HOOK>"
  label: "Tell us about your situation"
draft: false
cover: ./<slug>.webp
---

<BODY, verbatim>
```

Rules for the conversion:

- Always emit the YAML frontmatter exactly in the order above.
- Quote `title`, `description`, `cta.hook` with double quotes. Escape
  any inner `"` as `\"`.
- `publishedAt` is unquoted ISO date (`2026-06-08`). If the field is
  blank, use today's date.
- `tags` is a YAML array; if the field is empty, emit `tags: []`.
- Omit the `cta:` block entirely if **CTA HOOK** is blank.
- Omit the `cover:` line if no image file with the matching slug is
  provided. Otherwise reference it as `./<slug>.webp`.
- Do not add commentary, beats markers, or anything outside the
  frontmatter + body. The file goes straight into the repo.
