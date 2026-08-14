import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const outputDirectory = fileURLToPath(new URL('../src/assets/photos/', import.meta.url));

const assets = [
  {
    filename: 'pierce-tuning-grand-hero.webp',
    url: 'https://static.wixstatic.com/media/9db0f1_2992581bb4f04e04a6ace2f5ad0e51f2~mv2.png',
    width: 2200,
  },
  {
    filename: 'pierce-portrait.webp',
    url: 'https://static.wixstatic.com/media/9db0f1_d997822729b74d629aa78fbbe594c9ac~mv2.jpeg',
    width: 1600,
  },
  {
    filename: 'pierce-working-monochrome.webp',
    url: 'https://static.wixstatic.com/media/9db0f1_9b3c44a2329c4f6eb1b80c7bb8fb7d0d~mv2.png',
    width: 1800,
  },
  {
    filename: 'pierce-tuning-performance.webp',
    url: 'https://static.wixstatic.com/media/9db0f1_7e6ae1fcfe53476e805f5dd6b1b45087~mv2.png',
    width: 1400,
  },
  {
    filename: 'upright-action-regulation.webp',
    url: 'https://static.wixstatic.com/media/9db0f1_882d0db5514d49bd891c23e6c7f7a6e7~mv2.png',
    width: 1400,
  },
  {
    filename: 'piano-action-voicing.webp',
    url: 'https://static.wixstatic.com/media/9db0f1_471dffaf634d4a73a0ddae2e21f3a5b0~mv2.png',
    width: 1400,
  },
  {
    filename: 'polished-kawai-grand.webp',
    url: 'https://static.wixstatic.com/media/9db0f1_120172b65b024705a34b7346b1502e39~mv2.png',
    width: 1800,
  },
];

await mkdir(outputDirectory, { recursive: true });

for (const asset of assets) {
  const response = await fetch(asset.url);

  if (!response.ok) {
    throw new Error(`Unable to fetch ${asset.url}: ${response.status}`);
  }

  const source = Buffer.from(await response.arrayBuffer());
  const destination = new URL(`../src/assets/photos/${asset.filename}`, import.meta.url);

  await sharp(source)
    .rotate()
    .resize({ width: asset.width, withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(fileURLToPath(destination));
}

console.log(`Prepared ${assets.length} first-party images in ${outputDirectory}`);
