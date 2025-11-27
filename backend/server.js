import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db } from './db.js';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// ==================== USERS ====================
app.get('/api/users/:id', (req, res) => {
  const user = db.users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/api/users/login', (req, res) => {
  const { username } = req.body;
  let user = db.users.find((u) => u.username === username);
  if (!user) {
    user = {
      id: uuidv4(),
      username,
      email: `${username}@hacker.io`,
      points: 0,
      rank: 0,
      level: 1,
      badges: [],
      joinDate: new Date().toISOString(),
    };
    db.users.push(user);
  }
  res.json(user);
});

app.put('/api/users/:id', (req, res) => {
  const user = db.users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  Object.assign(user, req.body);
  res.json(user);
});

// ==================== MISSIONS ====================
app.get('/api/missions', (req, res) => {
  res.json(db.missions);
});

app.get('/api/missions/:id', (req, res) => {
  const mission = db.missions.find((m) => m.id === req.params.id);
  if (!mission) return res.status(404).json({ error: 'Mission not found' });
  res.json(mission);
});

app.post('/api/missions/:id/complete', (req, res) => {
  const mission = db.missions.find((m) => m.id === req.params.id);
  if (!mission) return res.status(404).json({ error: 'Mission not found' });

  mission.completed = true;
  mission.completedAt = new Date().toISOString();

  const user = db.users[0];
  if (user) {
    user.points += mission.points;
  }

  res.json({ success: true, mission, user });
});

app.post('/api/missions', (req, res) => {
  const mission = {
    id: uuidv4(),
    ...req.body,
    completed: false,
    completedAt: null,
  };
  db.missions.push(mission);
  res.status(201).json(mission);
});

// ==================== LABS ====================
app.get('/api/labs', (req, res) => {
  res.json(db.labs);
});

app.get('/api/labs/:id', (req, res) => {
  const lab = db.labs.find((l) => l.id === req.params.id);
  if (!lab) return res.status(404).json({ error: 'Lab not found' });
  res.json(lab);
});

app.post('/api/labs/:id/start', (req, res) => {
  const lab = db.labs.find((l) => l.id === req.params.id);
  if (!lab) return res.status(404).json({ error: 'Lab not found' });

  lab.status = 'rodando';
  db.activeLabs[req.params.id] = new Date().toISOString();

  res.json({ success: true, lab });
});

app.post('/api/labs/:id/stop', (req, res) => {
  const lab = db.labs.find((l) => l.id === req.params.id);
  if (!lab) return res.status(404).json({ error: 'Lab not found' });

  lab.status = 'parado';
  delete db.activeLabs[req.params.id];

  res.json({ success: true, lab });
});

app.post('/api/labs', (req, res) => {
  const lab = {
    id: uuidv4(),
    ...req.body,
    status: 'disponivel',
  };
  db.labs.push(lab);
  res.status(201).json(lab);
});

// ==================== TOOLS ====================
app.get('/api/tools', (req, res) => {
  res.json(db.tools);
});

app.get('/api/tools/:id', (req, res) => {
  const tool = db.tools.find((t) => t.id === req.params.id);
  if (!tool) return res.status(404).json({ error: 'Tool not found' });
  res.json(tool);
});

app.post('/api/tools/:id/start', (req, res) => {
  const tool = db.tools.find((t) => t.id === req.params.id);
  if (!tool) return res.status(404).json({ error: 'Tool not found' });

  if (tool.status !== 'disponivel') {
    return res.status(400).json({ error: 'Tool not available' });
  }

  db.activeTools[req.params.id] = new Date().toISOString();
  res.json({ success: true, tool, isActive: true });
});

app.post('/api/tools/:id/stop', (req, res) => {
  const tool = db.tools.find((t) => t.id === req.params.id);
  if (!tool) return res.status(404).json({ error: 'Tool not found' });

  delete db.activeTools[req.params.id];
  res.json({ success: true, tool, isActive: false });
});

