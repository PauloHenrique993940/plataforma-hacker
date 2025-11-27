import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Zap, Target, Trophy, Users } from "lucide-react";
import { useAppStore } from "../store";
import "../styles/dashboard.css";

export const Dashboard: React.FC = () => {
  const { user, missions, challenges } = useAppStore();
  const [recentActivity] = useState([
    { name: "Jan", missions: 12, points: 450 },
    { name: "Fev", missions: 19, points: 720 },
    { name: "Mar", missions: 15, points: 580 },
    { name: "Abr", missions: 22, points: 850 },
    { name: "Mai", missions: 25, points: 920 },
  ]);

  const difficultyData = [
    { name: "Iniciante", value: 30 },
    { name: "Intermediário", value: 25 },
    { name: "Avançado", value: 20 },
    { name: "Expert", value: 10 },
  ];

  const COLORS = ["#00ff41", "#00d4ff", "#ff0080", "#ffa500"];

  const completedMissions = missions.filter((m) => m.completed).length;
  const completedChallenges = challenges.filter((c) => c.completed).length;

  return (
    <div
      className="
        dashboard
      "
    >
      <div
        className="
          dashboard-header
        "
      >
        <h1
          className="
            page-title
          "
        >
          Dashboard
        </h1>
        <p
          className="
            page-subtitle
          "
        >
          Bem-vindo ao seu painel de controle
        </p>
      </div>

      {/* Stats Grid */}
      <div
        className="
          stats-grid
        "
      >
        <div
          className="
            stat-card
          "
        >
          <div
            className="
              stat-icon
            "
          >
            <Trophy size={32} />
          </div>
          <div
            className="
              stat-content
            "
          >
            <span
              className="
                stat-label
              "
            >
              Pontos Totais
            </span>
            <span
              className="
                stat-number glow-text
              "
            >
              {user?.points || 0}
            </span>
          </div>
        </div>

        <div
          className="
            stat-card
          "
        >
          <div
            className="
              stat-icon
            "
          >
            <Target size={32} />
          </div>
          <div
            className="
              stat-content
            "
          >
            <span
              className="
                stat-label
              "
            >
              Missões Completas
            </span>
            <span
              className="
                stat-number
              "
            >
              {completedMissions}/{missions.length}
            </span>
          </div>
        </div>

        <div
          className="
            stat-card
          "
        >
          <div
            className="
              stat-icon
            "
          >
            <Zap size={32} />
          </div>
          <div
            className="
              stat-content
            "
          >
            <span
              className="
                stat-label
              "
            >
              Desafios Vencidos
            </span>
            <span
              className="
                stat-number
              "
            >
              {completedChallenges}/{challenges.length}
            </span>
          </div>
        </div>

        <div
          className="
            stat-card
          "
        >
          <div
            className="
              stat-icon
            "
          >
            <Users size={32} />
          </div>
          <div
            className="
              stat-content
            "
          >
            <span
              className="
                stat-label
              "
            >
              Ranking
            </span>
            <span
              className="
                stat-number
              "
            >
              #{user?.rank || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div
        className="
          charts-grid
        "
      >
        {/* Progress Chart */}
        <div
          className="
            chart-card
          "
        >
          <h3
            className="
              chart-title
            "
          >
            Progresso Mensal
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={recentActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2749" />
              <XAxis dataKey="name" stroke="#a0a9b8" />
              <YAxis stroke="#a0a9b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1f3a",
                  border: "2px solid #00ff41",
                  borderRadius: "4px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="points"
                stroke="#00ff41"
                strokeWidth={2}
                dot={{ fill: "#00ff41", r: 4 }}
                activeDot={{ r: 6 }}
                name="Pontos"
              />
              <Line
                type="monotone"
                dataKey="missions"
                stroke="#00d4ff"
                strokeWidth={2}
                dot={{ fill: "#00d4ff", r: 4 }}
                activeDot={{ r: 6 }}
                name="Missões"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Difficulty Distribution */}
        <div
          className="
            chart-card
          "
        >
          <h3
            className="
              chart-title
            "
          >
            Distribuição de Dificuldade
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={difficultyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}%`}
                outerRadius={80}
                fill="#00ff41"
                dataKey="value"
              >
                {difficultyData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1f3a",
                  border: "2px solid #00ff41",
                  borderRadius: "4px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Bar Chart */}
        <div
          className="
            chart-card
          "
        >
          <h3
            className="
              chart-title
            "
          >
            Desempenho por Categoria
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={recentActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2749" />
              <XAxis dataKey="name" stroke="#a0a9b8" />
              <YAxis stroke="#a0a9b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1f3a",
                  border: "2px solid #00d4ff",
                  borderRadius: "4px",
                }}
              />
              <Bar dataKey="points" fill="#00d4ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Summary */}
        <div
          className="
            activity-card
          "
        >
          <h3
            className="
              chart-title
            "
          >
            Atividade Recente
          </h3>
          <div
            className="
              activity-list
            "
          >
            <div
              className="
                activity-item
              "
            >
              <span
                className="
                  activity-dot success
                "
              ></span>
              <div
                className="
                  activity-text
                "
              >
                <p
                  className="
                    activity-action
                  "
                >
                  Missão completada
                </p>
                <p
                  className="
                    activity-desc
                  "
                >
                  SQL Injection Avançado
                </p>
              </div>
              <span
                className="
                  activity-time
                "
              >
                há 2h
              </span>
            </div>
            <div
              className="
                activity-item
              "
            >
              <span
                className="
                  activity-dot warning
                "
              ></span>
              <div
                className="
                  activity-text
                "
              >
                <p
                  className="
                    activity-action
                  "
                >
                  Desafio iniciado
                </p>
                <p
                  className="
                    activity-desc
                  "
                >
                  Criptografia RSA
                </p>
              </div>
              <span
                className="
                  activity-time
                "
              >
                há 4h
              </span>
            </div>
            <div
              className="
                activity-item
              "
            >
              <span
                className="
                  activity-dot success
                "
              ></span>
              <div
                className="
                  activity-text
                "
              >
                <p
                  className="
                    activity-action
                  "
                >
                  Laboratório concluído
                </p>
                <p
                  className="
                    activity-desc
                  "
                >
                  Buffer Overflow
                </p>
              </div>
              <span
                className="
                  activity-time
                "
              >
                há 6h
              </span>
            </div>
            <div
              className="
                activity-item
              "
            >
              <span
                className="
                  activity-dot info
                "
              ></span>
              <div
                className="
                  activity-text
                "
              >
                <p
                  className="
                    activity-action
                  "
                >
                  Conquista desbloqueada
                </p>
                <p
                  className="
                    activity-desc
                  "
                >
                  Hacker Master Level
                </p>
              </div>
              <span
                className="
                  activity-time
                "
              >
                há 1d
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
