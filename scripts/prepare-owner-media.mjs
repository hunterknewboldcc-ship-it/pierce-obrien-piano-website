import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import sharp from 'sharp';

const run = promisify(execFile);
const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const photoDirectory = join(projectRoot, 'src', 'assets', 'photos');
const videoDirectory = join(projectRoot, 'public', 'media');

const options = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  options.set(process.argv[index], process.argv[index + 1]);
}

const required = (name) => {
  const value = options.get(name);
  if (!value) throw new Error(`Missing required option: ${name}`);
  return resolve(value);
};

const heifConvert = required('--heif-convert');
const ffmpeg = required('--ffmpeg');
const duplicateVenueVideo = options.get('--venue-video-duplicate')
  ? resolve(options.get('--venue-video-duplicate'))
  : null;

const decodedFrameHash = async (input) => {
  const { stdout } = await run(
    ffmpeg,
    ['-v', 'error', '-i', input, '-map', '0:v:0', '-f', 'hash', '-hash', 'sha256', '-'],
    { maxBuffer: 20 * 1024 * 1024 },
  );

  return stdout.trim();
};

const photos = [
  {
    source: required('--portrait'),
    filename: 'pierce-owner-portrait-vertical.webp',
    width: 1500,
  },
  {
    source: required('--hero'),
    filename: 'pierce-owner-portrait-landscape.webp',
    width: 2200,
  },
  {
    source: required('--monochrome'),
    filename: 'pierce-owner-tuning-monochrome.webp',
    width: 1900,
  },
  {
    source: required('--tuning-library'),
    filename: 'pierce-owner-tuning-library.webp',
    width: 2000,
    heic: true,
  },
  {
    source: required('--rpt-event'),
    filename: 'pierce-owner-rpt-event.webp',
    width: 1400,
    heic: true,
  },
  {
    source: required('--festival'),
    filename: 'pierce-owner-tuning-festival.webp',
    width: 1400,
    heic: true,
  },
];

const videos = [
  {
    source: required('--service-video'),
    filename: 'pierce-at-grand.mp4',
    poster: 'pierce-at-grand-poster.webp',
    posterTime: '00:00:10',
    ffmpegArgs: [
      '-map_metadata',
      '-1',
      '-vf',
      'scale=540:-2:flags=lanczos',
      '-c:v',
      'libx264',
      '-profile:v',
      'high',
      '-level',
      '4.0',
      '-pix_fmt',
      'yuv420p',
      '-preset',
      'slow',
      '-crf',
      '29',
      '-c:a',
      'aac',
      '-b:a',
      '64k',
      '-movflags',
      '+faststart',
    ],
  },
  {
    source: required('--venue-video'),
    filename: 'piano-venue-clip.mp4',
    poster: 'piano-venue-clip-poster.webp',
    posterTime: '00:00:12',
    ffmpegArgs: [
      '-map_metadata',
      '-1',
      '-vf',
      'scale=128:224:flags=lanczos',
      '-an',
      '-c:v',
      'libx264',
      '-profile:v',
      'main',
      '-pix_fmt',
      'yuv420p',
      '-preset',
      'slow',
      '-crf',
      '23',
      '-movflags',
      '+faststart',
    ],
  },
];

await mkdir(photoDirectory, { recursive: true });
await mkdir(videoDirectory, { recursive: true });

if (duplicateVenueVideo) {
  const venueVideo = videos.find((video) => video.filename === 'piano-venue-clip.mp4');
  const [selectedHash, duplicateHash] = await Promise.all([
    decodedFrameHash(venueVideo.source),
    decodedFrameHash(duplicateVenueVideo),
  ]);

  if (selectedHash !== duplicateHash) {
    throw new Error('The supplied venue-video files do not decode to the same video frames.');
  }

  console.log(`Verified duplicate venue clip: ${selectedHash}`);
}

const temporaryDirectory = await mkdtemp(join(tmpdir(), 'pierce-owner-media-'));

try {
  for (const photo of photos) {
    let input = photo.source;

    if (photo.heic) {
      input = join(temporaryDirectory, `${basename(photo.filename, '.webp')}.png`);
      await run(heifConvert, ['--disable-limits', '--quiet', photo.source, input], {
        maxBuffer: 10 * 1024 * 1024,
      });
    }

    const output = join(photoDirectory, photo.filename);
    await sharp(input)
      .rotate()
      .resize({ width: photo.width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6, smartSubsample: true })
      .toFile(output);
  }

  for (const video of videos) {
    const output = join(videoDirectory, video.filename);
    await run(
      ffmpeg,
      ['-y', '-hide_banner', '-loglevel', 'error', '-i', video.source, ...video.ffmpegArgs, output],
      { maxBuffer: 20 * 1024 * 1024 },
    );

    const posterPng = join(temporaryDirectory, `${basename(video.poster, '.webp')}.png`);
    await run(
      ffmpeg,
      [
        '-y',
        '-hide_banner',
        '-loglevel',
        'error',
        '-ss',
        video.posterTime,
        '-i',
        output,
        '-frames:v',
        '1',
        posterPng,
      ],
      { maxBuffer: 20 * 1024 * 1024 },
    );

    await sharp(posterPng)
      .webp({ quality: 78, effort: 6, smartSubsample: true })
      .toFile(join(photoDirectory, video.poster));
  }

  const outputs = [
    ...photos.map((photo) => join(photoDirectory, photo.filename)),
    ...videos.flatMap((video) => [
      join(videoDirectory, video.filename),
      join(photoDirectory, video.poster),
    ]),
  ];

  for (const output of outputs) {
    const metadata = await stat(output);
    console.log(`${output}\t${metadata.size}`);
  }
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
