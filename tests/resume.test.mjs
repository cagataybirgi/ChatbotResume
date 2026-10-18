// Offline checks for the shared résumé data, the model context, and the built-in answers.
// Run with: npm test
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { SYSTEM_PROMPT, buildResumeContext } from '../server/chat-handler.mjs';
import { cardIds, documents, linkCards, projects, resolveCards, volunteering } from '../shared/resume.mjs';
import { createReply, welcomeReply } from '../src/lib/chat.ts';

const publicDirectory = fileURLToPath(new URL('../public', import.meta.url));
const bannedWording = [/\bverified\b/i, /updated CV/i, /supplied (sources|résumé|resume)/i];

const replyText = (reply) =>
  [reply.eyebrow, reply.title, reply.text, reply.note, ...(reply.bullets ?? [])].filter(Boolean).join('\n');

test('every document file exists in public/', () => {
  for (const document of documents) {
    assert.ok(existsSync(publicDirectory + document.path), `missing file for ${document.id}: ${document.path}`);
  }
});

test('the outdated Turkish CV is gone', () => {
  const files = readdirSync(`${publicDirectory}/documents`);
  assert.deepEqual(files.filter((file) => /CV-TR/i.test(file)), []);
});

test('card IDs are unique and all resolve to a card', () => {
  assert.equal(new Set(cardIds).size, cardIds.length);
  const { links, attachments } = resolveCards(cardIds);
  assert.equal(links.length + attachments.length, cardIds.length);
  assert.deepEqual(resolveCards(['not_a_card']), { links: [], attachments: [] });
});

test('volunteering entries only reference existing documents', () => {
  for (const item of volunteering.filter((entry) => entry.document)) {
    assert.ok(documents.some((document) => document.id === item.document), item.document);
  }
});

test('the model context covers every project, card, and the availability details', () => {
  const context = buildResumeContext();
  for (const project of projects) assert.ok(context.includes(project.name), project.name);
  for (const id of cardIds) assert.ok(context.includes(`[card: ${id}]`), id);
  assert.match(context, /Part-time roles or internships/);
  assert.match(context, /relocating abroad/);
  assert.match(context, /Completed a Networking & Systems internship/);
  assert.doesNotMatch(context, /CV-TR|Turkish CV/);
});

test('the model context and built-in answers avoid hedging words', () => {
  for (const pattern of bannedWording) assert.doesNotMatch(buildResumeContext(), pattern);

  const questions = ['hi', 'projects', 'skills', 'education', 'internship', 'experience', 'volunteering', 'documents', 'languages', 'hobbies', 'contact', 'strengths', 'availability', 'gibberish'];
  for (const question of [...questions, 'tell me about peek']) {
    const text = replyText(createReply(question));
    for (const pattern of bannedWording) assert.doesNotMatch(text, pattern, `"${question}" → ${text}`);
  }
  for (const pattern of bannedWording) assert.doesNotMatch(replyText(welcomeReply), pattern);
});

test('the system prompt lists every project name', () => {
  for (const project of projects) assert.ok(SYSTEM_PROMPT.includes(project.name), project.name);
});

test('built-in answers route recruiter questions to the right cards', () => {
  const projectUrls = linkCards.filter((card) => projects.some((project) => project.id === card.id)).map((card) => card.url);

  assert.equal(createReply('What roles is he looking for?').eyebrow, 'LOOKING FOR');
  assert.equal(createReply('Is he open to relocating?').eyebrow, 'LOOKING FOR');
  assert.match(createReply('Tell me about his Bilgitürk internship').title, /Bilgitürk/);
  assert.deepEqual(createReply('Show all of his projects').links?.map((link) => link.url), projectUrls);
  assert.equal(createReply('Show all documents').attachments?.length, documents.length);
  assert.equal(createReply('Tell me about Peek').links, undefined);
  assert.ok(createReply('How can I contact him?').links?.some((link) => link.url.startsWith('mailto:')));
  assert.equal(createReply('xyzzy').eyebrow, 'TRY ANOTHER QUESTION');
});
