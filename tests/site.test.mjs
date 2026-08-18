import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const PROJECT_ROOT = process.cwd();
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const SITE_ORIGIN = 'https://www.pierceobrienpiano.com';
const CANONICAL_HOST = 'www.pierceobrienpiano.com';
const GAZELLE_BOOKING_URL = 'https://gazelleapp.io/scheduling/96knDrjXX3V40FVCG3cmzBgq';

const REQUIRED_ROUTES = [
  '/',
  '/piano-tuning/',
  '/pitch-raise/',
  '/tuning-after-moving/',
  '/piano-repairs/',
  '/regulation/',
  '/voicing/',
  '/piano-cleaning/',
  '/pre-purchase-inspection/',
  '/about-pierce/',
  '/service-area-travel/',
  '/pricing-faq/',
  '/book-contact/',
  '/piano-care-resources/',
  '/piano-care-approach/',
  '/services/',
];

function requireBuiltSite() {
  assert.ok(fs.existsSync(DIST_DIR), `Missing ${DIST_DIR}. Run npm run build before npm run test.`);
}

function outputPathForRoute(route) {
  if (route === '/') return path.join(DIST_DIR, 'index.html');

  return path.join(DIST_DIR, route.slice(1, -1), 'index.html');
}

function readBuiltPage(route) {
  const filePath = outputPathForRoute(route);
  assert.ok(fs.existsSync(filePath), `Missing built route ${route}: ${filePath}`);

  return {
    route,
    filePath,
    html: fs.readFileSync(filePath, 'utf8'),
  };
}

function requiredPages() {
  requireBuiltSite();
  return REQUIRED_ROUTES.map(readBuiltPage);
}

function walkFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkFiles(entryPath);
    return entry.isFile() ? [entryPath] : [];
  });
}

function allBuiltHtml() {
  requireBuiltSite();
  return walkFiles(DIST_DIR)
    .filter((filePath) => filePath.endsWith('.html'))
    .map((filePath) => ({ filePath, html: fs.readFileSync(filePath, 'utf8') }));
}

function tags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
}

function anchorsWithContent(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((match) => ({
    tag: `<a${match[1]}>`,
    content: match[2],
  }));
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match ? (match[1] ?? match[2] ?? match[3] ?? '') : undefined;
}

function isDecorativeImageInLabeledPlayControl(html, image) {
  const imageIndex = html.indexOf(image);
  if (imageIndex === -1) return false;

  const buttonStart = html.lastIndexOf('<button', imageIndex);
  const buttonOpeningEnd = html.indexOf('>', buttonStart);
  const buttonClosingStart = html.indexOf('</button>', imageIndex);
  if (buttonStart === -1 || buttonOpeningEnd === -1 || buttonClosingStart === -1) return false;
  if (buttonOpeningEnd > imageIndex || buttonClosingStart < imageIndex) return false;

  const button = html.slice(buttonStart, buttonOpeningEnd + 1);
  return (
    /\bdata-deferred-video-trigger(?:\s|=|>)/i.test(button) &&
    /\bplay\b/i.test(attribute(button, 'aria-label') ?? '')
  );
}

function normaliseText(value) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function oneValue(values, label, route) {
  assert.equal(values.length, 1, `${route} must have exactly one ${label}.`);
  assert.notEqual(values[0], '', `${route} has an empty ${label}.`);
  return values[0];
}

function titleForPage(html, route) {
  const values = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((match) =>
    normaliseText(match[1]),
  );
  return oneValue(values, '<title>', route);
}

function descriptionForPage(html, route) {
  const values = tags(html, 'meta')
    .filter((tag) => attribute(tag, 'name')?.toLowerCase() === 'description')
    .map((tag) => normaliseText(attribute(tag, 'content') ?? ''));
  return oneValue(values, 'meta description', route);
}

function h1ForPage(html, route) {
  const values = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) =>
    normaliseText(match[1]),
  );
  return oneValue(values, '<h1>', route);
}

function canonicalForPage(html, route) {
  const values = tags(html, 'link')
    .filter((tag) => attribute(tag, 'rel')?.split(/\s+/).includes('canonical'))
    .map((tag) => attribute(tag, 'href')?.trim() ?? '');
  return oneValue(values, 'canonical link', route);
}

