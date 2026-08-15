@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install it from https://nodejs.org/ and try again.
  pause
  exit /b 1
)

if not exist "node_modules\groq-sdk\package.json" (
  echo Installing the project dependencies...
  call corepack pnpm install
  if errorlevel 1 (
    echo.
    echo Dependency installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

echo Starting Cagatay Birgi's resume chatbot...
echo The browser will open automatically at http://127.0.0.1:4173/
echo Keep this window open while using the chatbot. Press Ctrl+C to stop it.
echo.
start "" /b powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:4173/'"
call npm.cmd start

if errorlevel 1 (
  echo.
  echo The chatbot server stopped with an error.
  pause
)
