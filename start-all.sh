#!/bin/bash
# Start Backend and Frontend

echo "🚀 Iniciando HACKER LABS..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Iniciar Backend
echo "📦 Iniciando Backend (http://localhost:3001)..."
cd backend
npm run dev &
BACKEND_PID=$!

# Esperar um pouco para o backend iniciar
sleep 3

# Iniciar Frontend
echo "⚛️  Iniciando Frontend (http://localhost:5174)..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Ambos os servidores estão rodando!"
echo ""
echo "📊 Frontend:  http://localhost:5174"
echo "🔌 Backend:   http://localhost:3001/api/health"
echo ""
echo "Pressione Ctrl+C para parar..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Aguardar processes
wait $BACKEND_PID $FRONTEND_PID
