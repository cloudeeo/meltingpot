Here is the full Claude Code optimization report based on the Seobility SEO audit for **executivefounders.com**:

---

# SEO Optimization Report for executivefounders.com
**Source:** Seobility SEO Checker | **Date:** June 15, 2026
**Overall On-Page Score: 74%**

## Score Summary

| Category | Score | Status |
|---|---|---|
| Meta Data | 80% | Good — one issue |
| Page Quality | 75% | Good — pass |
| Others (Structure) | 65% | Needs work |
| Link Structure | 88% | Good — two issues |
| Server Configuration | 91% | Excellent |
| External Factors | 24% | Critical — needs off-page work |

---

## PRIORITY 1 — Critical Fixes (Very Important)

### 1. Shorten the Page Title (Meta Title)
**Issue:** The current title is 787 pixels wide, exceeding the 580-pixel limit. Google truncates titles beyond this threshold in search results, hurting click-through rates.

**Current title:**
```
Executive Founders — Governance · Strategic Advisory · Organisational Transformation
```

**Task for Claude Code:**
- Open the page's `<head>` template (likely `_document.tsx`, `layout.tsx`, `index.html`, or a CMS SEO field)
- Shorten the `<title>` tag to under 580px (roughly 55–60 characters)
- Suggested alternative: `Executive Founders | Governance & Strategic Advisory`
- Ensure the primary keyword appears at the start of the title

```html
<!-- BEFORE -->
<title>Executive Founders — Governance · Strategic Advisory · Organisational Transformation</title>

<!-- AFTER (example) -->
<title>Executive Founders | Governance & Strategic Advisory</title>
```

---

### 2. Add Alt Attributes to All Images
**Issue:** 5 images have no `alt` attribute. Alt text is used by search engines to understand image content and is critical for accessibility and image SEO.

**Task for Claude Code:**
- Search the codebase for `<img` tags missing `alt=""` attributes
- Add descriptive, keyword-relevant alt text to each image
- For decorative images, use `alt=""` (empty string, not omitted)

```bash
# Find all img tags missing alt attributes
grep -rn '<img' ./src --include="*.tsx" --include="*.jsx" --include="*.html" | grep -v 'alt='
```

```html
<!-- BEFORE -->
<img src="/images/hero.jpg" />

<!-- AFTER -->
<img src="/images/hero.jpg" alt="Executive Founders team meeting on governance strategy" />
```

---

## PRIORITY 2 — Important Fixes

### 3. Fix the H1 Heading (Too Short)
**Issue:** The H1 heading is only 18 characters long. Seobility recommends at least 20 characters. The H1 is one of the most important on-page SEO signals and should clearly describe the page topic with relevant keywords.

**Task for Claude Code:**
- Locate the `<h1>` tag on the homepage
- Expand it to be more descriptive (20+ characters, ideally including a primary keyword phrase)

```html
<!-- BEFORE (18 chars) -->
<h1>Executive Founders</h1>

<!-- AFTER (example) -->
<h1>Executive Founders — Governance & Leadership Advisory</h1>
```

---

### 4. Fix Internal Links — Add Anchor Text to 3 Links
**Issue:** 3 internal links have no anchor text (they are likely icon-only links, image links, or empty `<a>` tags). Search engines use anchor text to understand link context and page relevance.

**Task for Claude Code:**
- Find all internal `<a href="...">` elements that contain no text content
- Add descriptive, meaningful anchor text, or add `aria-label` attributes at minimum

```bash
# Search for anchor tags that may be empty or icon-only
grep -rn '<a href' ./src --include="*.tsx" --include="*.jsx" | grep -v 'aria-label'
```

```html
<!-- BEFORE -->
<a href="/services"><img src="icon.svg" /></a>

<!-- AFTER -->
<a href="/services" aria-label="View our services">
  <img src="icon.svg" alt="Services" />
</a>

<!-- OR with visible text -->
<a href="/services">
  <img src="icon.svg" alt="" />
  Our Services
</a>
```

---

### 5. Fix Repeated Anchor Texts on Internal Links
**Issue:** Some anchor texts are used more than once for different internal links. This confuses search engines about which page is most relevant for that anchor text.

**Task for Claude Code:**
- Audit all internal navigation links
- Where duplicate anchor texts point to different URLs, differentiate them with more specific, descriptive text
- Example: if two links both say "Learn More," rename them to "Learn More About Advisory" and "Learn More About Governance"

---

## PRIORITY 3 — Moderate Fixes

### 6. Reduce Heading Count — Improve Heading-to-Text Ratio
**Issue:** There are 41 headings on the page, which is disproportionately high relative to the amount of body text (869 words). This dilutes the semantic weight of each heading.

**Task for Claude Code:**
- Audit all `<h2>`, `<h3>`, `<h4>` tags in the homepage component
- Convert non-essential headings (decorative section labels, CTA labels) to `<p>` or `<span>` with appropriate styling
- Keep headings only for genuinely hierarchical content

```bash
# Count headings in the HTML output or source
grep -c '<h[1-6]' ./src/pages/index.tsx
```

