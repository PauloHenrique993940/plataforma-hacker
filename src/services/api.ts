import axios from 'axios';
import type { User, Mission, Lab, Tool, Challenge } from '../types';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// ==================== USERS ====================
export const userAPI = {
  getUser: (id: string) => api.get<User>(`/users/${id}`),
  login: (username: string) => api.post<User>('/users/login', { username }),
  updateUser: (id: string, data: Partial<User>) =>
    api.put<User>(`/users/${id}`, data),
};

// ==================== MISSIONS ====================
export const missionsAPI = {
  getAll: () => api.get<Mission[]>('/missions'),
  getById: (id: string) => api.get<Mission>(`/missions/${id}`),
  create: (mission: Omit<Mission, 'id'>) =>
    api.post<Mission>('/missions', mission),
  complete: (id: string) => api.post(`/missions/${id}/complete`),
};

// ==================== LABS ====================
export const labsAPI = {
  getAll: () => api.get<Lab[]>('/labs'),
  getById: (id: string) => api.get<Lab>(`/labs/${id}`),
  create: (lab: Omit<Lab, 'id'>) => api.post<Lab>('/labs', lab),
  start: (id: string) => api.post(`/labs/${id}/start`),
  stop: (id: string) => api.post(`/labs/${id}/stop`),
};

// ==================== TOOLS ====================
export const toolsAPI = {
  getAll: () => api.get<Tool[]>('/tools'),
  getById: (id: string) => api.get<Tool>(`/tools/${id}`),
  start: (id: string) => api.post(`/tools/${id}/start`),
  stop: (id: string) => api.post(`/tools/${id}/stop`),
  getStatus: (id: string) =>
    api.get<{ isActive: boolean }>(`/tools/${id}/status`),
};

// ==================== CHALLENGES ====================
export const challengesAPI = {
  getAll: () => api.get<Challenge[]>('/challenges'),
  getById: (id: string) => api.get<Challenge>(`/challenges/${id}`),
  create: (challenge: Omit<Challenge, 'id'>) =>
    api.post<Challenge>('/challenges', challenge),
  complete: (id: string) => api.post(`/challenges/${id}/complete`),
};

// ==================== RANKING ====================
export const rankingAPI = {
  getAll: () => api.get<User[]>('/ranking'),
};

// ==================== STATS ====================
export const statsAPI = {
  getStats: () => api.get('/stats'),
};

export default api;
