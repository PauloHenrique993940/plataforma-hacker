import React, { useState } from "react";
import { Target, Zap, Lock, Trophy } from "lucide-react";
import { useAppStore } from "../store";
import type { Mission } from "../types";
import "../styles/missions.css";

export const Missions: React.FC = () => {
  const { missions, completeMission } = useAppStore();
  const [filter, setFilter] = useState<string>("all");
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const difficultyColors = {
    iniciante: "badge-success",
    intermediario: "badge-info",
    avancado: "badge-warning",
    expert: "badge-danger",
  };

  const filteredMissions = missions.filter((m) => {
    if (filter === "completed") return m.completed;
    if (filter === "pending") return !m.completed;
    return true;
  });

  const handleCompleteMission = (id: string) => {
    completeMission(id);
    setSelectedMission(null);
  };

  return (
    <div
      className="
        missions-container
      "
    >
      <div
        className="
          missions-header
        "
      >
        <h1
          className="
            page-title
          "
        >
          Missões
        </h1>
        <p
          className="
            page-subtitle
          "
        >
          Complete desafios e ganhe pontos
        </p>
      </div>

      {/* Filter Tabs */}
      <div
        className="
          filter-tabs
        "
      >
        <button
          onClick={() => setFilter("all")}
          className={`
            tab-button
            ${filter === "all" ? "active" : ""}
          `}
        >
          <Target size={18} />
          Todas
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`
            tab-button
            ${filter === "pending" ? "active" : ""}
          `}
        >
          <Lock size={18} />
          Pendentes ({missions.filter((m) => !m.completed).length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`
            tab-button
            ${filter === "completed" ? "active" : ""}
          `}
        >
          <Trophy size={18} />
          Concluídas ({missions.filter((m) => m.completed).length})
        </button>
      </div>

      {/* Missions Grid */}
      <div
        className="
          missions-grid
        "
      >
        {filteredMissions.map((mission) => (
          <div
            key={mission.id}
            onClick={() => setSelectedMission(mission)}
            className={`
              mission-card
              ${mission.completed ? "completed" : ""}
            `}
          >
            <div
              className="
                mission-header
              "
            >
              <h3
                className="
                  mission-title
                "
              >
                {mission.title}
              </h3>
              <span
                className={`
                  badge ${difficultyColors[mission.difficulty]}
                `}
              >
                {mission.difficulty}
              </span>
            </div>
            <p
              className="
                mission-description
              "
            >
              {mission.description}
            </p>

            <div
              className="
                mission-footer
              "
            >
              <div
                className="
                  mission-category
                "
              >
                {mission.category.toUpperCase()}
              </div>
              <div
                className="
                  mission-points
                "
              >
                <Zap size={16} />
                {mission.points}
              </div>
            </div>

            {mission.completed && (
              <div
                className="
                  mission-completed-badge
                "
              >
                <Trophy size={24} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mission Modal */}
      {selectedMission && (
        <div
          onClick={() => setSelectedMission(null)}
          className="
            modal-overlay
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              mission-modal
            "
          >
            <div
              className="
                modal-header
              "
            >
              <h2
                className="
                  mission-title-large
                "
              >
                {selectedMission.title}
              </h2>
              <button
                onClick={() => setSelectedMission(null)}
                title="Fechar"
                className="
                  modal-close
                "
              >
                ✕
              </button>
            </div>

            <div
              className="
                modal-body
              "
            >
              <div
                className="
                  mission-info-grid
                "
              >
                <div
                  className="
                    info-box
                  "
                >
                  <span
                    className="
                      info-label
                    "
                  >
                    Dificuldade
                  </span>
                  <span
                    className={`
                      badge ${difficultyColors[selectedMission.difficulty]}
                    `}
                  >
                    {selectedMission.difficulty}
                  </span>
                </div>
                <div
                  className="
                    info-box
                  "
                >
                  <span
                    className="
                      info-label
                    "
                  >
                    Categoria
                  </span>
                  <span
                    className="
                      info-value
                    "
                  >
                    {selectedMission.category}
                  </span>
                </div>
                <div
                  className="
                    info-box
                  "
                >
                  <span
                    className="
                      info-label
                    "
                  >
                    Pontos
                  </span>
                  <span
                    className="
                      info-value glow-text
                    "
                  >
                    {selectedMission.points}
                  </span>
                </div>
              </div>

              <div
                className="
                  instructions-box
                "
              >
                <h3
                  className="
                    box-title
                  "
                >
                  Instruções
                </h3>
                <pre
                  className="
                    instructions-text
                  "
                >
                  {selectedMission.instructions}
                </pre>
              </div>

              {selectedMission.completed && (
                <div
                  className="
                    completion-box success
                  "
                >
                  <Trophy size={24} />
                  <span>Missão concluída com sucesso!</span>
                </div>
              )}
            </div>

            <div
              className="
                modal-footer
              "
            >
              <button
                onClick={() => setSelectedMission(null)}
                className="
                  btn-secondary
                "
              >
                Fechar
              </button>
              {!selectedMission.completed && (
                <button
                  onClick={() => handleCompleteMission(selectedMission.id)}
                  className="
                    btn-primary
                  "
                >
                  Verificar Flag
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