---

### 7. Add Apple Touch Icon for Mobile Optimization
**Issue:** No Apple touch icon is specified. This is the icon displayed when a user saves the site to their iOS home screen.

**Task for Claude Code:**
- Create or confirm a `apple-touch-icon.png` (180×180px recommended) in `/public`
- Add the following to the `<head>`:

```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

---

### 8. Remove Repeated Strong/Bold Tags
**Issue:** Some `<strong>` or `<b>` tags are repeated unnecessarily (e.g., "executive founders" bolded multiple times). Search engines treat repeated emphasis as low-quality or spammy.

**Task for Claude Code:**
- Search for repeated `<strong>` or `<b>` tags with the same keyword text
- Keep emphasis on the first/most important instance only; remove or replace others with plain text

```bash
grep -rn '<strong\|<b>' ./src/pages/index.tsx
```

---

### 9. Hide the Web Server Version from HTTP Headers
**Issue:** The web server version is sent in the HTTP response header (e.g., `Server: nginx/1.18.0`). This is a minor security risk as it exposes infrastructure details.

**Task for Claude Code / DevOps:**
- If using **Nginx**, add to `nginx.conf`:
  ```nginx
  server_tokens off;
  ```
- If using **Next.js / Vercel**, add a custom header in `next.config.js`:
  ```js
  headers: async () => [{
    source: '/(.*)',
    headers: [{ key: 'Server', value: '' }]
  }]
  ```

---

## PRIORITY 4 — Nice to Have

### 10. Add Social Sharing Options
**Issue:** There are few or no social sharing buttons on the page. This limits organic social reach.

**Task for Claude Code:**
- Add Open Graph meta tags to the `<head>` for rich social previews (Facebook, LinkedIn):

```html
<meta property="og:title" content="Executive Founders | Governance & Strategic Advisory" />
<meta property="og:description" content="We help organisations, executives and leadership teams scale with clarity, structure and operational excellence." />
<meta property="og:image" content="https://executivefounders.com/og-image.jpg" />
<meta property="og:url" content="https://executivefounders.com/" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Executive Founders | Governance & Strategic Advisory" />
<meta name="twitter:description" content="We help organisations, executives and leadership teams scale with clarity, structure and operational excellence." />
<meta name="twitter:image" content="https://executivefounders.com/og-image.jpg" />
```

- Optionally add social share buttons (LinkedIn, Twitter) to blog posts or key pages

---

### 11. Add Structured Data / Schema Markup
**Issue:** No additional page markup (structured data) was found. Adding JSON-LD schema can improve search result appearance with rich snippets.

**Task for Claude Code:**
- Add `Organization` schema to the homepage `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Executive Founders",
  "url": "https://executivefounders.com",
  "description": "Governance, strategic advisory and organisational transformation for executives and leadership teams.",
  "sameAs": []
}
</script>
```

---

## PRIORITY 5 — Off-Page (Cannot Be Fixed with Code Alone)

### 12. Build Backlinks (External Factors: 24%)
**Issue:** This is the most critically underscored category. The site has only 8 backlinks from 5 different IP addresses / 8 referring domains. This severely limits domain authority.

**What this means:** No code fix can resolve this — it requires a link-building strategy.

**Recommended actions:**
- Guest post on relevant business, governance, or leadership publications
- Submit to relevant directories (e.g., consulting firm directories)
- Issue press releases for notable engagements
- Build LinkedIn presence and link back to the site
- Pursue podcast appearances and speaking engagements with bio links

---

## Summary Checklist for Claude Code

| # | Task | Priority | Effort |
|---|---|---|---|
| 1 | Shorten `<title>` to under 580px | 🔴 Critical | Low |
| 2 | Add `alt` attributes to 5 images | 🔴 Critical | Low |
| 3 | Expand `<h1>` to 20+ characters | 🟠 Important | Low |
| 4 | Add anchor text to 3 empty links | 🟠 Important | Low |
| 5 | Diversify repeated anchor texts | 🟠 Important | Low |
| 6 | Reduce excessive heading count (41) | 🟡 Moderate | Medium |
| 7 | Add Apple touch icon | 🟡 Moderate | Low |
| 8 | Remove repeated `<strong>` tags | 🟡 Moderate | Low |
| 9 | Hide web server version in headers | 🟡 Moderate | Low |
| 10 | Add Open Graph / social meta tags | 🟢 Nice to have | Low |
| 11 | Add JSON-LD structured data | 🟢 Nice to have | Low |
| 12 | Backlink building campaign | 🔴 Critical (off-page) | High |

---

**Passed checks (no action needed):** HTTPS ✅ | Canonical link ✅ | Meta description ✅ | Language tag ✅ | Hreflang ✅ | Charset UTF-8 ✅ | HTML5 Doctype ✅ | Favicon ✅ | Page response time (0.05s) ✅ | File size (29kB) ✅ | No duplicate content ✅ | Viewport meta tag ✅ | No dynamic URL parameters ✅ | No frameset ✅ | External links (5) ✅