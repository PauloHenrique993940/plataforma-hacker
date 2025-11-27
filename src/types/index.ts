export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  points: number;
  rank: number;
  level: number;
  badges: Badge[];
  joinDate: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'iniciante' | 'intermediario' | 'avancado' | 'expert';
  category:
    | 'recon'
    | 'exploit'
    | 'criptografia'
    | 'web'
    | 'forense'
    | 'reversing';
  points: number;
  completed: boolean;
  completedAt?: Date;
  instructions: string;
  flag?: string;
}

export interface Lab {
  id: string;
  name: string;
  description: string;
  difficulty: 'iniciante' | 'intermediario' | 'avancado' | 'expert';
  category: string;
  machineIP: string;
  status: 'disponivel' | 'rodando' | 'parado';
  vulnerabilities: string[];
  objective: string;
  hints: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'ctf' | 'pwn' | 'web' | 'crypto' | 'forensic' | 'reversing';
  difficulty: string;
  points: number;
  completed: boolean;
  timeLimit?: number;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'recon' | 'scan' | 'exploit' | 'post-exploit' | 'web';
  status: 'disponivel' | 'indisponivel' | 'em_manutencao';
}

export interface AdminLog {
  id: string;
  timestamp: Date;
  userId: string;
  action: string;
  details: string;
  ipAddress: string;
}
