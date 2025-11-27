# 🚀 PLATAFORMA HACKER LABS - Backend Implementado

## ✅ O que foi implementado

### Backend Express (Node.js)

- ✅ Servidor API RESTful em `localhost:3001`
- ✅ CORS habilitado para comunicação com frontend
- ✅ Rotas completas para:
  - **Users**: Login, obter dados, atualizar
  - **Missions**: Listar, obter, completar, criar
  - **Labs**: Listar, iniciar, parar, criar
  - **Tools**: Listar, iniciar, parar
  - **Challenges**: Listar, completar, criar
  - **Ranking**: Obter ranking global
  - **Stats**: Obter estatísticas gerais

### Frontend (React + Zustand)

- ✅ Serviço API (`src/services/api.ts`) com Axios
- ✅ Store Zustand atualizado com chamadas à API
- ✅ Suporte a modo offline (usa dados mock se API falhar)
- ✅ Variáveis de ambiente (`.env`)

### Dados Iniciais

- ✅ 5 missões completas
- ✅ 4 laboratórios virtuais
- ✅ 12 ferramentas de pentest
- ✅ 3 desafios CTF
- ✅ Sistema de pontos e ranking

## 🎯 Como Rodar

### Opção 1: Rodar Frontend e Backend Simultaneamente (Recomendado)

```bash
npm run dev:all
```

Isso vai abrir:

- Frontend: http://localhost:5174
- Backend API: http://localhost:3001

### Opção 2: Rodar Separadamente

**Terminal 1 - Frontend:**

```bash
npm run dev
```

**Terminal 2 - Backend:**

```bash
cd backend
npm run dev
```

### Opção 3: Rodar Backend em Produção

```bash
cd backend
npm start
```

## 🧪 Testar a API

### Health Check

```bash
curl http://localhost:3001/api/health
```

### Listar Missões

```bash
curl http://localhost:3001/api/missions
```

### Listar Labs

```bash
curl http://localhost:3001/api/labs
```

### Listar Ferramentas

```bash
curl http://localhost:3001/api/tools
```

### Completar Missão

```bash
curl -X POST http://localhost:3001/api/missions/1/complete
```

### Iniciar Lab

```bash
curl -X POST http://localhost:3001/api/labs/1/start
```

### Ranking

```bash
curl http://localhost:3001/api/ranking
```

## 📁 Estrutura de Arquivos

```
plataforma-hacker/
├── src/
│   ├── services/
│   │   └── api.ts              # 🆕 Cliente HTTP com Axios
│   ├── store/
│   │   └── index.ts            # ✏️ Atualizado com chamadas à API
│   └── ...
├── backend/
│   ├── server.js               # 🆕 Servidor Express
│   ├── db.js                   # 🆕 Database mock em memória
│   ├── package.json            # 🆕 Deps do backend
│   └── node_modules/
├── .env                        # 🆕 Variáveis de ambiente
├── package.json                # ✏️ Atualizado com scripts
└── ...
```

## 🔧 Funcionalidades Implementadas

### Usuários

- ✅ Login automático
- ✅ Criação de novos usuários
- ✅ Rastreamento de pontos
- ✅ Sistema de ranking

### Missões

- ✅ Listar todas as missões
- ✅ Obter detalhes de uma missão
- ✅ Marcar missão como completa
- ✅ Adicionar nova missão
- ✅ Atribuir pontos ao completar

### Laboratórios

- ✅ Listar labs disponíveis
- ✅ Iniciar/parar labs
- ✅ Rastrear labs em execução
- ✅ Criar novos labs

### Ferramentas

- ✅ Listar todas as ferramentas
- ✅ Iniciar/parar ferramentas
- ✅ Verificar status de ferramentas
- ✅ Controlar disponibilidade

### Desafios

- ✅ Listar desafios CTF
- ✅ Completar desafios
- ✅ Sistema de pontos por dificuldade
- ✅ Criar novos desafios

## 🎮 Como Usar a Plataforma

1. **Abrir o navegador**: http://localhost:5174
2. **Login**: Clique em "Entrar na Plataforma"
3. **Dashboard**: Veja seu progresso e estatísticas
4. **Missões**: Complete desafios e ganhe pontos
5. **Labs**: Iniciar máquinas virtuais para praticar
6. **Ferramentas**: Acessar ferramentas de pentest
7. **Desafios**: Participar de CTF
8. **Ranking**: Ver sua posição no ranking global

## 📊 Dados de Exemplo

### Missões

- Reconhecimento com Nmap (100 pontos)
- SQL Injection Básico (150 pontos)
- Análise de Vulnerabilidades com Nessus (250 pontos)

### Labs

- Máquina Linux Básica
- Aplicação Web Vulnerável
- Buffer Overflow
- Forense Digital

### Ferramentas

- Nmap, Nessus, Burp Suite
- Metasploit, SQLMap, Wireshark
- John the Ripper, Hydra, OpenVAS, OWASP ZAP
- Nikto, Ghidra

## 🔐 Segurança

⚠️ **IMPORTANTE**: Este é um ambiente de desenvolvimento/educação.

Para produção, adicionar:

- ✅ Autenticação JWT
- ✅ Validação de entrada
- ✅ Rate limiting
- ✅ HTTPS
- ✅ Banco de dados real (PostgreSQL)
- ✅ Variáveis de ambiente seguras
- ✅ Logs de auditoria

## 🐛 Troubleshooting

### Porta 3001 em uso

```bash
# Windows
Get-Process | Where-Object {$_.Port -eq 3001} | Stop-Process -Force

# Mac/Linux
lsof -i :3001 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### API não conecta

- Verifique se backend está rodando: `curl http://localhost:3001/api/health`
- Verifique `.env` se está apontando para URL correta
- Verifique console do navegador para erros CORS

### Dados não aparecem

- Abra DevTools (F12)
- Vá em Network tab
- Verifique se requisições estão retornando 200
- Consulte console para erros

## 📝 Próximos Passos

- [ ] Integração com banco de dados real (PostgreSQL)
- [ ] Autenticação e autorização
- [ ] Upload de arquivos (for writeups)
- [ ] Sistema de notificações
- [ ] Integração com máquinas Docker
- [ ] Sistema de hints avançado
- [ ] Integração com plataformas CTF reais

## 📞 Suporte

Para problemas, verifique:

1. `README.md` - Documentação geral
2. `QUICKSTART.md` - Início rápido
3. Console do navegador (F12) - Erros frontend
4. Terminal - Logs do backend
5. Network tab - Requisições HTTP

---

**Desenvolvido com ❤️ para hackers éticos**

Segurança Ofensiva - Aprendizado Contínuo
