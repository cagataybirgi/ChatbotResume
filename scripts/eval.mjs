// Asks the running chat API a set of recruiter questions and checks the answers for
// missing facts, invented details, hedging words, and the right link cards.
// Each run uses Groq tokens.
//
// Usage:
//   npm run eval                                            (local server, npm start)
//   npm run eval -- --url https://chatbot-resume.vercel.app (deployed site)
import { documents, linkCards, projects } from '../shared/resume.mjs';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const baseUrl = option('--url', process.env.EVAL_URL ?? 'http://127.0.0.1:4173').replace(/\/$/, '');
const delayMs = Number(option('--delay', '3000'));

const projectShortName = (project) => project.name.match(/\(([^)]+)\)/)?.[1] ?? project.name.split(' ')[0];
const linkUrl = (id) => linkCards.find((card) => card.id === id).url;
const documentPath = (id) => documents.find((document) => document.id === id).path;

const cases = [
  {
    question: 'Show all of his projects',
    mentions: projects.map(projectShortName),
    links: projects.filter((project) => project.url).map((project) => project.id),
  },
  { question: 'What roles is he looking for, and is he open to relocating?', mentions: ['part-time', '2027', 'relocat'] },
  {
    question: 'Tell me about his Bilgitürk internship',
    mentions: ['Bilgitürk', '2026'],
    forbid: [/\bcurrently (interning|working at Bilgitürk)\b/i, /\bis interning\b/i],
  },
  { question: 'What has he built with React?', links: ['vpn_reporter', 'uzmanbaba'] },
  { question: 'How can I contact him?', links: ['email'] },
  { question: 'Show all documents', attachments: documents.map((document) => document.id) },
  { question: 'What is his GPA?', links: ['email'], forbid: [/\b[0-4][.,]\d{1,2}\b/] },
  { question: 'What salary does he expect?', links: ['email'], forbid: [/\d[\d.,]*\s?(TL|₺|\$|€|USD|EUR)/i] },
  { question: 'Does he need visa sponsorship?', forbid: [/\bcitizen\b/i, /\b(does not|doesn't) need (a )?(visa|sponsorship)\b/i] },
  { question: 'How many years of professional experience does he have?', forbid: [/\b\d+\+? years of (professional|industry|production) experience\b/i] },
  { question: 'Hangi dilleri konuşuyor?', mentions: ['İngilizce', 'Almanca'] },
];

const bannedEverywhere = [/\bverified\b/i, /updated CV/i, /supplied (sources|résumé|resume)/i];

// Unicode hyphens (the model often writes "part‑time" with U+2011) count as "-".
const normalize = (value) => value.replace(/[‐-―]/g, '-').toLocaleLowerCase('tr-TR');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function ask(question) {
  for (let attempt = 0; ; attempt += 1) {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history: [] }),
    });
    const body = await response.json().catch(() => ({}));
    if (response.ok) return body.reply;

    // 429 is our own rate limit; 502 usually means Groq's per-minute token limit. Wait and retry.
    if ((response.status === 429 || response.status === 502) && attempt < 2) {
      await sleep(20_000);
      continue;
    }
    throw new Error(`HTTP ${response.status} ${body.error ?? ''}`.trim());
  }
}

function check(testCase, reply) {
  const problems = [];
  const text = [reply.title, reply.text, ...(reply.bullets ?? [])].join('\n');
  const normalized = normalize(text);
  const linkUrls = (reply.links ?? []).map((link) => link.url);
  const attachmentPaths = (reply.attachments ?? []).map((attachment) => attachment.path);

  for (const term of testCase.mentions ?? []) {
    if (!normalized.includes(normalize(term))) problems.push(`doesn't mention "${term}"`);
  }
  for (const pattern of [...(testCase.forbid ?? []), ...bannedEverywhere]) {
    const match = text.match(pattern);
    if (match) problems.push(`contains "${match[0]}"`);
  }
  for (const id of testCase.links ?? []) {
    if (!linkUrls.includes(linkUrl(id))) problems.push(`missing "${id}" card`);
  }
  for (const id of testCase.attachments ?? []) {
    if (!attachmentPaths.includes(documentPath(id))) problems.push(`missing "${id}" document card`);
  }
  return problems;
}

console.log(`Evaluating ${baseUrl}/api/chat with ${cases.length} questions\n`);
let failures = 0;

for (const [index, testCase] of cases.entries()) {
  if (index > 0) await sleep(delayMs);

  let problems;
  let title = '';
  try {
    const reply = await ask(testCase.question);
    title = reply.title;
    problems = check(testCase, reply);
  } catch (error) {
    problems = [error instanceof Error ? error.message : String(error)];
  }

  if (problems.length) failures += 1;
  console.log(`${problems.length ? '✗' : '✓'} ${testCase.question}${title ? `  →  ${title}` : ''}`);
  for (const problem of problems) console.log(`    - ${problem}`);
}

console.log(`\n${cases.length - failures}/${cases.length} passed`);
process.exitCode = failures ? 1 : 0;
