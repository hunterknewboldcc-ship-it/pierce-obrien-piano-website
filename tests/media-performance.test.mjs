import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const PROJECT_ROOT = process.cwd();
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const SITE_ORIGIN = 'https://www.pierceobrienpiano.com';
const EXPECTED_VIDEO_PATHS = ['/media/piano-venue-clip.mp4', '/media/pierce-at-grand.mp4'];
const EXPECTED_VIDEO_FILES = EXPECTED_VIDEO_PATHS.map((pathname) => pathname.slice(1));
const FORBIDDEN_SOURCE_FORMAT = /\.(?:heic|heif|jpe?g|mov)(?:[?#"'\s<>()]|$)/i;
const TEXT_OUTPUT_EXTENSIONS = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.map',
  '.mjs',
  '.txt',
  '.xml',
]);

function requireBuiltSite() {
  assert.ok(fs.existsSync(DIST_DIR), `Missing ${DIST_DIR}. Run npm run build before npm run test.`);
}

function walkFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkFiles(entryPath);
    return entry.isFile() ? [entryPath] : [];
  });
}

function allBuiltFiles() {
  requireBuiltSite();
  return walkFiles(DIST_DIR);
}

function relativeToDist(filePath) {
  return path.relative(DIST_DIR, filePath).split(path.sep).join('/');
}

function allBuiltHtml() {
  return allBuiltFiles()
    .filter((filePath) => filePath.endsWith('.html'))
    .map((filePath) => ({ filePath, html: fs.readFileSync(filePath, 'utf8') }));
}

function tags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
}

function attribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match ? (match[1] ?? match[2] ?? match[3] ?? '') : undefined;
}

function hasAttribute(tag, name) {
  return new RegExp(`(?:^|\\s)${name}(?:\\s|=|/?>)`, 'i').test(tag);
}

function pathFromUrl(value) {
  return new URL(value, SITE_ORIGIN).pathname;
}

function srcsetCandidates(srcset) {
  return srcset
    .split(',')
    .map((candidate) => candidate.trim().split(/\s+/, 1)[0])
    .filter(Boolean);
}

function deferredVideoBlocks(html) {
  return [
    ...html.matchAll(
      /<figure\b(?=[^>]*\bdata-deferred-video(?:\s|=|>))[^>]*>([\s\S]*?)<\/figure>/gi,
    ),
  ].map((match) => match[0]);
}

function launchReady() {
  return process.env.PUBLIC_LAUNCH_READY === 'true';
}

function deferredVideoSourcePaths() {
  return allBuiltHtml().flatMap(({ html }) =>
    tags(html, 'source')
      .filter((source) => attribute(source, 'type')?.toLowerCase() === 'video/mp4')
      .map((source) => attribute(source, 'data-src'))
      .filter(Boolean)
      .map(pathFromUrl),
  );
}

test('every rendered still image URL and srcset candidate is WebP', () => {
  const failures = [];
  let inspectedImageUrls = 0;

  for (const page of allBuiltHtml()) {
    for (const image of tags(page.html, 'img')) {
      const src = attribute(image, 'src');
      if (!src) {
        failures.push(`${page.filePath}: image is missing src.`);
        continue;
      }

      inspectedImageUrls += 1;
      if (!pathFromUrl(src).toLowerCase().endsWith('.webp')) {
        failures.push(`${page.filePath}: image src is not WebP (${src}).`);
      }

      const srcset = attribute(image, 'srcset');
      for (const candidate of srcset ? srcsetCandidates(srcset) : []) {
        inspectedImageUrls += 1;
        if (!pathFromUrl(candidate).toLowerCase().endsWith('.webp')) {
          failures.push(`${page.filePath}: image srcset is not WebP (${candidate}).`);
        }
      }
    }

    for (const source of tags(page.html, 'source')) {
      const srcset = attribute(source, 'srcset');
      for (const candidate of srcset ? srcsetCandidates(srcset) : []) {
        inspectedImageUrls += 1;
        if (!pathFromUrl(candidate).toLowerCase().endsWith('.webp')) {
          failures.push(`${page.filePath}: picture srcset is not WebP (${candidate}).`);
        }
      }
    }
  }

  assert.ok(inspectedImageUrls > 0, 'Expected at least one rendered still image URL to inspect.');
  assert.deepEqual(failures, [], failures.join('\n'));
});

test('the static build contains no HEIC, JPEG, or MOV source assets or references', () => {
  const failures = [];

  for (const filePath of allBuiltFiles()) {
    const relativePath = relativeToDist(filePath);
    if (FORBIDDEN_SOURCE_FORMAT.test(relativePath)) {
      failures.push(`${relativePath}: forbidden source asset was published.`);
    }

    if (TEXT_OUTPUT_EXTENSIONS.has(path.extname(filePath).toLowerCase())) {
      const contents = fs.readFileSync(filePath, 'utf8');
      if (FORBIDDEN_SOURCE_FORMAT.test(contents)) {
        failures.push(`${relativePath}: references a forbidden source asset.`);
      }
    }
  }

  assert.deepEqual(failures, [], failures.join('\n'));
});

