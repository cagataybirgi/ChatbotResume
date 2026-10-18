// Vercel serverless function for POST /api/chat. Vercel only deploys the static Vite
// build plus files in api/, so the chat endpoint has to live here in production.
// Set GROQ_API_KEY in the Vercel project's environment variables.
import { createChatHandler } from '../server/chat-handler.mjs';

const { handleChat } = createChatHandler({ apiKey: process.env.GROQ_API_KEY?.trim() });

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const forwardedFor = request.headers['x-forwarded-for'];
  const ip = String(Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor ?? '')
    .split(',')[0]
    .trim();

  const { status, body } = await handleChat({ body: request.body, ip: ip || 'unknown' });
  return response.status(status).json(body);
}
