# 🖥️ Simulador de Terminal - Ferramentas

## ✨ Nova Funcionalidade: Simulação Visual em Tempo Real

Quando você executa uma ferramenta, agora aparece um **terminal interativo** que simula a execução da ferramenta em tempo real!

---

## 🎯 Como Funciona

### 1. **Iniciar a Ferramenta**

- Abra o modal da ferramenta
- Vá para "Executar Ferramenta"
- Adicione parâmetros (opcional)
- Clique em **"Executar"**

### 2. **Terminal Aparece**

- Um terminal abre no canto inferior direito
- O comando é digitado gradualmente
- Simula a execução real da ferramenta
- A saída aparece com delay realista

### 3. **Interagir com o Terminal**

#### Botões Disponíveis:

- **📋 Copiar** - Copia toda a saída para clipboard
- **🔄 Executar Novamente** - Re-executa a ferramenta
- **❌ Fechar** - Fecha o terminal
- **⬇️ Minimizar** - Reduz o tamanho do terminal
- **⬆️ Expandir** - Volta ao tamanho normal

---

## 📺 Recursos do Simulador

### Exibição em Tempo Real

```
$ nmap -sV -sC -p- target.lab
Starting Nmap 7.93
Nmap scan report for target.lab (192.168.1.11)
Host is up (0.00045s latency).
Not shown: 998 closed ports
PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 7.4
80/tcp   open  http       Apache httpd 2.4.6
...
```

### Elementos Visuais

- ✅ Cursor piscante (▌) durante execução
- ✅ Digitação gradual do comando
- ✅ Saída colorida em verde (#00FF41)
- ✅ Scrollable para saídas longas
- ✅ Timer de execução em tempo real

### Informações de Execução

```
Ferramenta: Nmap
Parâmetros: -sV -sC -p-
Tempo: 2.3s
```

---

## 🎨 Design do Terminal

### Estados

**Aberto e Executando:**

```
┌─────────────────────────────────┐
│ Terminal | Nmap - Terminal... ○ │ ⬇️ ❌
├─────────────────────────────────┤
│ $ nmap -sV -sC -p- target.lab  │
│ Starting Nmap 7.93              │
│ Host is up...                   │
│ ▌                               │
│                                 │
├─────────────────────────────────┤
│ Executando... │ 📋 🔄 ❌         │
└─────────────────────────────────┘
```

**Minimizado:**

```
┌─────────────────────────┐
│ Terminal | Nmap... ○ ⬆️ ❌ │
└─────────────────────────┘
```

**Completo:**

```
┌──────────────────────────────┐
│ Terminal | Nmap...      ⬇️ ❌ │
├──────────────────────────────┤
│ $ nmap -sV -sC -p- ...      │
│ Starting Nmap 7.93           │
│ Nmap scan report...          │
│ ✓ Completo 2.3s              │
│ Ferramenta: Nmap             │
│ Parâmetros: -sV -sC -p-      │
└──────────────────────────────┘
```

---

## 💻 Exemplos de Uso

### Exemplo 1: Nmap Simples

```
1. Clique em "Nmap"
2. Deixe parâmetros em branco
3. Clique "Executar"
4. Terminal abre com animação
5. Veja o scan em ação!
```

### Exemplo 2: SQLMap com Parâmetros

```
1. Clique em "SQLMap"
2. Digite: -u "http://target/page.php?id=1" --dbs
3. Clique "Executar"
4. Terminal mostra exploração
5. Copie a saída com 📋
```

### Exemplo 3: Executar Novamente

```
1. Terminal já está aberto
2. Modifique os parâmetros (opcional)
3. Clique em "🔄 Executar Novamente"
4. Nova execução com novos parâmetros
```

---

## 🔧 Recursos Técnicos

### Simulação de Digitação

- Velocidade: ~30ms por caractere
- Realista: simula digitação do usuário
- Suave: transição natural entre comando e saída

### Timing de Execução

- Timer em tempo real
- Mostra segundos decorridos
- Atualiza a cada 100ms
- Exibe no formato: "2.3s"

### Armazenamento de Histórico

- Últimas 5 execuções salvas
- Acesso rápido via histórico
- Clique em qualquer execução anterior para relê-la

---

## ⌨️ Atalhos (Futuro)

_(Planejado para próximas versões)_

- `Esc` - Fechar terminal
- `Ctrl+C` - Parar execução
- `Ctrl+L` - Limpar terminal
- `Ctrl+V` - Colar parâmetros

---

## 🎓 Dicas Avançadas

### Copiar e Colar

```
1. Execute uma ferramenta
2. Clique em "📋 Copiar"
3. Cole em um arquivo ou editor
4. Use a saída em relatórios
```

### Múltiplas Execuções

```
1. Execute Nmap
2. Clique "🔄 Executar Novamente"
3. Terminal limpa e re-executa
4. Compare outputs diferentes
```

### Observar Padrões

```
1. Execute a mesma ferramenta várias vezes
2. Veja como os tempos variam
3. Entenda comportamento realista
```

---

## 🌟 Características Especiais

### Rollback (Descer/Subir)

- Terminal fica no canto inferior direito
- Clique na barra para mover
- Clique em qualquer lugar para manter

### Resize Dinâmico

- Redimensiona automaticamente para telas pequenas
- Mantém proporção em mobile
- Otimizado para tablets

### Performance

- Rápido mesmo com saídas longas
- Scroll suave sem lag
- Baixo uso de memória

---

## 📊 Saída de Exemplo

### Nmap Output

```bash
$ nmap -sV -sC -p- target.lab

Starting Nmap 7.93 (https://nmap.org)
Nmap scan report for target.lab (192.168.1.11)
Host is up (0.00045s latency).
Not shown: 998 closed ports
PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 7.4
80/tcp   open  http       Apache httpd 2.4.6
443/tcp  open  https      Apache httpd 2.4.6
3306/tcp open  mysql      MySQL 5.7.32
Nmap done at Thu Nov 26 12:00:00 2025; 1 IP address (1 host up) scanned in 2.34s
```

### SQLMap Output

```bash
$ sqlmap -u "http://target/page.php?id=1" --dbs

sqlmap/1.7.6 - Automated SQL injection tool

Target URL: http://target/page.php?id=1
Parâmetro vulnerável: id
Tipo de injeção: UNION query

Banco de dados detectado: MySQL 5.7.32

Bancos disponíveis:
[*] information_schema
[*] mysql
[*] performance_schema
[*] users_db
```

---

## 🚀 Comece Agora!

1. Abra a página **Ferramentas**
2. Clique em qualquer ferramenta
3. Clique "Iniciar"
4. Execute com parâmetros
5. Veja o terminal abrir! 🎉

---

## ⚡ Próximas Melhorias

- ⏳ Suporte a histórico persistente
- ⏳ Salvar outputs em arquivo
- ⏳ Temas de terminal customizáveis
- ⏳ Suporte a plugins
- ⏳ Integração com labs

---

**Divirta-se explorando as ferramentas com o novo simulador! 🖥️**
