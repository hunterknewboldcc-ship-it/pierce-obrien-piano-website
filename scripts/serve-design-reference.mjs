import { createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';

const htmlPath = fileURLToPath(new URL('../docs/visual-reference.html', import.meta.url));
const imagePath = fileURLToPath(
  new URL('../src/assets/photos/pierce-tuning-grand-hero.webp', import.meta.url),
);

const server = createServer((request, response) => {
  const requestPath = new URL(request.url ?? '/', 'http://127.0.0.1').pathname;

  if (requestPath === '/' || requestPath === '/docs/visual-reference.html') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    createReadStream(htmlPath).pipe(response);
    return;
  }

  if (requestPath === '/src/assets/photos/pierce-tuning-grand-hero.webp') {
    response.writeHead(200, { 'Content-Type': 'image/webp' });
    createReadStream(imagePath).pipe(response);
    return;
  }

  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Not found');
});

const port = Number(process.env.PORT) || 4322;

server.listen(port, '127.0.0.1', () => {
  console.log(`Design reference available at http://127.0.0.1:${port}/`);
});