test('the two approved MP4s are published, non-empty, and the only built video files', () => {
  const publishedMp4s = allBuiltFiles()
    .filter((filePath) => path.extname(filePath).toLowerCase() === '.mp4')
    .map((filePath) => relativeToDist(filePath))
    .sort();

  assert.deepEqual(publishedMp4s, [...EXPECTED_VIDEO_FILES].sort());

  for (const relativePath of publishedMp4s) {
    const stats = fs.statSync(path.join(DIST_DIR, relativePath));
    assert.ok(stats.size > 0, `${relativePath} is empty.`);
  }
});

test('every rendered video is initially hidden, uses preload="none", and has a visible play trigger', () => {
  const failures = [];
  const allVideos = allBuiltHtml().flatMap(({ html }) => tags(html, 'video'));
  const deferredVideos = [];

  for (const page of allBuiltHtml()) {
    for (const block of deferredVideoBlocks(page.html)) {
      const trigger = tags(block, 'button').find((button) =>
        hasAttribute(button, 'data-deferred-video-trigger'),
      );
      const videos = tags(block, 'video');

      if (!trigger) {
        failures.push(`${page.filePath}: deferred video is missing its play trigger.`);
      } else {
        if (hasAttribute(trigger, 'hidden')) {
          failures.push(`${page.filePath}: deferred video play trigger is initially hidden.`);
        }
        if (!/\bplay\b/i.test(attribute(trigger, 'aria-label') ?? '')) {
          failures.push(`${page.filePath}: deferred video trigger lacks a Play label.`);
        }
      }

      if (videos.length !== 1) {
        failures.push(`${page.filePath}: deferred video block must contain exactly one video.`);
      }

      for (const video of videos) {
        deferredVideos.push(video);
        if (attribute(video, 'preload')?.toLowerCase() !== 'none') {
          failures.push(`${page.filePath}: video must use preload="none".`);
        }
        if (!hasAttribute(video, 'hidden')) {
          failures.push(`${page.filePath}: video must be initially hidden.`);
        }
        if (!hasAttribute(video, 'data-deferred-video-player')) {
          failures.push(`${page.filePath}: video is not marked as a deferred player.`);
        }

        const sources = tags(block, 'source').filter(
          (source) => attribute(source, 'type')?.toLowerCase() === 'video/mp4',
        );
        if (sources.length !== 1) {
          failures.push(`${page.filePath}: deferred video must contain exactly one MP4 source.`);
        }
        for (const source of sources) {
          if (/\ssrc\s*=/i.test(source)) {
            failures.push(`${page.filePath}: deferred MP4 source must not have an initial src.`);
          }
          if (!attribute(source, 'data-src')) {
            failures.push(`${page.filePath}: deferred MP4 source is missing data-src.`);
          }
        }
      }
    }
  }

  assert.equal(
    deferredVideos.length,
    allVideos.length,
    'Every rendered video must live inside a deferred-video play-trigger block.',
  );
  assert.equal(deferredVideos.length, EXPECTED_VIDEO_PATHS.length, 'Expected two deferred videos.');
  assert.deepEqual(failures, [], failures.join('\n'));
});

test('the deduplicated IMG_1203 venue clip is rendered and published once', () => {
  const sourcePaths = deferredVideoSourcePaths();
  const sourceCounts = new Map(sourcePaths.map((sourcePath) => [sourcePath, 0]));

  for (const sourcePath of sourcePaths) {
    sourceCounts.set(sourcePath, (sourceCounts.get(sourcePath) ?? 0) + 1);
  }

  assert.deepEqual([...sourceCounts.keys()].sort(), [...EXPECTED_VIDEO_PATHS].sort());
  assert.equal(sourceCounts.get('/media/piano-venue-clip.mp4'), 1);
  assert.equal(sourceCounts.get('/media/pierce-at-grand.mp4'), 1);

  const hashes = EXPECTED_VIDEO_FILES.map((relativePath) =>
    crypto
      .createHash('sha256')
      .update(fs.readFileSync(path.join(DIST_DIR, relativePath)))
      .digest('hex'),
  );
  assert.equal(
    new Set(hashes).size,
    hashes.length,
    'Published MP4s must not duplicate the same clip.',
  );
});

test('PUBLIC_LAUNCH_READY gates every built HTML page with noindex while launch is disabled', () => {
  if (launchReady()) return;

  const failures = [];
  for (const page of allBuiltHtml()) {
    const robotsValues = tags(page.html, 'meta')
      .filter((meta) => attribute(meta, 'name')?.toLowerCase() === 'robots')
      .map((meta) => attribute(meta, 'content')?.toLowerCase() ?? '');

    if (robotsValues.length !== 1) {
      failures.push(`${page.filePath}: expected exactly one robots meta tag.`);
      continue;
    }
    if (!robotsValues[0].split(/[\s,]+/).includes('noindex')) {
      failures.push(
        `${page.filePath}: robots meta tag must include noindex while launch is disabled.`,
      );
    }
  }

  assert.deepEqual(failures, [], failures.join('\n'));
});
