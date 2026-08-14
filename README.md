# Pierce O’Brien Piano Website

A static, accessibility-first local-service website for `https://www.pierceobrienpiano.com`.

## Source hierarchy

1. Approved owner facts and finished copywriting.
2. The August 13, 2026 owner questionnaire.
3. The brand, content-strategy, competitive-audit, and copywriter briefs in `../piano-tuner-seo-package`.
4. Competitor research for product decisions only, never business claims.

`src/content/site.ts` is the production source of truth. Pending facts remain there as structured owner decisions and are not rendered as public claims.

## Local development

```sh
npm install
npm run dev
```

## Validation

```sh
npm run validate
```

The site is ready for Git-based Cloudflare Pages deployment with `npm run build` and the `dist` output directory. Preview builds remain `noindex` by default. Set `PUBLIC_LAUNCH_READY=true` in the approved production environment only when the owner intends search engines to index the site.

Gazelle, analytics, Search Console, and Google Business Profile connections remain separate owner approvals.

## Owner media

The owner-supplied HEIC, JPEG, and MOV files are normalized by `scripts/prepare-owner-media.mjs`. See `docs/media-manifest.md` for the source-to-output map, deduplication note, privacy handling, and where each asset appears.
