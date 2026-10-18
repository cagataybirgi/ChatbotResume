# Çağatay Birgi — Resume Assistant

A recruiter-facing interactive résumé built with React, TypeScript, and Vite. Live at https://chatbot-resume.vercel.app/.

Answers come from GPT-OSS 120B on Groq, grounded in the CV, certificates, and public GitHub repositories. The model also picks which link and document cards to show with each answer. If the AI is unavailable, the browser falls back to built-in answers.

## Where things live

- `shared/resume.mjs` — **every résumé fact** (profile, availability, skills, experience, projects, volunteering, documents). Edit facts here only; the AI context, the sidebar, link cards, and the offline answers are all generated from it.
- `server/chat-handler.mjs` — the system prompt, response schema, and Groq call, shared by both servers below.
- `api/chat.js` — the Vercel function that serves `POST /api/chat` in production.
- `server.mjs` — the local server (Express + Vite).
- `src/lib/chat.ts` — the welcome message, suggested questions, and offline answer routing.
- `public/documents` — the CV and certificates.

## Run on Windows

Double-click `start-resume-chatbot.cmd`. It starts the local server and opens the chatbot in your default browser.

From PowerShell, use:

```powershell
.\start-resume-chatbot.cmd
```

Keep that terminal window open while using the chatbot. Press `Ctrl+C` to stop it.

The local server reads the Groq key from `GROQ_API_KEY` in `.env`, or from `api.txt`. Both are git-ignored.

## Alternative npm commands

PowerShell may block `npm.ps1`, so use the Windows command wrapper explicitly:

```powershell
npm.cmd install
npm.cmd start
```

## Deploying to Vercel

Vercel builds the Vite app and deploys `api/chat.js` as a serverless function. Set `GROQ_API_KEY` under **Project Settings → Environment Variables**, then redeploy.

## Tests

```powershell
npm.cmd test
```

Offline checks: document files exist, every card resolves, the AI context covers every project, and the built-in answers route common questions correctly.

```powershell
npm.cmd run eval
npm.cmd run eval -- --url https://chatbot-resume.vercel.app
```

Sends 11 recruiter questions to a running chat API (local by default) and checks for missing facts, invented details (GPA, salary, visa, years of experience), hedging words, Turkish replies, and the right cards. Each run uses Groq tokens.

## Production build

```powershell
npm.cmd run build
npm.cmd run preview
```