function normaliseForUniqueness(value) {
  return value.replace(/\s+/g, ' ').trim().toLowerCase();
}

function pathExistsInBuild(pathname) {
  const localPath = decodeURIComponent(pathname).replace(/^\/+/, '');

  if (!localPath) return fs.existsSync(path.join(DIST_DIR, 'index.html'));

  const directPath = path.join(DIST_DIR, localPath);
  return (
    fs.existsSync(directPath) ||
    fs.existsSync(`${directPath}.html`) ||
    fs.existsSync(path.join(directPath, 'index.html'))
  );
}

function shouldSkipHref(href) {
  return !href || href.startsWith('#') || /^(?:mailto|tel|sms|javascript|data):/i.test(href);
}

function hrefContainsLegacyPriceSlug(href) {
  try {
    const decodedHref = decodeURIComponent(href);
    const pathname = new URL(decodedHref, SITE_ORIGIN).pathname;
    return /(?:^|[-_/])\$?(?:130|200)(?=$|[-_/])/i.test(pathname);
  } catch {
    return false;
  }
}

function locsFromXml(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) =>
    normaliseText(match[1]).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
  );
}

test('the static build contains all 16 required routes', () => {
  const pages = requiredPages();
  assert.equal(pages.length, 16);
});

test('the homepage presents the approved navigation, hero copy, and services preview', () => {
  const { html } = readBuiltPage('/');
  const text = normaliseText(html);

  for (const label of ['Tuning', 'About Pierce', 'Services', 'FAQ', 'Resources']) {
    assert.match(text, new RegExp(`\\b${label}\\b`), `Homepage is missing ${label} navigation.`);
  }

  assert.doesNotMatch(
    text,
    /Pricing & FAQ/,
    'Homepage should not present a combined Pricing & FAQ tab.',
  );
  assert.match(text, /A refined ear for unmatched beauty\./);
  assert.match(
    text,
    /Performance-level tuning, repair, and refinement for Salt Lake City pianos\./,
  );
  assert.doesNotMatch(text, /A clear path through the appointment\./);
  assert.doesNotMatch(text, /Piano care in motion\./);
  assert.doesNotMatch(text, /Useful answers before you book\./);

  assert.match(text, /Care for pitch, touch, tone, and condition\./);

  for (const anchor of [
    'tuning',
    'regulation',
    'voicing',
    'cleaning',
    'repairs',
    'pre-purchase-consulting',
  ]) {
    assert.match(html, new RegExp(`href="/services/#${anchor}"`));
  }
});

