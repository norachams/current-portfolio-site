# nora portfolio · design handoff

Oct 18, 2026 · @nora

## Overview

A multi-page personal site built on the **nora** design system: cream paper, taupe text, pastel "stickers", a lowercase first-person voice, and one or two playful interactions per page. Build from the final boards on the [homepage ideas canvas](https://claude.ai/artifact/4P7TBtwwsbLb5aFM8UJZYV): **work · top nav + hover notes**, **me**, **outside work** and **footer (shared)**. The other boards (A, B, C, landing page, slim sidebar) were exploration only. Tokens and voice rules live in the [nora design system](https://claude.ai/artifact/7RzQjdAXUMJqkptwzTLb6M).

| Page | Route | What it holds | Status |
| --- | --- | --- | --- |
| work | `/` (landing) | intro line, currently row, project cards with hover notes | designed |
| me | `/me` | photo + hello, 01–05 about blocks, experience cards | designed |
| outside work | `/outside-work` | 4 tabs: hobbies, hackathons, volunteering, photography | designed |
| writing | `/writing` | posts | not designed; add only once 2–3 pieces exist |

Suggested stack: Astro (static pages) with small React islands for the hover, tab and lightbox interactions, deployed on Vercel. Next.js works too. The old site stays live at its own subdomain (e.g. `v2.yourdomain.com`) for the footer link.

## Design tokens

Mostly cream and taupe; colour comes in small doses. Ship as CSS variables with a dark ("Night") theme that follows the system setting.

**Colour**

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `paper` | `#fbf7ef` | `#1f1b1c` | page background |
| `paper-raised` | `#fffdf8` | `#2a2527` | cards, footer polaroid, popups |
| `paper-sunk` | `#f1eadc` | `#332d2f` | tags, chips, active nav pill |
| `line` | `#e3d9c7` | `#463d3f` | hairlines, card borders |
| `ink` | `#54494b` | `#f1ebe6` | all text (taupe, never black) |
| `ink-muted` | `#74686a` | `#b0a5a6` | meta lines, dates, labels |
| `rosewood` | `#b33951` | `#e0778a` | links, active-nav underline |
| `slate` | `#666a86` | `#a3a7c6` | quiet second accent |
| `on-pastel` | `#3a3234` | `#2a2426` | text on any pastel |

Pastel stickers (full value for fills, \~40–50% alpha for highlights): mint `#91c7b1`, celadon `#b2c9ab`, gold `#e3d081`, sky `#b4cde6`, lilac `#cfc1e6`, peach `#f3c9ad`, blush `#eebcc4`. Max three pastels visible on one screen.

**Type** (Google Fonts)

| Style | Font | Size / line height | Use |
| --- | --- | --- | --- |
| hero | Fraunces 400 | 44px / 1.15 | page intro lines |
| section | Fraunces 500 italic | 22px / 1.3 | section headings ("work", "say hi") |
| title | Fraunces 400 | 24–28px / 1.2 | card and block titles |
| body | Geist 400 | 15–17px / 1.6 | prose |
| meta | Geist Mono 400 | 11–12px | `role · year`, labels, tags |
| button / label caps | Geist Mono 500 | 12–13px, 0.06em tracking | `01 / WHAT I LOVE`, tab labels |

**Spacing, radii, shadow**

- Spacing: 8, 16, 32, 64, 96px. Content max width 1080px, 16px side gutter on phones.
- Radii: 6px tags, 14px cards and media, 999px pills.
- One shadow, only on hover or drag: `0 10px 24px -12px rgba(84,73,75,0.3)`.

## Global pieces

Every page shares the same nav and footer; build each once as a component.

**Nav**

- Full content width (max 1080px), `nora` on the far left in Fraunces 24px, links on the far right: `work · me · outside work · writing` (Geist 15px, 28px gap).
- Current page = `ink` text with a 2px `rosewood` underline, 6px offset. Other links plain `ink`.
- 28px vertical padding; wraps under the name on phones.

**Footer** (pinned to the bottom of the page, 96px below the last section, hairline on top)

- Left: "say hi" in the section style, then `linkedin ↗ · github ↗ · medium ↗ · email · x ↗` in Geist Mono 13px, `rosewood`.
- **email** is a button, not a mailto: click copies the address. On hover the cursor is replaced by a pill following the mouse that says `click to copy`; after click it turns mint and says `copied!` for \~1.6s. Announce "Email copied" to screen readers.
- Right: a small tilted (-4°) polaroid thumbnail of the old site + `my old site, v2 ↗`, linking to the v2 site.

**Voice**

- Lowercase, first person, warm and specific. Lead with something real, not credentials.
- No em dashes. One emoticon per page max, no emoji.
- Only the mono label style is UPPERCASE (`01 / WHAT I LOVE`, tab names).
- External links end in ↗.

## Work page (landing)

The landing page: one intro line, a currently row, then project cards with no descriptions. Board: **work · top nav + hover notes**.

1. **Intro** (hero style, max 940px): "nora is an **engineer** who cares about the **product** and the **design** as much as **the code**."
   - Each key word gets a marker highlight: the bottom \~42% of the word filled with its pastel at \~75% alpha. engineer = mint, product = lilac, design = gold, code = sky.
   - Keep "the code." on one line (`white-space: nowrap`).
   - The canvas has a switch to compare underline, squiggle, marker and highlight; **marker** is the current pick.
2. **Currently** row, under a hairline 16px below the intro:
   - Label `currently` in meta style, then three items spread across the full width (`justify-content: space-between`), 15px.
   - `engineering @ verifast` (mint) · `building caramel` (lilac) · `finishing a DD in CS and BBA` (peach); the key words take the same marker style. verifast and caramel are links.
3. **Work** section: heading `work` in section style, then a grid of cards (min 280px columns, 36px row gap, 28px column gap).
   - Card = 230px pastel media block (looping clip or screenshot, 14px radius) + name in Fraunces 24px + `year · role` meta on the right. No description on the card.
   - Plain cards are the default; a bordered "boxed" variant exists on the canvas if wanted.
   - **Hover note:** a small pastel note follows the cursor (offset 18px) with one line about the project and `click to open →`. Click goes to the project page with the full write-up.

| Project | Meta | Hover note | Pastel |
| --- | --- | --- | --- |
| caramel | 2024 to now · founder | reads your gmail and sorts every application with a custom nlp pipeline. | mint |
| verifast market map | 2026 · engineering | one interactive map for 100k+ multifamily properties, built for the sales team. | sky |
| levanta | \[year\] · side project | a daily leetcode challenge by text. | lilac |
| \[projects 4–6\] | \[year\] · \[role\] | \[one line\] | peach, blush, celadon |

## Me page

A hello, then five numbered blocks that share one pattern: hairline on top, a mono caps label with a pastel number chip, a Fraunces title, then the content. Board: **me**. Copy stays in sentence case, word for word as written on the board.

1. **Hello:** 260×320 photo, rotated -2°, beside "hi, i'm nora." (hero style) and a 1–2 sentence intro \[to write\].
2. **01–03**, three columns (stack on phones):
   - `01 / WHAT I LOVE` (mint): Building from 0 to 1
   - `02 / HOW I THINK` (lilac): People first, always
   - `03 / WHAT EXCITES ME` (gold): Ideas worth exploring (Caramel is a link)
3. **`04 / WHERE I'VE BEEN`** (sky): "My experience". Six small cards in one row (min 150px), each with a 4px pastel top strip, company in Fraunces 22px and `role · dates` meta. No descriptions.
   - Order: VeriFast · Fidelity · AutoTrader · Ingenico · MLH Fellowship · Klick Health (first internship, last).
4. **`05 / BEYOND THE JOB TITLE`** (blush): "I like making things happen". Title on the left, three paragraphs on the right: entrepreneurship + Redbubble (gold marker on "around 600 sales in four months"), climbing / ice skating / Bilbao exchange, then a link "what I get up to outside work →" to `/outside-work`.

## Outside work page

Four tabs, each with its own visual idea so the page never repeats itself. Board: **outside work** (hit Play to try each tab).

**Tabs:** pill buttons under the "outside work" title: `01 / HOBBIES · 02 / HACKATHONS · 03 / VOLUNTEERING · 04 / PHOTOGRAPHY`. Selected tab fills with its pastel (mint, lilac, peach, sky); others have a `line` border. Use real `role="tab"` semantics.

| Tab | Layout | Interaction |
| --- | --- | --- |
| Hobbies | 4 cards in a row: one tall (300px) main photo, name, short caption below | hover a card → a loose stack of 4 tilted polaroid photos of that hobby follows the cursor |
| Hackathons | ticket cards, 2 per row: pastel stub (event name + big year) · dashed tear line with notches · project name, one line, stack, team avatars, devpost ↗ / code ↗ | hover a team circle → that person's name; ticket tilts slightly on hover |
| Volunteering | postage stamps, 3 per row: dashed cream frame, pastel centre with CAUSE / COMMUNITY / EVENT tag, org name, year in italic; role below | hover → stamp straightens and grows, a one-line note fades in (always shown on touch) |
| Photography | heading "my favourite pictures i took" + instagram ↗; 3-column masonry of photos | cursor becomes a cream pill with the city name; click opens a lightbox with prev / next / close |

**Hobbies content:** climbing ("since 2019, before it was cool"), route setting, skating, traveling ("four months on exchange in Bilbao, Spain").

**The cats** (under the hobby cards, left-aligned): label `taking care of:` and two small animated SVG cats. They gently bob, swish tails and blink on offset timings. Hover or focus shows a label: **Caramella, 10 years** and **Woody, 5 years**. Colours on the board are guesses; match the real cats.

**Hackathon 1:** the AI chef project, team of 4: a cookbook site where an AI helper watches you cook through your camera and talks you through each step; Backboard.io in the stack. **Volunteering 1:** Paper Airplanes, English tutor.

## Interactions and motion

All cursor-following elements share one pattern: track `clientX/Y` on `mousemove`, position a `fixed`, `pointer-events: none` element with `transform: translate()` only, and lerp toward the cursor in `requestAnimationFrame` (`x += (target - x) * 0.15`) for a soft lag.

| Element | Where | Behaviour | Timing |
| --- | --- | --- | --- |
| hover note | work cards | pastel note, 18px below-right of cursor | appears instantly, follows with lag |
| photo stack | hobby cards | 4 polaroids at -8°, 4°, 11°, -3° around the cursor | follows with lag |
| city pill | photo wall | replaces the cursor (`cursor: none`), centred on it | follows directly |
| copy pill | footer email | `click to copy` → `copied!` (mint) | resets after \~1.6s |
| ticket tilt | hackathons | rotate -0.6°, lift 2px | 200ms ease |
| stamp | volunteering | straighten to 0°, scale 1.03, note fades in | 200ms |
| cats | hobbies tab | bob 3.2s, tail wag 1.8s / 2.3s, blink every 5s; faster bob on hover | infinite, offset per cat |

Preload hover images (WebP, \~600px wide) so stacks never pop in late. Keep durations at 150–250ms for UI and never animate layout properties.

## Responsive and accessibility

Every hover idea needs a touch fallback, and every animation needs a reduced-motion off switch.

- **Phones:** grids collapse to one column; the currently row and nav wrap; the me blocks stack.
- **No hover (touch):** work cards open the project directly; hobby cards show their extra photos as a swipeable row on tap; stamp notes are always visible; the photo wall skips the city cursor and shows the city under each photo instead.
- **Reduced motion:** cats stand still, tickets and stamps don't tilt, cursor followers jump instead of lagging.
- **Contrast:** body text `ink` on `paper` is \~8:1; meta `ink-muted` \~5:1. Text on pastels always uses `on-pastel`. Never put text on rosewood other than `paper-raised`.
- **Focus:** 2px solid ring (`ink` light, gold dark) with 2px offset on every link, button, tab, cat and stamp.
- **Semantics:** real `<a>` / `<button>`, `role="tab"` + `aria-selected` on tabs, `role="dialog"` + `aria-modal` on the lightbox, Escape closes it, `aria-label` on icon-only and copy controls. Decorative cursor followers are `aria-hidden`.

## Open items

Everything in \[brackets\] on the boards still needs real content before launch.

- [ ] Social links: linkedin, github, medium, x, and the email address to copy
- [ ] v2 site URL and a screenshot for the footer polaroid
- [ ] Project clips or screenshots for each work card, plus projects 4–6 and Levanta's year
- [ ] Check how much of the VeriFast map can be shown publicly
- [ ] Me page: your photo and the 1–2 sentence intro
- [ ] Roles and dates for VeriFast, Fidelity, AutoTrader, Ingenico, MLH Fellowship, Klick Health
- [ ] Hobby photos (1 main + 3–4 extras each) and captions for route setting and skating
- [ ] Hackathon names, years, project names, teammates and links
- [ ] Remaining volunteering orgs, roles, years and notes
- [ ] Favourite photos with the city for each, plus the instagram link
- [ ] Real colours for Caramella and Woody
- [ ] Writing page: design once 2–3 pieces are ready
