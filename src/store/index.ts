import { create } from 'zustand';
import type { User, Mission, Lab, Challenge } from '../types';

interface AppStore {
  user: User | null;
  missions: Mission[];
  labs: Lab[];
  challenges: Challenge[];
  isLoggedIn: boolean;
  theme: 'dark' | 'light';

  // User actions
  setUser: (user: User) => void;
  login: (username: string) => void;
  logout: () => void;

  // Mission actions
  setMissions: (missions: Mission[]) => void;
  completeMission: (missionId: string) => void;
  addMission: (mission: Mission) => void;

  // Lab actions
  setLabs: (labs: Lab[]) => void;
  startLab: (labId: string) => void;
  stopLab: (labId: string) => void;

  // Challenge actions
  setChallenges: (challenges: Challenge[]) => void;
  completeChallenge: (challengeId: string) => void;

  // UI actions
  toggleTheme: () => void;
}

// Mock data initialization
const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Reconhecimento com Nmap',
    description:
      'Use Nmap para escanear a máquina alvo e identificar portas abertas',
    difficulty: 'iniciante',
    category: 'recon',
    points: 100,
    completed: false,
    instructions: 'Acesse o laboratório e execute: nmap -sV -sC -p- target.lab',
    flag: 'FLAG{NMAP_SUCCESS}',
  },
  {
    id: '2',
    title: 'SQL Injection Básico',
    description: 'Explorar vulnerabilidade SQL Injection',
    difficulty: 'iniciante',
    category: 'web',
    points: 150,
    completed: false,
    instructions: 'Teste o formulário de login',
    flag: 'FLAG{SQL_INJECTION_01}',
  },
  {
    id: '3',
    title: 'Análise com Nessus',
    description: 'Realizar varredura de vulnerabilidades',
    difficulty: 'intermediario',
    category: 'recon',
    points: 250,
    completed: false,
    instructions: 'Inicie um scan no Nessus',
    flag: 'FLAG{NESSUS_ANALYSIS}',
  },
];

const mockLabs: Lab[] = [
  {
    id: '1',
    name: 'Máquina Linux Básica',
    description: 'Máquina virtual Linux com vulnerabilidades',
    difficulty: 'iniciante',
    category: 'Linux',
    machineIP: '192.168.1.10',
    status: 'disponivel',
    vulnerabilities: ['SSH Weak Credentials'],
    objective: 'Obter acesso root',
    hints: ['Verifique credenciais padrão'],
  },
  {
    id: '2',
    name: 'Aplicação Web',
    description: 'App web com vulnerabilidades OWASP',
    difficulty: 'intermediario',
    category: 'Web',
    machineIP: '192.168.1.11',
    status: 'disponivel',
    vulnerabilities: ['SQL Injection', 'XSS'],
    objective: 'Encontrar a flag',
    hints: ['Teste o formulário'],
  },
];

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Criptografia RSA',
    description: 'Quebre a criptografia RSA',
    type: 'crypto',
    difficulty: 'intermediario',
    points: 200,
    completed: false,
  },
  {
    id: '2',
    title: 'Web Shell',
    description: 'Upload de shell web',
    type: 'web',
    difficulty: 'iniciante',
    points: 150,
    completed: false,
  },
];

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  missions: mockMissions,
  labs: mockLabs,
  challenges: mockChallenges,
  isLoggedIn: false,
  theme: 'dark',

  setUser: (user) => set({ user, isLoggedIn: true }),

  login: (username) => {
    const mockUser: User = {
      id: '1',
      username,
      email: `${username}@hacker.io`,
      points: 0,
      rank: 0,
      level: 1,
      badges: [],
      joinDate: new Date(),
    };
    set({ user: mockUser, isLoggedIn: true });
  },

  logout: () => set({ user: null, isLoggedIn: false }),

  setMissions: (missions) => set({ missions }),

  completeMission: (missionId) =>
    set((state) => {
      const mission = state.missions.find((m) => m.id === missionId);
      const points = mission?.points || 0;
      return {
        missions: state.missions.map((m) =>
          m.id === missionId
            ? { ...m, completed: true, completedAt: new Date() }
            : m
        ),
        user: state.user
          ? { ...state.user, points: state.user.points + points }
          : null,
      };
    }),

  addMission: (mission) =>
    set((state) => ({ missions: [...state.missions, mission] })),

  setLabs: (labs) => set({ labs }),

  startLab: (labId) =>
    set((state) => ({
      labs: state.labs.map((lab) =>
        lab.id === labId ? { ...lab, status: 'rodando' } : lab
      ),
    })),

  stopLab: (labId) =>
    set((state) => ({
      labs: state.labs.map((lab) =>
        lab.id === labId ? { ...lab, status: 'parado' } : lab
      ),
    })),

  setChallenges: (challenges) => set({ challenges }),

  completeChallenge: (challengeId) =>
    set((state) => {
      const challenge = state.challenges.find((c) => c.id === challengeId);
      const points = challenge?.points || 0;
      return {
        challenges: state.challenges.map((c) =>
          c.id === challengeId ? { ...c, completed: true } : c
        ),
        user: state.user
          ? { ...state.user, points: state.user.points + points }
          : null,
      };
    }),

  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));
