import React, { useState } from "react";
import { Play, Pause, Zap } from "lucide-react";
import { useAppStore } from "../store";
import type { Lab } from "../types";
import "../styles/labs.css";

export const Labs: React.FC = () => {
  const { labs, startLab, stopLab } = useAppStore();
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);

  const handleStartStop = (labId: string, currentStatus: string) => {
    if (currentStatus === "parado") {
      startLab(labId);
    } else if (currentStatus === "rodando") {
      stopLab(labId);
    }
  };

  return (
    <div
      className="
        labs-container
      "
    >
      <div
        className="
          labs-header
        "
      >
        <h1
          className="
            page-title
          "
        >
          Laboratórios
        </h1>
        <p
          className="
            page-subtitle
          "
        >
          Máquinas vulneráveis para praticar
        </p>
      </div>

      <div
        className="
          labs-grid
        "
      >
        {labs.map((lab) => (
          <div
            key={lab.id}
            onClick={() => setSelectedLab(lab)}
            className={`
              lab-card ${lab.status}
            `}
          >
            <div
              className="
                lab-status-badge
              "
            >
              {lab.status}
            </div>

            <h3
              className="
                lab-name
              "
            >
              {lab.name}
            </h3>
            <p
              className="
                lab-description
              "
            >
              {lab.description}
            </p>

            <div
              className="
                lab-meta
              "
            >
              <span
                className={`
                  badge badge-${lab.difficulty}
                `}
              >
                {lab.difficulty}
              </span>
              <span
                className="
                  lab-category
                "
              >
                {lab.category}
              </span>
            </div>

            <div
              className="
                lab-ip
              "
            >
              <span
                className="
                  ip-label
                "
              >
                IP:
              </span>
              <code
                className="
                  ip-value
                "
              >
                {lab.machineIP}
              </code>
            </div>

            <div
              className="
                lab-actions
              "
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartStop(lab.id, lab.status);
                }}
                title={lab.status === "rodando" ? "Parar" : "Iniciar"}
                className={`
                  lab-button
                  ${lab.status === "rodando" ? "stop" : "start"}
                `}
              >
                {lab.status === "rodando" ? (
                  <>
                    <Pause size={16} /> Parar
                  </>
                ) : (
                  <>
                    <Play size={16} /> Iniciar
                  </>
                )}
              </button>
            </div>

            {lab.status === "rodando" && (
              <div
                className="
                  lab-running-indicator
                "
              >
                <Zap size={20} />
                Rodando
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lab Details Modal */}
      {selectedLab && (
        <div
          onClick={() => setSelectedLab(null)}
          className="
            modal-overlay
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              lab-modal
            "
          >
            <div
              className="
                modal-header
              "
            >
              <h2>{selectedLab.name}</h2>
              <button
                onClick={() => setSelectedLab(null)}
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
              <p
                className="
                  lab-full-description
                "
              >
                {selectedLab.description}
              </p>

              <div
                className="
                  lab-info-section
                "
              >
                <h3>Informações</h3>
                <div
                  className="
                    info-grid
                  "
                >
                  <div
                    className="
                      info-box
                    "
                  >
                    <span
                      className="
                        label
                      "
                    >
                      Dificuldade
                    </span>
                    <span
                      className={`
                        badge badge-${selectedLab.difficulty}
                      `}
                    >
                      {selectedLab.difficulty}
                    </span>
                  </div>
                  <div
                    className="
                      info-box
                    "
                  >
                    <span
                      className="
                        label
                      "
                    >
                      Categoria
                    </span>
                    <span
                      className="
                        value
                      "
                    >
                      {selectedLab.category}
                    </span>
                  </div>
                  <div
                    className="
                      info-box
                    "
                  >
                    <span
                      className="
                        label
                      "
                    >
                      IP da Máquina
                    </span>
                    <code
                      className="
                        value
                      "
                    >
                      {selectedLab.machineIP}
                    </code>
                  </div>
                  <div
                    className="
                      info-box
                    "
                  >
                    <span
                      className="
                        label
                      "
                    >
                      Status
                    </span>
                    <span
                      className="
                        value
                      "
                    >
                      {selectedLab.status}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="
                  lab-section
                "
              >
                <h3>Objetivo</h3>
                <p>{selectedLab.objective}</p>
              </div>

              <div
                className="
                  lab-section
                "
              >
                <h3>Vulnerabilidades</h3>
                <ul
                  className="
                    vuln-list
                  "
                >
                  {selectedLab.vulnerabilities.map((vuln, idx) => (
                    <li key={idx}>{vuln}</li>
                  ))}
                </ul>
              </div>

              <div
                className="
                  lab-section
                "
              >
                <h3>Dicas</h3>
                <ol
                  className="
                    hints-list
                  "
                >
                  {selectedLab.hints.map((hint, idx) => (
                    <li key={idx}>{hint}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div
              className="
                modal-footer
              "
            >
              <button
                onClick={() => setSelectedLab(null)}
                className="
                  btn-secondary
                "
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  handleStartStop(selectedLab.id, selectedLab.status);
                }}
                className={`
                  btn-primary
                  ${selectedLab.status === "rodando" ? "stop" : ""}
                `}
              >
                {selectedLab.status === "rodando" ? "Parar Lab" : "Iniciar Lab"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
