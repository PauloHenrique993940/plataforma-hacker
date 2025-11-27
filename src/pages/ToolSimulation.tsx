import React, { useState, useEffect } from "react";
import { Terminal, Copy, Check, X, Minimize2, Maximize2 } from "lucide-react";
import "../styles/simulation.css";

interface SimulationProps {
  tool: {
    id: string;
    name: string;
    usage: string;
    output: string;
  };
  isOpen: boolean;
  onClose: () => void;
  parameters: string;
  onOpenScanner?: (rawOutput: string) => void;
}

export const ToolSimulation: React.FC<SimulationProps> = ({
  tool,
  isOpen,
  onClose,
  parameters,
  onOpenScanner,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [copied, setCopied] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isExecuting, setIsExecuting] = useState(true);
  const [executionTime, setExecutionTime] = useState(0);

  // Simula a digitação gradual do comando
  useEffect(() => {
    if (!isOpen || !isExecuting) return;

    const command = `$ ${tool.name.toLowerCase()} ${parameters || tool.usage}\n`;
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < command.length) {
        setDisplayText((prev) => prev + command[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        // Aguarda um pouco antes de mostrar output
        setTimeout(() => {
          setDisplayText((prev) => prev + "\n" + tool.output);
          setIsExecuting(false);
        }, 500);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [isOpen, tool, parameters, isExecuting]);

  // Contador de tempo
  useEffect(() => {
    if (!isExecuting) return;

    const timer = setInterval(() => {
      setExecutionTime((t) => t + 0.1);
    }, 100);

    return () => clearInterval(timer);
  }, [isExecuting]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetSimulation = () => {
    setDisplayText("");
    setIsExecuting(true);
    setExecutionTime(0);
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        simulation-overlay
      "
    >
      <div
        className={`
          simulation-container
          ${isMinimized ? "minimized" : ""}
        `}
      >
        {/* Header */}
        <div
          className="
            simulation-header
          "
        >
          <div
            className="
              header-title
            "
          >
            <Terminal size={18} />
            <span>{tool.name} - Terminal Simulado</span>
          </div>
          <div
            className="
              header-controls
            "
          >
            <span
              className="
                execution-time
              "
            >
              {isExecuting ? "Executando..." : `${executionTime.toFixed(1)}s`}
            </span>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? "Expandir" : "Minimizar"}
              className="
                header-btn
              "
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>
            <button
              onClick={onClose}
              title="Fechar"
              className="
                header-btn close-btn
              "
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Terminal Output */}
            <div
              className="
                simulation-terminal
              "
            >
              <pre
                className="
                  terminal-output
                "
              >
                <code>{displayText}</code>
                {isExecuting && (
                  <span
                    className="
                      cursor
                    "
                  >
                    ▌
                  </span>
                )}
              </pre>
            </div>

            {/* Control Bar */}
            <div
              className="
                simulation-controls
              "
            >
              <div
                className="
                  control-info
                "
              >
                <span
                  className="
                    tool-info
                  "
                >
                  Ferramenta: <strong>{tool.name}</strong>
                </span>
                <span
                  className="
                    param-info
                  "
                >
                  Parâmetros: <strong>{parameters || tool.usage}</strong>
                </span>
              </div>
              <div
                className="
                  control-buttons
                "
              >
                <button
                  onClick={copyToClipboard}
                  title="Copiar saída"
                  className="
                    btn-control
                  "
                >
                  {copied ? (
                    <>
                      <Check size={14} /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copiar
                    </>
                  )}
                </button>
                <button
                  onClick={resetSimulation}
                  disabled={isExecuting}
                  className="
                    btn-control
                  "
                >
                  Executar Novamente
                </button>
                <button
                  onClick={() => {
                    if (!isExecuting && onOpenScanner)
                      onOpenScanner(displayText);
                  }}
                  disabled={isExecuting}
                  title="Abrir no Scanner"
                  className="
                    btn-control
                  "
                >
                  Abrir no Scanner
                </button>
                <button
                  onClick={onClose}
                  className="
                    btn-control close
                  "
                >
                  Fechar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
