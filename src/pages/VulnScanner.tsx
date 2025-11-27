import React from "react";
import "../styles/tool-scanner.css";

export const VulnScanner: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  rawOutput?: string | null;
}> = ({ isOpen, onClose, toolName, rawOutput = null }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        scanner-overlay
      "
    >
      <div
        className="
          scanner-container
        "
      >
        <div
          className="
            scanner-header
          "
        >
          <h2>{toolName} - Vulnerability Scanner</h2>
          <button
            onClick={onClose}
            title="Close"
            className="
              scanner-close
            "
          >
            ✕
          </button>
        </div>

        <div
          className="
            scanner-content
          "
        >
          <div
            className="
              scan-section
            "
          >
            <p>
              Simulador de scanner de vulnerabilidades. Esta tela mostra
              vulnerabilidades encontradas e detalhes.
            </p>
          </div>

          <div
            className="
              results-section
            "
          >
            <h3>Vulnerabilidades (simuladas)</h3>
            <div
              className="
                hosts-table
              "
            >
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Severidade</th>
                    <th>CVSS</th>
                    <th>Recomendação</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>C-2025-001</td>
                    <td>Apache CVE-2020-1234</td>
                    <td>Alta</td>
                    <td>9.1</td>
                    <td>Atualizar Apache</td>
                  </tr>
                  <tr>
                    <td>C-2025-002</td>
                    <td>MySQL Weak Auth</td>
                    <td>Média</td>
                    <td>6.2</td>
                    <td>Reconfigurar autenticação</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {rawOutput && (
            <div
              className="
                raw-output-section
              "
            >
              <h4>Raw Output</h4>
              <pre
                className="
                  raw-output-text
                "
              >
                {rawOutput}
              </pre>
            </div>
          )}
        </div>

        <div
          className="
            scanner-footer
          "
        >
          <button
            onClick={onClose}
            className="
              btn-close-scanner
            "
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
