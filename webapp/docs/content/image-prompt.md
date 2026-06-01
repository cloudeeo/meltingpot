# Image prompt template for news posts (ChatGPT / DALL-E / GPT-image-1)

This is the base prompt that produces images visually consistent with `hero01.webp` and `hero02.webp` on the home page: cinematic, slightly desaturated, Swiss executive setting, room for text overlay on the left.

## How to use

1. Open ChatGPT (with image generation enabled), paste the base prompt below.
2. Replace `<SUBJECT>` with the scene specific to the post's mood (see the moods table).
3. Optionally tweak `<SETTING>` if the brief calls for a different location.
4. Ask for a landscape 16:9 image.
5. Generate 2–3 variations, pick the strongest, download the highest-resolution version.
6. Resize to 1672×941 if needed, then encode to WebP at quality 82 using the project's standard:

```bash
ffmpeg -y -i source.png -c:v libwebp -quality 82 -compression_level 6 \
       src/content/posts/<post-slug>.webp
```

7. Reference it from the post frontmatter as `cover: ./<post-slug>.webp`.

## Base prompt (copy-paste into ChatGPT)

> A cinematic, photo-realistic editorial photograph, landscape 16:9 aspect ratio.
>
> **Setting.** <SETTING> A modern minimalist office or boardroom interior in Zürich or Lucerne. Floor-to-ceiling glass walls reveal a Swiss city skyline with a lake in the foreground and snow-capped Alps in the distance. Architectural details: polished concrete or pale stone floor, glass partitions, slim metal mullions, a single dark walnut accent. Clean horizontal lines.
>
> **Subject.** <SUBJECT>
>
> **Mood.** Refined, executive, contemplative. Restrained palette: cool greys, navy, soft whites, hints of warm timber. Soft natural daylight from the lake-side window with gentle interior fill. Late morning or golden hour light.
>
> **Composition.** Leave the left third of the frame as clean, uncluttered space — sky, lake, plain wall, or empty floor — to accommodate a text overlay. The subject lives in the right two-thirds.
>
> **Style.** Editorial / cinematic. Shallow-but-not-bokeh depth of field. Slightly desaturated. No high-contrast / HDR look. No motion blur. No logos, no signage, no readable text anywhere in the image. No watermarks.
>
> **Output.** Single landscape image, photo-realistic, 16:9, suitable for a corporate news cover image at 1672×941.

## Moods table — pick one per post

| Mood key | `<SETTING>` extension | `<SUBJECT>` suggestion |
|---|---|---|
| `boardroom` | A long oval boardroom table with leather executive chairs. | Five professionally dressed executives in dark business attire sitting around the table mid-discussion — one is presenting, others are listening, one is taking handwritten notes. |
| `lakeside` | An open atrium or terrace area adjacent to the office, facing the lake. | A small group of executives standing in conversation, gesturing toward the view — taken from slightly behind so faces are partially turned away. |
| `solo` | A quiet corner office with a single large desk facing the window. | A single executive (late 40s, dark suit) standing at the window holding a coffee, looking out at the city, viewed from inside the room. |
| `pair` | A two-person meeting nook with two armchairs and a small round table. | Two executives in conversation in armchairs — one leaning forward, the other listening. |
| `empty` | The same boardroom, but empty before a meeting. | No people. Empty leather chairs, a closed laptop on the table, a glass water carafe and tumblers. Light catching the table surface. |
| `crowd` | The atrium during a leadership offsite. | Around 8–12 executives in small clusters of 2–3, talking. Background figures partially out of focus. No one looking at the camera. |
| `whiteboard` | A modern glass-walled workshop room. | Two executives at a large glass writing wall, one sketching a simple diagram with a black marker, the other gesturing at it. The diagram itself should be abstract lines and boxes — no readable text. |

## Tips for getting consistent results

- **Generate in batches of 3.** First try is rarely the right one. The model drifts; pick the one that matches the existing heroes' palette and mood.
- **Reject any image with readable signage or logos.** It happens often. Regenerate.
- **Reject any image with conspicuous AI tells** — extra fingers, melting glasses frames, impossible architecture. The cover image is the first thing readers see.
- **Avoid the "American open-plan tech-bro office" look.** If the model produces beanbags, neon signs, or exposed brick, the prompt isn't constraining enough — re-emphasise "minimalist Swiss".
- **Don't ask for "diverse" or "inclusive" explicitly.** The model handles representation more naturally without that prompt — and the corporate Swiss context already implies a mixed European cohort. Asking explicitly often produces awkward staging.
- **Don't ask for specific ethnicities.** Same reason.

## Building the long-term library

For now we generate one image per post. Once we have 12+ posts, we'll have a natural library to draw from for reuse — each post's image becomes a permanent asset, and future posts on similar topics can reuse them via the `cover` frontmatter pointing to an existing file. No system needed yet.
