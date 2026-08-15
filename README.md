# Çağatay Birgi — Resume Assistant

A reviewer-facing interactive résumé built with React, TypeScript, and Vite. The chat answers are intentionally grounded in the supplied CV, certificates, and linked public GitHub repositories; API key is required.

## Run on Windows

Double-click `start-resume-chatbot.cmd`. It starts the local server and opens the chatbot in your default browser automatically.

From PowerShell, use:

```powershell
.\start-resume-chatbot.cmd
```

Keep that terminal window open while reviewing the chatbot. Press `Ctrl+C` to stop it.

## Alternative npm commands

PowerShell may block `npm.ps1`, so use the Windows command wrapper explicitly:

```powershell
npm.cmd install
npm.cmd start
```

## Production build

```powershell
npm.cmd run build
npm.cmd run preview
```

Resume and supporting documents live in `public/documents`. The response knowledge base is split between `src/data/resume.ts` and `src/lib/chat.ts`.
