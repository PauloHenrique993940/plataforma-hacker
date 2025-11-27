import React from "react";
import "../styles/tool-scanner.css";

export const WebScanner: React.FC<{
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
          <h2>{toolName} - Web Scanner</h2>
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
          <p>
            Simulador de testes web. Visualizador de requisição/resposta e
            payloads.
          </p>

          <div
            className="
              results-section
            "
          >
            <h3>Findings (simulados)</h3>
            <div
              className="
                hosts-table
              "
            >
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Path</th>
                    <th>Severity</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SQLi</td>
                    <td>/products?id=1</td>
                    <td>Alta</td>
                    <td>Possível injeção SQL detectada</td>
                  </tr>
                  <tr>
                    <td>XSS</td>
                    <td>/search?q=test</td>
                    <td>Média</td>
                    <td>Reflected XSS</td>
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