test('the services page provides every category, stable anchors, prices, and resource links', () => {
  const { html } = readBuiltPage('/services/');
  const text = normaliseText(html);

  for (const expected of [
    'Tuning',
    '$225 fine tuning',
    'Regulation',
    '$200 touch-up',
    'Voicing',
    'Quoted after assessment',
    'Cleaning',
    '$75 light cleaning',
    'Repairs',
    '$120 per hour',
    'Pre-purchase consulting',
    '$100 plus travel',
    'Travel is included within 20 miles',
  ]) {
    assert.ok(text.includes(expected), `Services & Pricing is missing: ${expected}`);
  }

  for (const anchor of [
    'tuning',
    'regulation',
    'voicing',
    'cleaning',
    'repairs',
    'pre-purchase-consulting',
  ]) {
    assert.match(html, new RegExp(`id="${anchor}"`));
  }

  assert.match(html, /href="\/piano-care-resources\/"/);
  assert.match(html, new RegExp(GAZELLE_BOOKING_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});

test('the legacy Regulation & Voicing URL redirects to Regulation', () => {
  const redirectPath = path.join(DIST_DIR, 'regulation-voicing', 'index.html');
  assert.ok(fs.existsSync(redirectPath), 'Missing legacy Regulation & Voicing redirect page.');

  const html = fs.readFileSync(redirectPath, 'utf8');
  assert.match(html, /http-equiv="refresh" content="0;url=\/regulation\/"/i);
  assert.match(html, /rel="canonical" href="https:\/\/www\.pierceobrienpiano\.com\/regulation\/"/i);
});

test('every required page has unique SEO metadata, one H1, and the canonical production URL', () => {
  const seen = {
    title: new Map(),
    description: new Map(),
    h1: new Map(),
    canonical: new Map(),
  };

  for (const page of requiredPages()) {
    const title = titleForPage(page.html, page.route);
    const description = descriptionForPage(page.html, page.route);
    const h1 = h1ForPage(page.html, page.route);
    const canonical = canonicalForPage(page.html, page.route);
    const canonicalUrl = new URL(canonical);
    const expectedCanonical = new URL(page.route, SITE_ORIGIN).href;

    assert.equal(
      canonicalUrl.origin,
      SITE_ORIGIN,
      `${page.route} canonical must use ${SITE_ORIGIN}.`,
    );
    assert.equal(
      canonicalUrl.hostname,
      CANONICAL_HOST,
      `${page.route} canonical must use ${CANONICAL_HOST}.`,
    );
    assert.equal(
      canonicalUrl.href,
      expectedCanonical,
      `${page.route} canonical must match its own route.`,
    );

    for (const [kind, value] of Object.entries({
      title,
      description,
      h1,
      canonical,
    })) {
      const normalised = normaliseForUniqueness(value);
      const firstRoute = seen[kind].get(normalised);
      assert.equal(
        firstRoute,
        undefined,
        `${page.route} duplicates the ${kind} used by ${firstRoute}.`,
      );
      seen[kind].set(normalised, page.route);
    }
  }
});

test('internal local links resolve to a file in the static build', () => {
  const failures = [];

  for (const page of requiredPages()) {
    for (const anchor of tags(page.html, 'a')) {
      const href = attribute(anchor, 'href')?.trim();
      if (shouldSkipHref(href)) continue;

      let target;
      try {
        target = new URL(href, new URL(page.route, SITE_ORIGIN));
      } catch {
        failures.push(`${page.route}: invalid href ${JSON.stringify(href)}`);
        continue;
      }

      if (target.origin !== SITE_ORIGIN) {
        if (target.hostname === CANONICAL_HOST || target.hostname === 'pierceobrienpiano.com') {
          failures.push(
            `${page.route}: ${href} uses a noncanonical Pierce O'Brien Piano host or protocol.`,
          );
        }
        continue;
      }

      if (!pathExistsInBuild(target.pathname)) {
        failures.push(`${page.route}: ${href} does not resolve in dist.`);
      }
    }
  }

  assert.deepEqual(failures, [], failures.join('\n'));
});

test('Book Now links use the approved Gazelle scheduler and retired media captions are absent', () => {
  const bookingLinks = [];
  const renderedHtml = allBuiltHtml()
    .map((page) => page.html)
    .join('\n');

  for (const page of allBuiltHtml()) {
    for (const anchor of anchorsWithContent(page.html)) {
      const label = normaliseText(anchor.content);
      if (/^(?:Book Now|Book With Pierce)$/.test(label)) {
        bookingLinks.push({ page: page.filePath, href: attribute(anchor.tag, 'href') });
      }
    }
  }

  assert.ok(bookingLinks.length >= 10, 'Expected Book Now links throughout the built site.');
  assert.deepEqual(
    bookingLinks.filter((link) => link.href !== GAZELLE_BOOKING_URL),
    [],
    'Every Book Now link must use the approved Gazelle scheduler.',
  );
  assert.doesNotMatch(
    renderedHtml,
    /Owner-supplied photographs and short clips place the instrument/i,
  );
  assert.doesNotMatch(
    renderedHtml,
    /At the grand piano\. The full video loads only when you choose to play it\./i,
  );
});

test('rendered HTML contains no stale legacy content or unapproved testimonial markup', () => {
  const stalePatterns = [
    ['legacy phone number', /(?:\+?1[\s().-]*)?336[\s().-]*251[\s().-]*3734/],
    ['legacy iCloud email', /\b[A-Z0-9._%+-]+@icloud\.com\b/i],
    ['unapproved testimonial copy', /\btestimonials?\b|<blockquote\b|<q\b/i],
  ];
  const failures = [];

  for (const page of allBuiltHtml()) {
    for (const [label, pattern] of stalePatterns) {
      if (pattern.test(page.html)) failures.push(`${page.filePath}: ${label}`);
    }

    for (const anchor of tags(page.html, 'a')) {
      const href = attribute(anchor, 'href')?.trim();
      if (href && hrefContainsLegacyPriceSlug(href)) {
        failures.push(`${page.filePath}: legacy $130/$200 URL slug (${href})`);
      }
    }
  }

  assert.deepEqual(failures, [], failures.join('\n'));
});

test('service pages omit the retired on-page navigation', () => {
  for (const service of [
    'piano-tuning',
    'pitch-raise',
    'tuning-after-moving',
    'piano-repairs',
    'regulation',
    'voicing',
    'piano-cleaning',
    'pre-purchase-inspection',
  ]) {
    const { html } = readBuiltPage(`/${service}/`);
    assert.doesNotMatch(html, />On this page</i, `${service} still has the on-page navigation.`);
  }
});

test('questionnaire-backed pricing, credentials, and travel details render without unfinished copy', () => {
  const renderedHtml = allBuiltHtml()
    .map((page) => page.html)
    .join('\n');
  const text = normaliseText(renderedHtml);

  for (const expected of [
    'A fine tuning is $225',
    '$75–$150 additional',
    '$120 per hour, billed in 15-minute increments',
    'Light cleaning is $75',
    'Deep cleaning is $200',
    'Travel is included within 20 miles',
    '$0.65 per mile round trip',
    'Registered Piano Technician (RPT)',
    'Piano Technicians Guild (PTG)',
    'acoustic upright, grand, player, historic, and antique pianos',
    'cash, check, bank transfer, and digital wallet',
    'A same-day cancellation is $100',
  ]) {
    assert.ok(text.includes(expected), `Missing questionnaire-backed public detail: ${expected}`);
  }

  assert.doesNotMatch(
    text,
    /\[copy pending\]/i,
    'Public pages must not expose unfinished-copy markers.',
  );
});

test('every rendered image has descriptive alt text and explicit dimensions', () => {
  const failures = [];

  for (const page of allBuiltHtml()) {
    for (const image of tags(page.html, 'img')) {
      const src = attribute(image, 'src') ?? '[missing src]';
      const alt = attribute(image, 'alt')?.trim();
      const width = Number(attribute(image, 'width'));
      const height = Number(attribute(image, 'height'));

      if (!alt && !isDecorativeImageInLabeledPlayControl(page.html, image)) {
        failures.push(`${page.filePath}: ${src} has empty or missing alt text.`);
      }
      if (!Number.isFinite(width) || width <= 0) {
        failures.push(`${page.filePath}: ${src} is missing a positive width attribute.`);
      }
      if (!Number.isFinite(height) || height <= 0) {
        failures.push(`${page.filePath}: ${src} is missing a positive height attribute.`);
      }
    }
  }

  assert.deepEqual(failures, [], failures.join('\n'));
});

test('robots.txt and a sitemap output exist and include every required canonical route', () => {
  requireBuiltSite();

  const robotsPath = path.join(DIST_DIR, 'robots.txt');
  assert.ok(fs.existsSync(robotsPath), 'Missing dist/robots.txt.');

  const sitemapCandidates = ['sitemap-index.xml', 'sitemap-0.xml', 'sitemap.xml']
    .map((fileName) => path.join(DIST_DIR, fileName))
    .filter((filePath) => fs.existsSync(filePath));
  assert.ok(
    sitemapCandidates.length > 0,
    'Missing sitemap output. Expected sitemap-index.xml, sitemap-0.xml, or sitemap.xml.',
  );

  const sitemapUrls = new Set();
  const inspectedSitemaps = new Set();
  const inspectSitemap = (filePath) => {
    if (inspectedSitemaps.has(filePath)) return;
    inspectedSitemaps.add(filePath);

    const xml = fs.readFileSync(filePath, 'utf8');
    for (const location of locsFromXml(xml)) {
      if (/\.xml$/i.test(new URL(location, SITE_ORIGIN).pathname)) {
        const nestedPath = path.join(
          DIST_DIR,
          new URL(location, SITE_ORIGIN).pathname.replace(/^\/+/, ''),
        );
        if (fs.existsSync(nestedPath)) inspectSitemap(nestedPath);
      } else {
        sitemapUrls.add(location);
      }
    }
  };

  sitemapCandidates.forEach(inspectSitemap);

  for (const route of REQUIRED_ROUTES) {
    const expectedCanonical = new URL(route, SITE_ORIGIN).href;
    assert.ok(sitemapUrls.has(expectedCanonical), `Sitemap is missing ${expectedCanonical}.`);
  }
});