app.get('/api/tools/:id/status', (req, res) => {
  const isActive = !!db.activeTools[req.params.id];
  res.json({ isActive });
});

// Tool Execution
app.post('/api/tools/:id/execute', (req, res) => {
  const tool = db.tools.find((t) => t.id === req.params.id);
  if (!tool) return res.status(404).json({ error: 'Tool not found' });
  if (tool.status !== 'disponivel') {
    return res.status(400).json({ error: 'Tool not available' });
  }

  const { parameters } = req.body;

  // Simulação de execução
  const executionId = uuidv4();
  const startTime = new Date();

  let output = tool.output;
  if (parameters && parameters.length > 0) {
    output = `Executando: ${tool.name} ${parameters.join(' ')}\n\n${
      tool.output
    }\n\n[*] Scan completo com parâmetros: ${parameters.join(', ')}`;
  }

  const execution = {
    id: executionId,
    toolId: tool.id,
    toolName: tool.name,
    startTime: startTime.toISOString(),
    endTime: new Date(Date.now() + Math.random() * 5000).toISOString(),
    parameters: parameters || [],
    output: output,
    success: true,
    exitCode: 0,
  };

  if (!db.toolExecutions) {
    db.toolExecutions = [];
  }
  db.toolExecutions.push(execution);

  res.json(execution);
});

app.get('/api/tools/:id/executions', (req, res) => {
  if (!db.toolExecutions) {
    db.toolExecutions = [];
  }
  const executions = db.toolExecutions.filter(
    (e) => e.toolId === req.params.id
  );
  res.json(
    executions.sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
  );
});

app.get('/api/tools/:id/documentation', (req, res) => {
  const tool = db.tools.find((t) => t.id === req.params.id);
  if (!tool) return res.status(404).json({ error: 'Tool not found' });
  res.json({
    id: tool.id,
    name: tool.name,
    description: tool.description,
    fullDescription: tool.fullDescription,
    usage: tool.usage,
    output: tool.output,
    tips: tool.tips,
    category: tool.category,
  });
});

// ==================== CHALLENGES ====================
app.get('/api/challenges', (req, res) => {
  res.json(db.challenges);
});

app.get('/api/challenges/:id', (req, res) => {
  const challenge = db.challenges.find((c) => c.id === req.params.id);
  if (!challenge) return res.status(404).json({ error: 'Challenge not found' });
  res.json(challenge);
});

app.post('/api/challenges/:id/complete', (req, res) => {
  const challenge = db.challenges.find((c) => c.id === req.params.id);
  if (!challenge) return res.status(404).json({ error: 'Challenge not found' });

  challenge.completed = true;

  const user = db.users[0];
  if (user) {
    user.points += challenge.points;
  }

  res.json({ success: true, challenge, user });
});

app.post('/api/challenges', (req, res) => {
  const challenge = {
    id: uuidv4(),
    ...req.body,
    completed: false,
  };
  db.challenges.push(challenge);
  res.status(201).json(challenge);
});

// ==================== RANKING ====================
app.get('/api/ranking', (req, res) => {
  const ranking = db.users
    .sort((a, b) => b.points - a.points)
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));
  res.json(ranking);
});

// ==================== STATS ====================
app.get('/api/stats', (req, res) => {
  const user = db.users[0];
  const completedMissions = db.missions.filter((m) => m.completed).length;
  const completedChallenges = db.challenges.filter((c) => c.completed).length;
  const totalMissions = db.missions.length;
  const totalChallenges = db.challenges.length;

  res.json({
    user,
    completedMissions,
    totalMissions,
    completedChallenges,
    totalChallenges,
    activeLabs: Object.keys(db.activeLabs).length,
    activeTools: Object.keys(db.activeTools).length,
  });
});

// ==================== ERROR HANDLING ====================
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: 'Internal server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
});
