@echo off
REM Start Backend and Frontend on Windows

echo.
echo 🚀 Iniciando HACKER LABS...
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Iniciar Backend em nova janela
echo 📦 Iniciando Backend (http://localhost:3001)...
start cmd /k "cd backend && npm run dev"

REM Aguardar um pouco para o backend iniciar
timeout /t 3 /nobreak

REM Iniciar Frontend em nova janela
echo ⚛️  Iniciando Frontend (http://localhost:5174)...
start cmd /k "npm run dev"

echo.
echo ✅ Ambos os servidores estão rodando!
echo.
echo 📊 Frontend:  http://localhost:5174
echo 🔌 Backend:   http://localhost:3001/api/health
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
