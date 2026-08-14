# Pierce O’Brien Piano — Website Design System

Status: accepted implementation reference derived from the owner questionnaire, brand brief, content strategy, and the user’s one-shot build direction. The user explicitly prohibited AI-generated imagery, so this reference uses only code-native design and first-party photography recovered from the current `pierceobrienpiano.com` site.

## Creative direction

The site should feel like a calm listening room: dark, quiet, exact, and warm enough to welcome a first-time piano owner. The visual idea is **measured resonance**—thin rules, alternating light and dark bands, generous vertical rhythm, and close piano-action details that suggest attentive craft without ornament.

- Theme: modern craftsman / restrained editorial.
- Background character: charcoal first viewport, warm ivory content bands, near-white reading surfaces.
- Typography character: editorial serif headings paired with a compact, highly legible system sans serif.
- Hero architecture: text-led left column and an authentic working image on the right, with a soft edge mask rather than a color tint.
- Section rhythm: open numbered service rails, full-width editorial bands, photo-and-copy splits, concise FAQ disclosures, and a direct closing action.
- Signature motifs: a fine muted-gold rule, oversized page numerals, square-corner buttons, and close action-detail photography.
- Motion: subtle content reveal and navigation transitions only; disabled when reduced motion is preferred.

## Locked palette

| Token      |     Value | Use                                          |
| ---------- | --------: | -------------------------------------------- |
| Ink        | `#11110f` | Dark backgrounds and primary text            |
| Charcoal   | `#1b1a18` | Hero and dark editorial bands                |
| Warm gold  | `#b99a58` | Rules, focus, small accents, primary actions |
| Gold hover | `#d0b573` | Hover / active accent                        |
| Ivory      | `#f3efe6` | Main warm background                         |
| Paper      | `#fcfbf7` | Reading surfaces and forms                   |
| Stone      | `#68645d` | Secondary text                               |
| Hairline   | `#d8d0c1` | Rules and quiet boundaries                   |
| Error      | `#9b382e` | Validation messaging only                    |

The hero background is true charcoal; the main background is deliberately warm ivory. Photography is not color-washed. Edge masks may blend a photo into its surrounding background without tinting it.

## Typography

- Display and H1: Georgia, `Iowan Old Style`, `Times New Roman`, serif; regular weight; tight but not compressed tracking.
- H2 / H3: the same serif family for continuity.
- Body and controls: `Aptos`, `Segoe UI`, `Helvetica Neue`, Arial, sans-serif.
- Display scale: `clamp(3.1rem, 7.2vw, 7rem)` on the homepage and `clamp(2.6rem, 5.5vw, 5rem)` on interior pages.
- Body scale: `1rem–1.125rem`, 1.65 line height.
- Controls: deliberate 0.86rem uppercase labels with modest tracking; never browser-default styling.

## Container and spacing rules

- Maximum content width: 80rem; readable text width: 44rem.
- Side gutter: `clamp(1.25rem, 4vw, 4.5rem)`.
- Section spacing: `clamp(4.5rem, 9vw, 8rem)`.
- Do not place every section in a card. Use open rails, bands, and hairline dividers.
- Corners remain mostly square; media may use a restrained 2px radius.
- Shadows are reserved for the mobile navigation surface and focused form elements.

## First viewport inventory

Allowed visible copy:

- Pierce O’Brien Piano
- Services
- About Pierce
- Pricing & FAQ
- Resources
- Book Now
- Piano tuning with a sharper ear for the details.
- Performance-grade tuning, repair, and piano care. Every appointment begins with careful listening and ends with clear guidance for your piano.

Composition:

1. A simple wordmark, four essential navigation links, and one Book Now action.
2. A two-column hero. The message occupies approximately 55%; the authentic grand-piano work photo occupies 45%.
3. Book Now routes to the internal Book / Contact page until the Gazelle URL is confirmed.
4. The next section begins within the first scroll as an ivory service rail.

No hero eyebrow, credential badge, review metric, secondary CTA, phone number, text action, or location list is allowed before those facts and destinations are approved.

## Image inventory

First-party images recovered from the current owner-controlled domain:

- `work-detail-02`: primary hero; Pierce tuning a grand piano.
- `portrait-2020`: About Pierce portrait.
- `work-detail-01`: black-and-white working image for process / philosophy.
- `tuning`: tuning a grand in a performance environment.
- `regulation`: exposed upright action.
- `voicing`: close piano-action detail.
- `cleaning`: polished Kawai grand for cleaning / care context.

All images require accurate descriptive alt text. Do not imply a pictured venue or instrument is a current Utah client. Do not name a venue or owner without permission.

## Component families

- Header: desktop navigation and keyboard-safe mobile disclosure.
- Buttons: gold primary, light-outline inverse, and text-arrow link.
- Service rail: numbered open rows with title, short approved description, and arrow.
- Editorial split: text plus authentic image with stable aspect ratio.
- Fact / process steps: open three-column rail, not cards.
- FAQ: native disclosure elements with visible question and answer.
- Page intro: dark band with one H1, short answer-first introduction, and one relevant action.
- Quote-intake preview: labeled, accessible fields with no submission until the approved destination and privacy handling exist.
- Sticky mobile action: Book Now only until contact and text workflows are approved.
- Footer: brand, route groups, domain, and a concise pending-contact note only in preview mode.

## Route and content model

Required routes:

- `/`
- `/piano-tuning/`
- `/pitch-raise/`
- `/tuning-after-moving/`
- `/piano-repairs/`
- `/regulation-voicing/`
- `/piano-cleaning/`
- `/pre-purchase-inspection/`
- `/about-pierce/`
- `/service-area-travel/`
- `/pricing-faq/`
- `/book-contact/`
- `/piano-care-resources/`

Each page receives one intent, unique title and description, one H1, a canonical URL on `https://www.pierceobrienpiano.com`, descriptive internal links, and visible facts only from the approved source hierarchy.

## Factual guardrails

- Keep all contact, booking, location, credential, price, policy, review, and service-area values in one source-of-truth file.
- Values marked pending are never rendered as business claims.
- Use `[COPY PENDING]` for sections awaiting the finished copywriter file.
- Do not publish the old Nashville title, phone, iCloud email, generic testimonials, old service prices, course pages, member pages, or unsupported “perfect / unmatched” language found on the legacy Wix site.
- Do not add FAQ, rating, review, price, offer, address, hours, or broad service-area structured data until the corresponding facts are approved and visibly published.

## Core interaction under test

`Homepage → Book Now → Book / Contact page → view the approved intake checklist and the explicit Gazelle connection-pending state.`

The mobile path must retain a visible Book Now action, expose a keyboard-safe menu, and avoid horizontal overflow at 390px.
