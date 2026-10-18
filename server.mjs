import 'dotenv/config';

import express from 'express';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MODEL, createChatHandler } from './server/chat-handler.mjs';

const rootDirectory = dirname(fileURLToPath(import.meta.url));
const app = express();

function readApiKey() {
  const environmentKey = process.env.GROQ_API_KEY?.trim();
  if (environmentKey) return environmentKey;

  const localKeyPath = join(rootDirectory, 'api.txt');
  if (!existsSync(localKeyPath)) return '';

  return readFileSync(localKeyPath, 'utf8').trim();
}

const { handleChat, configured } = createChatHandler({ apiKey: readApiKey() });

app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));

app.post('/api/chat', async (request, response) => {
  const { status, body } = await handleChat({ body: request.body, ip: request.ip });
  return response.status(status).json(body);
});

const production = process.env.NODE_ENV === 'production';

if (production) {
  const distributionDirectory = join(rootDirectory, 'dist');
  app.use(express.static(distributionDirectory));
  app.use((request, response, next) => {
    if (request.method !== 'GET' || request.path.startsWith('/api/')) return next();
    return response.sendFile(join(distributionDirectory, 'index.html'));
  });
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({
    root: rootDirectory,
    appType: 'spa',
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);
}

const port = Number(process.env.PORT) || 4173;
const host = process.env.HOST || '127.0.0.1';

app.listen(port, host, () => {
  console.log(`Resume chatbot: http://${host}:${port}/`);
  console.log(configured
    ? `Groq API configured with ${MODEL}.`
    : 'Groq API key not found; the browser will use built-in answers.');
});
