# 🚀 Quick Start - HACKER LABS

## ⚡ Iniciar em 30 segundos

### 1️⃣ Abrir Terminal

```powershell
# Windows - PowerShell
Set-Location "e:\Plataforma-Haker\plataforma-hacker"

# Ou Mac/Linux
cd plataforma-hacker
```

### 2️⃣ Iniciar Servidor

```bash
npm run dev
```

### 3️⃣ Abrir Navegador

```
http://localhost:5173
```

---

## 📋 Comandos Principais

| Comando           | O que faz                      |
| ----------------- | ------------------------------ |
| `npm run dev`     | 🚀 Inicia servidor dev com HMR |
| `npm run build`   | 📦 Build para produção         |
| `npm run preview` | 👀 Preview do build            |
| `npm run lint`    | 🔍 Verifica código             |

---

## 🎮 Explorar a Plataforma

1. **Login**: Clique em "Entrar na Plataforma"
2. **Dashboard**: Veja seus stats e gráficos
3. **Missões**: Complete desafios e ganhe pontos
4. **Labs**: Iniciar máquinas vulneráveis
5. **Ferramentas**: Explorar ferramentas de pentest

---

## 🎨 Personalizar

### Mudar Cores

Editar em `src/styles/global.css`:

```css
--primary-color: #00ff41; /* Verde */
--secondary-color: #00d4ff; /* Ciano */
--accent-color: #ff0080; /* Pink */
```

### Adicionar Missão

Editar `src/pages/Missions.tsx` - array `mockMissions`

### Adicionar Ferramenta

Editar `src/pages/Tools.tsx` - array `tools`

---

## 🆘 Troubleshooting

### Erro de porta em uso

```powershell
# Matar processo na porta 5173
Get-Process | Where-Object {$_.Name -eq "node"} | Stop-Process -Force

# Ou use outra porta
npm run dev -- --port 3000
```

### node_modules corrompido

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Cache limpo

```powershell
# Windows
npm cache clean --force

# Mac/Linux
npm cache clean --force
```

---

## 📱 Testar Responsividade

1. Abrir DevTools (F12)
2. Ativar modo responsivo (Ctrl+Shift+M)
3. Testar diferentes resoluções:
   - Mobile: 375px (iPhone)
   - Tablet: 768px (iPad)
   - Desktop: 1920px

---

## 📦 Deploy

### Build

```bash
npm run build
# Cria pasta /dist com arquivos estáticos
```

### Deploying (Vercel)

```bash
npm install -g vercel
vercel
```

### Deploying (Netlify)

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 🔗 Links Úteis

- 📖 [React Docs](https://react.dev)
- ⚡ [Vite Docs](https://vitejs.dev)
- 📘 [TypeScript Docs](https://typescriptlang.org)
- 🎨 [Tailwind Docs](https://tailwindcss.com)
- 📊 [Recharts Docs](https://recharts.org)

---

## 💡 Tips & Tricks

### 1. HMR Automático

Salve um arquivo e veja mudanças instantaneamente!

### 2. DevTools

- Redux DevTools para Zustand
- React DevTools para debug

### 3. Performance

- Usar `React.memo()` para componentes pesados
- Lazy load componentes com `React.lazy()`

### 4. Debugging

- Abrir DevTools (F12)
- Sources tab para breakpoints
- Network tab para requests

---

## 🎯 Próximos Passos

1. ✅ Explorar a plataforma
2. ✅ Customizar design (cores, tipografia)
3. ✅ Adicionar suas missões/labs
4. ✅ Integrar com backend
5. ✅ Deploy em produção

---

## 📞 Suporte

- 📚 Consultar `README.md`
- 🔧 Consultar `DEVELOPMENT.md`
- ✨ Consultar `FEATURES.md`

---

**Aproveite o desenvolvimento! 🎉**

```
╔════════════════════════════════════╗
║    HACKER LABS - Happy Hacking!     ║
║   Segurança Ofensiva Ética         ║
╚════════════════════════════════════╝
```
