# Pierce O’Brien Piano — Legacy Redirect and Retirement Map

## Scope

This map covers the audited legacy URLs on the existing Wix site and the matching route model in the new site. It is a migration instruction, not evidence that a legacy claim, price, course, or membership offering is still current.

New-route targets are drawn from `docs/design-system.md` and the approved content architecture. They use the planned canonical host:

`https://www.pierceobrienpiano.com`

Use a **permanent server/platform redirect (301)** only when the legacy URL and new page have materially matching intent. For retired content with no truthful successor, return **410 Gone**. Do not redirect unrelated retired pages to the homepage, Book Now, or a generic service page just to preserve traffic.

## Route map

| Legacy path                                     | Legacy intent / issue                                                                             | Launch action          | New destination or response | Why this is the appropriate treatment                                                                                                                                                                                                                                    |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/about`                                        | Owner/business background                                                                         | 301 permanent redirect | `/about-pierce/`            | The new About Pierce page is the direct successor for trust, biography, and owner-led service information. Rebuild the content with approved Utah-facing facts only; do not carry forward historic Nashville contacts, generic testimonials, or unsupported credentials. |
| `/lessons`                                      | Piano lessons                                                                                     | Retire                 | `410 Gone`                  | Lessons are not an approved current service. A redirect to tuning or the homepage would give a lesson seeker the wrong answer. If lessons become active later, create a genuine `/lessons/` page and change this rule then.                                              |
| `/news`                                         | Legacy news/blog index                                                                            | 301 permanent redirect | `/piano-care-resources/`    | Both routes are content-hub intent. This redirect applies only to the legacy index. Audit individual article URLs separately: map a genuinely updated, useful article to its direct replacement; otherwise retire it.                                                    |
| `/music-portal`                                 | Member / music portal                                                                             | Retire                 | `410 Gone`                  | No matching member portal is planned. Do not send former portal visitors into a service-booking flow. If it contains paid or account-holder material, complete owner communication and data-retention steps before retirement.                                           |
| `/online-courses`                               | Online course catalog or sales                                                                    | Retire                 | `410 Gone`                  | Online courses are not an approved offering or part of the new conversion strategy. Do not redirect course-intent traffic to a local piano-tuning service page.                                                                                                          |
| `/service-page/fine-tuning-130`                 | Fine-tuning service; legacy `$130` price is embedded in the URL                                   | 301 permanent redirect | `/piano-tuning/`            | The core service intent matches the new Piano Tuning page. The redirect must remove—not preserve—the legacy price. The new page may show a price only after the owner confirms the current price and scope.                                                              |
| `/service-page/pitch-correct-and-fine-tune-200` | Pitch correction / pitch raise with fine-tune context; legacy `$200` price is embedded in the URL | 301 permanent redirect | `/pitch-raise/`             | The closest new intent is Pitch Raise. The replacement page should explain that a pitch raise and final fine tuning are condition-dependent and assessed appropriately; it must not imply the legacy `$200` price or an automatic outcome.                               |

## Implementation rules

1. Configure the rules at the live hosting/CDN or platform layer, not as client-side JavaScript redirects.
2. Apply each rule to both trailing-slash and non-trailing-slash requests, and preserve the canonical hostname. The final destination should be `https://www.pierceobrienpiano.com/<route>/` in one hop.
3. Preserve harmless tracking parameters when the platform does so by default; never let arbitrary query values create a different content route or redirect chain.
4. Return a real `410` for retired pages. Do not serve a soft-404 page with a 200 response, and do not include retired URLs in the sitemap or navigation.
5. Keep the two price-bearing service redirects in place after launch. Old listings, bookmarks, and backlinks may still use them, but the old dollar amounts must never reappear in page text, metadata, structured data, or offer copy.
6. Do not use the retired portal/course/lessons URLs in internal links, canonical tags, structured data, Google Business Profile links, ads, or email templates.
7. Inventory legacy child URLs before switching DNS. In particular, `/news/<slug>` requires a separate review rather than an automatic blanket redirect to the resource hub.

## Owner confirmations required before activating the map

- [ ] Confirm that piano lessons, the music portal, and online courses are permanently retired and no paying/member customer requires a replacement access route.
- [ ] Confirm that `$130` fine tuning and `$200` pitch-correction pricing are obsolete and should not be retained in public copy.
- [ ] Confirm the final destination slugs remain `/about-pierce/`, `/piano-tuning/`, `/pitch-raise/`, and `/piano-care-resources/`.
- [ ] Confirm the canonical host and control of both apex and `www` domain variants.
- [ ] Provide Wix/DNS/hosting access and identify the platform on which redirects will be implemented.
- [ ] Review the legacy news/article inventory and approve content-specific redirects or retirements for any additional indexed URLs.
- [ ] Confirm whether legacy portal/course data, customer accounts, or receipts require notice, export, or retention before a 410 response is activated.

## Validation checklist

Before launch, test each legacy path on the live target host and record the result:

- [ ] `/about` returns one 301 hop to `/about-pierce/`, then the final page returns 200.
- [ ] `/news` returns one 301 hop to `/piano-care-resources/`, then the final page returns 200.
- [ ] Both legacy service URLs return one 301 hop to their matching service pages, then the final page returns 200.
- [ ] `/lessons`, `/music-portal`, and `/online-courses` return 410 (not 200, not 302, not a homepage redirect).
- [ ] `http`, apex-domain, `www`, trailing-slash, and non-trailing-slash variants reach the final canonical response without a chain.
- [ ] New canonical tags, sitemap entries, navigation links, and Google Business Profile links use only the new routes.
- [ ] Monitor server/analytics 404 reports and Search Console after cutover; add a content-specific mapping only when there is a truthful equivalent destination.
