# 🛠️ Guia de Ferramentas - Plataforma Hacker Labs

## ✨ Novo Sistema de Ferramentas Funcionais

As ferramentas agora estão **100% funcionais** com execução simulada em tempo real!

---

## 🎯 Como Usar as Ferramentas

### 1. **Abrir uma Ferramenta**

- Clique em qualquer card de ferramenta na página "Ferramentas"
- O modal abra com informações completas da ferramenta

### 2. **Iniciar a Ferramenta**

- Clique no botão **"Iniciar"** do card
- O card ficará **AZUL** indicando que a ferramenta está ativa
- Um indicador de status pulsante aparece no canto superior direito

### 3. **Executar a Ferramenta**

- Abra o modal da ferramenta
- Vá para a seção **"Executar Ferramenta"**
- Adicione parâmetros (opcional) como: `-sV -sC -p-`
- Clique em **"Executar"**
- A ferramenta simulará execução e retornará saída realista

### 4. **Ver Resultados**

- Após execução, a saída aparecerá automaticamente
- Você pode copiar a saída com o botão **"Copy"**
- O histórico de execuções fica salvo para consulta rápida

---

## 🎨 Estados da Ferramenta

### Estado Inativo (Normal)

```
┌─────────────────┐
│  Nmap           │ ◄── Cor padrão (bordeado)
│  Ferramenta...  │
│  [Iniciar] [ℹ️]  │
└─────────────────┘
```

### Estado Ativo (Azul/Cyan)

```
┌─────────────────┐
│  Nmap        ● │ ◄── Indicador pulsante
│  Ferramenta... │ ◄── Fundo AZUL
│  [Parar] [ℹ️]   │
└─────────────────┘
```

---

## 📋 Ferramentas Disponíveis

### **Reconhecimento (Verde - #00FF41)**

- **Nmap** - Mapeamento de rede
- **Wireshark** - Análise de tráfego

### **Varredura (Ciano - #00D4FF)**

- **Nessus** - Varredura de vulnerabilidades
- **OpenVAS** - Scanner de vulnerabilidades

### **Exploração (Rosa - #FF0080)**

- **Metasploit Framework** - Framework de exploit
- **Hydra** - Força bruta

### **Testes Web (Laranja - #FFA500)**

- **Burp Suite** - Teste de segurança web
- **SQLMap** - Exploração SQL Injection
- **OWASP ZAP** - Scanner web
- **Nikto** - Scanner web (em manutenção)

### **Pós-Exploração (Ciano - #00D4FF)**

- **John the Ripper** - Quebra de senhas
- **Ghidra** - Engenharia reversa

---

## 💻 Exemplos de Uso

### Exemplo 1: Nmap Básico

```
1. Clique em "Nmap"
2. Deixe parâmetros em branco para usar padrão
3. Clique "Executar"
4. Veja o resultado da varredura
```

### Exemplo 2: SQLMap com Parâmetros

```
1. Clique em "SQLMap"
2. Digite no parâmetros: -u "http://target/page.php?id=1" --dbs
3. Clique "Executar"
4. Veja a exploração SQL Injection simulada
```

### Exemplo 3: John the Ripper

```
1. Clique em "John the Ripper"
2. Digite: --wordlist=rockyou.txt hashes.txt
3. Clique "Executar"
4. Veja senhas sendo quebradas
```

---

## 🔧 Informações das Ferramentas

Cada ferramenta possui:

- **Descrição Completa** - O que a ferramenta faz
- **Uso Padrão** - Comando básico para executar
- **Dicas** - Boas práticas de uso
- **Histórico** - Últimas 5 execuções salvas

---

## 📊 Saída de Execução

A saída de cada ferramenta:

- ✅ Mostra informações realistas
- ✅ Inclui timestamps de execução
- ✅ Registra parâmetros utilizados
- ✅ Permite copiar para clipboard
- ✅ Fica armazenada no histórico

---

## ⚙️ API Backend

As ferramentas usam estes endpoints:

```
POST   /api/tools/:id/execute
GET    /api/tools/:id/executions
GET    /api/tools/:id/documentation
POST   /api/tools/:id/start
POST   /api/tools/:id/stop
GET    /api/tools/:id/status
```

---

## 🎓 Próximos Passos

1. ✅ Todas as ferramentas funcionam
2. ✅ Simulação realista de execução
3. ✅ Histórico persistente
4. ⏳ Integração com Labs (em breve)
5. ⏳ Salvar execuções no banco de dados (em breve)

---

## ⚡ Dicas Rápidas

- 🔵 **Azul = Ativo** - Ferramenta está rodando
- 🟢 **Verde = Sucesso** - Execução completou
- 🔴 **Vermelho = Erro** - Problema na execução
- 📋 **Copiar** - Clique no ícone de copy na saída
- ⏱️ **Histórico** - Acesse últimas 5 execuções

---

## 🚀 Comece Agora!

1. Abra a página **Ferramentas**
2. Escolha uma ferramenta
3. Clique "Iniciar"
4. O card fica **AZUL**
5. Abra o modal e execute!

**Divirta-se com as ferramentas! 🎯**
