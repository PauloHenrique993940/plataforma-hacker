// Database simulado com dados iniciais
import { v4 as uuidv4 } from 'uuid';

export const db = {
  users: [
    {
      id: '1',
      username: 'Hacker',
      email: 'hacker@hacker.io',
      points: 0,
      rank: 0,
      level: 1,
      badges: [],
      joinDate: new Date().toISOString(),
    },
  ],
  missions: [
    {
      id: '1',
      title: 'Reconhecimento com Nmap',
      description:
        'Use Nmap para escanear a máquina alvo e identificar portas abertas',
      difficulty: 'iniciante',
      category: 'recon',
      points: 100,
      completed: false,
      completedAt: null,
      instructions:
        'Acesse o laboratório e execute: nmap -sV -sC -p- target.lab\nIdentifique os serviços rodando e submeta o relatório.',
      flag: 'FLAG{NMAP_SUCCESS}',
    },
    {
      id: '2',
      title: 'SQL Injection Básico',
      description: 'Explorar vulnerabilidade SQL Injection em formulário web',
      difficulty: 'iniciante',
      category: 'web',
      points: 150,
      completed: false,
      completedAt: null,
      instructions:
        "Teste o formulário de login com: admin' OR '1'='1\nAccesse sem credenciais válidas.",
      flag: 'FLAG{SQL_INJECTION_01}',
    },
    {
      id: '3',
      title: 'Análise de Vulnerabilidades com Nessus',
      description: 'Usar Nessus para realizar varredura completa de segurança',
      difficulty: 'intermediario',
      category: 'recon',
      points: 250,
      completed: false,
      completedAt: null,
      instructions:
        'Inicie um scan no Nessus, analise os resultados e classifique as vulnerabilidades.',
      flag: 'FLAG{NESSUS_ANALYSIS}',
    },
    {
      id: '4',
      title: 'Exploração com Metasploit',
      description: 'Explorar serviço vulnerável usando Metasploit Framework',
      difficulty: 'intermediario',
      category: 'exploit',
      points: 300,
      completed: false,
      completedAt: null,
      instructions:
        'Use Metasploit para explorar Apache Struts. Obtenha shell reverso na máquina alvo.',
      flag: 'FLAG{METASPLOIT_PWNED}',
    },
    {
      id: '5',
      title: 'Privilege Escalation via Buffer Overflow',
      description: 'Exploit de estouro de buffer para escalação de privilégio',
      difficulty: 'avancado',
      category: 'exploit',
      points: 500,
      completed: false,
      completedAt: null,
      instructions:
        'Analise o binário vulnerável, crie o payload e execute a exploração.',
      flag: 'FLAG{BUFFER_OVERFLOW_ROOT}',
    },
  ],
  labs: [
    {
      id: '1',
      name: 'Máquina Linux Básica',
      description: 'Máquina virtual Linux com vulnerabilidades comuns',
      difficulty: 'iniciante',
      category: 'Linux',
      machineIP: '192.168.1.10',
      status: 'disponivel',
      vulnerabilities: ['SSH Weak Credentials', 'Outdated Packages'],
      objective: 'Obter acesso root à máquina',
      hints: ['Verifique credenciais padrão', 'Use ferramentas de enumeration'],
    },
    {
      id: '2',
      name: 'Aplicação Web Vulnerável',
      description: 'Aplicação web com múltiplas vulnerabilidades OWASP Top 10',
      difficulty: 'intermediario',
      category: 'Web',
      machineIP: '192.168.1.11',
      status: 'disponivel',
      vulnerabilities: [
        'SQL Injection',
        'XSS',
        'CSRF',
        'Authentication Bypass',
      ],
      objective: 'Encontrar a flag no banco de dados da aplicação',
      hints: [
        'Teste o formulário de login',
        'Analise o código fonte com browser dev tools',
        'Use SQLMap para SQL Injection',
      ],
    },
    {
      id: '3',
      name: 'Buffer Overflow',
      description: 'Binário com vulnerabilidade de buffer overflow',
      difficulty: 'avancado',
      category: 'Binary',
      machineIP: '192.168.1.12',
      status: 'disponivel',
      vulnerabilities: ['Buffer Overflow', 'Lack of ASLR'],
      objective: 'Executar código arbitrário no binário',
      hints: [
        'Use gdb para debug',
        'Calcule o offset correto',
        'Crie um ROP chain ou shellcode',
      ],
    },
    {
      id: '4',
      name: 'Forense Digital',
      description: 'Imagem de disco com dados ocultos e pistas',
      difficulty: 'intermediario',
      category: 'Forensics',
      machineIP: 'local-image',
      status: 'parado',
      vulnerabilities: ['Hidden Files', 'Steganography'],
      objective: 'Recuperar todos os arquivos e informações ocultas',
      hints: [
        'Use ferramentas de forense como Autopsy',
        'Procure por arquivos deletados',
        'Verifique steganografia em imagens',
      ],
    },
  ],
  tools: [
    {
      id: '1',
      name: 'Nmap',
      description: 'Ferramenta de reconhecimento e mapeamento de rede',
      category: 'recon',
      status: 'disponivel',
      usage: 'nmap -sV -sC -p- target.lab',
      fullDescription:
        'Nmap é um scanner de rede de código aberto que ajuda a descobrir hosts e serviços em uma rede de computadores.',
      output: `Starting Nmap 7.93
Nmap scan report for target.lab (192.168.1.11)
Host is up (0.00045s latency).
Not shown: 998 closed ports
PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 7.4
80/tcp   open  http       Apache httpd 2.4.6
443/tcp  open  https      Apache httpd 2.4.6
3306/tcp open  mysql      MySQL 5.7.32
Nmap done at Thu Nov 26 12:00:00 2025; 1 IP address (1 host up) scanned in 2.34s`,
      tips: [
        'Use -A para detecção agressiva',
        'Use -O para detecção de OS',
        'Use --script para rodar scripts NSE',
      ],
    },
    {
      id: '2',
      name: 'Nessus',
      description: 'Verificador de vulnerabilidades completo',
      category: 'scan',
      status: 'disponivel',
      usage: 'nessus-cli --scan target.lab',
      fullDescription:
        'Nessus é um scanner de vulnerabilidades profissional que identifica falhas de segurança em aplicações e sistemas.',
      output: `Nessus Scan Report - target.lab
Generated: Thu Nov 26 12:15:00 2025

Critical Vulnerabilities: 3
  • Apache 2.4.6 - Remote Code Execution (CVE-2017-9798)
  • MySQL 5.7.32 - Authentication Bypass
  • OpenSSH 7.4 - User Enumeration

High Vulnerabilities: 7
  • Weak SSL Ciphers
  • Outdated Software
  • Missing Security Headers

Medium Vulnerabilities: 12

Total Risk Score: 8.9/10`,
      tips: [
        'Atualize regularmente os plugins',
        'Use templates de scan predefinidos',
        'Exporte relatórios em PDF',
      ],
    },
    {
      id: '3',
      name: 'Burp Suite',
      description: 'Plataforma de teste de segurança web',
      category: 'web',
      status: 'disponivel',
      usage: 'burp --target=http://target.lab',
      fullDescription:
        'Burp Suite é uma plataforma integrada para testes de segurança de aplicações web.',
      output: `Burp Suite Professional v2023.11.1
Inicializando proxy em 127.0.0.1:8080
[+] Interceptador ativo
[+] Scanner ativo
[+] Repeater pronto
[+] Intruder pronto

Vulnerabilidades encontradas:
[*] SQL Injection em /login.php
[*] XSS refletido em /search
[*] Cookies sem HttpOnly em /dashboard
[*] CSRF token ausente em formulário`,
      tips: [
        'Use o Repeater para ajustar requests',
        'Configure o Intruder para força bruta',
        'Analise o Site Map',
      ],
    },
    {
      id: '4',
      name: 'Metasploit Framework',
      description: 'Framework para exploração e testes de penetração',
      category: 'exploit',
      status: 'disponivel',
      usage:
        'msfconsole -x "use exploit/apache/struts; set RHOST target.lab; exploit"',
      fullDescription:
        'Metasploit Framework é um projeto de segurança que fornece informações sobre vulnerabilidades e ajuda no teste de penetração.',
      output: `[*] Metasploit Framework Console
[*] Módulos disponíveis: 3000+
[*] Exploits disponíveis: 1500+

msf6 > use exploit/apache/struts
msf6 exploit(struts) > set RHOST 192.168.1.11
msf6 exploit(struts) > exploit

[*] Started bind TCP handler at 0.0.0.0:4444
[*] Enviando payload...
[+] Shell estabelecido!
meterpreter > shell`,
      tips: [
        'Use generate para criar payloads',
        'Use check antes de executar exploit',
        'Sessions permite gerenciar shells',
      ],
    },
    {
      id: '5',
      name: 'SQLMap',
      description: 'Ferramenta de exploração de SQL Injection',
      category: 'web',
      status: 'disponivel',
      usage: 'sqlmap -u "http://target.lab/login" --dbs',
      fullDescription:
        'SQLMap é uma ferramenta automática que detecta e explora vulnerabilidades de SQL Injection.',
      output: `sqlmap/1.7.6 - Automated SQL injection tool

Target URL: http://target.lab/login
Parâmetro vulnerável: username
Tipo de injeção: UNION query

Banco de dados detectado: MySQL 5.7.32

Bancos disponíveis:
[*] information_schema
[*] mysql
[*] performance_schema
[*] users_db

Tabelas em users_db:
[*] users
[*] admin
[*] sessions`,
      tips: [
        'Use --dump para extrair dados',
        'Use --os-shell para shell reverso',
        'Use -p para especificar parâmetro',
      ],
    },
    {
      id: '6',
      name: 'Wireshark',
      description: 'Analisador de tráfego de rede',
      category: 'recon',
      status: 'em_manutencao',
      usage: 'wireshark -i eth0 -k',
      fullDescription:
        'Wireshark é um analisador de protocolo de rede que permite ver o que está acontecendo em sua rede em um nível microscópico.',
      output: `Wireshark 4.0.0

Interface: eth0
Pacotes capturados: 1234

Protocolo    Origem          Destino         Tamanho  Info
TCP          192.168.1.10    192.168.1.11    54       [SYN]
TCP          192.168.1.11    192.168.1.10    54       [SYN, ACK]
HTTP         192.168.1.10    192.168.1.11    523      GET /login HTTP/1.1
TCP          192.168.1.11    192.168.1.10    60       [RST, ACK]`,
      tips: [
        'Use filtros como tcp.port==80',
        'Siga streams TCP para ver dados',
        'Exporte conversas HTTP',
      ],
    },
    {
      id: '7',
      name: 'John the Ripper',
      description: 'Ferramenta de quebra de senhas',
      category: 'post-exploit',
      status: 'disponivel',
      usage: 'john --wordlist=rockyou.txt --format=md5 hashes.txt',
      fullDescription:
        'John the Ripper é uma ferramenta de teste de força rápida e disponível em muitos sistemas operacionais diferentes.',
      output: `John the Ripper 1.9.0 - Password Cracking

Modo: wordlist
Wordlist carregada: 14.3 milhões de palavras
Hashes carregados: 125

[+] admin:password123
[+] user:letmein
[+] root:123456
[+] postgres:postgres

Tempo decorrido: 45 segundos
Velocidade: 2.8 M/segundo
75 de 125 hashes quebrados (60%)`,
      tips: [
        'Use --rules para aplicar regras',
        'Use --incremental para brute force',
        'Use --loopback para tentar hashes',
      ],
    },
    {
      id: '8',
      name: 'Hydra',
      description: 'Ferramenta de força bruta para serviços de rede',
      category: 'exploit',
      status: 'disponivel',
      usage: 'hydra -l admin -P passwords.txt -t 4 ftp://target.lab',
      fullDescription:
        'Hydra é um paralelizador de login que suporta muitos protocolos para atacar.',
      output: `Hydra v9.4 - FTP brute force attack

Target: target.lab (192.168.1.11)
Protocolo: FTP
Username: admin
Passwords testadas: 5000

[21][ftp] host: 192.168.1.11   login: admin   password: F1r3w@ll2023
[+] 1 de 1 target foi quebrado com sucesso!

Tempo decorrido: 3 minutos 42 segundos`,
      tips: [
        'Use -L para lista de usuários',
        'Use -P para lista de senhas',
        'Use -t para threads paralelas',
      ],
    },
    {
      id: '9',
      name: 'OpenVAS',
      description: 'Scanner de vulnerabilidades de código aberto',
      category: 'scan',
      status: 'disponivel',
      usage:
        'gvm-cli --gmp-username admin --gmp-password pass socket --xml="<create_task>..."',
      fullDescription:
        'OpenVAS é um framework e serviços para gerenciamento de vulnerabilidades com teste abrangente.',
      output: `OpenVAS 23.4.0 - Vulnerability Scanner

Relatório de Vulnerabilidades para: target.lab

Vulnerabilidades por Severidade:
[HIGH] 12
[MEDIUM] 34
[LOW] 78

Principais Achados:
1. Apache mod_php Remote Code Execution - CVSS 9.8
2. MySQL Default Credentials - CVSS 9.0
3. Outdated OpenSSH - CVSS 8.6
4. Missing Security Headers - CVSS 6.5

Recomendações:
- Aplique patches de segurança imediatamente
- Mude senhas padrão
- Configure firewall`,
      tips: [
        'Crie tarefas recorrentes',
        'Use filtros de relatório',
        'Integre com ferramentas de SIEM',
      ],
    },
    {
      id: '10',
      name: 'OWASP ZAP',
      description: 'Scanner de segurança web de código aberto',
      category: 'web',
      status: 'disponivel',
      usage: 'zaproxy -cmd -quickurl http://target.lab -quickout report.html',
      fullDescription:
        'OWASP ZAP é um proxy de interceptação gratuito para testar segurança de aplicações web.',
      output: `OWASP ZAP - Report

Aplicação: http://target.lab
Data do scan: 2025-11-26

Vulnerabilidades Encontradas: 28

[HIGH]
- SQL Injection em /admin/users.php
- Remote File Inclusion em /includes/file.php
- Authentication Bypass em /login

[MEDIUM]
- Cookies sem HttpOnly
- Missing X-Frame-Options header
- Weak SSL Configuration

[LOW]
- Information Disclosure
- Outdated Technology Detected`,
      tips: [
        'Use o Spider para mapear aplicação',
        'Configure autenticação para testes',
        'Use scripts personalizados',
      ],
    },
    {
      id: '11',
      name: 'Nikto',
      description: 'Scanner web de linha de comando',
      category: 'web',
      status: 'indisponivel',
      usage: 'nikto -h target.lab -o report.html',
      fullDescription:
        'Nikto é um scanner web de código aberto que procura por vulnerabilidades em servidores web.',
      output: `Nikto v2.5.0

Target: target.lab
Scanning com 6776 verificações...

[+] Server: Apache/2.4.6
[+] Retrieved X-Powered-By header: PHP/5.4.16

[!] OSVDB-3268: /index.php: Possible interesting file/folder found.
[!] File Upload found - /uploads/ - Possible shell upload!
[+] Allowed HTTP Methods: GET, HEAD, POST, PUT, DELETE
[+] /wp-admin/: Admin login found
[!] OSVDB-3092: /phpmyadmin/: phpMyAdmin detected!`,
      tips: [
        'Use -Format para diferentes formatos',
        'Use -Plugins para selecionar plugins',
        'Use -Tuning para ajustar scan',
      ],
    },
    {
      id: '12',
      name: 'Ghidra',
      description: 'Ferramenta de engenharia reversa',
      category: 'post-exploit',
      status: 'disponivel',
      usage: 'ghidra /path/to/binary -import',
      fullDescription:
        'Ghidra é um framework de engenharia reversa de software de código aberto desenvolvido pela NSA.',
      output: `Ghidra v10.3.1 - Reverse Engineering Framework

Binário carregado: /bin/login
Arquitetura: x86-64
Tamanho: 32.5 KB

Funções descobertas: 85
Strings encontradas: 234
Constantes: 45

Análise:
[+] main @ 0x400a90
[+] authenticate @ 0x400b20
[+] validate_password @ 0x400c15
[+] print_banner @ 0x400d40

Vulnerabilidade detectada:
[!] Buffer Overflow em função 'strcpy' @ 0x400c45`,
      tips: [
        'Use Decompiler para código C',
        'Anotações para documentar achados',
        'Plugins para análise avançada',
      ],
    },
  ],
  challenges: [
    {
      id: '1',
      title: 'Criptografia RSA',
      description: 'Quebre a criptografia RSA com números específicos',
      type: 'crypto',
      difficulty: 'intermediario',
      points: 200,
      completed: false,
    },
    {
      id: '2',
      title: 'Web Shell Upload',
      description: 'Faça upload de shell em aplicação web vulnerável',
      type: 'web',
      difficulty: 'iniciante',
      points: 150,
      completed: false,
    },
    {
      id: '3',
      title: 'Reverse Engineering',
      description: 'Analise e quebre um binário de 64 bits',
      type: 'reversing',
      difficulty: 'avancado',
      points: 300,
      completed: false,
    },
    {
      id: '4',
      title: 'SQL Injection Avançado',
      description: 'Exploração avançada de SQL Injection',
      type: 'web',
      difficulty: 'avancado',
      points: 400,
      completed: false,
    },
    {
      id: '5',
      title: 'Pwning Binary',
      description: 'Exploit de binário com proteções habilitadas',
      type: 'pwn',
      difficulty: 'expert',
      points: 500,
      completed: false,
    },
  ],
  activeTools: {},
  activeLabs: {},
};

export const saveDatabaseToFile = () => {
  // Em um ambiente real, salvaria em um arquivo ou banco de dados
  // Por enquanto, mantemos tudo em memória
};

export const loadDatabaseFromFile = () => {
  // Em um ambiente real, carregaria de um arquivo ou banco de dados
  // Por enquanto, começamos com os dados padrão
};
