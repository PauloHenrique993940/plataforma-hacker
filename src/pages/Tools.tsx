import React, { useState, useEffect } from "react";
import {
  Zap,
  Play,
  Pause,
  AlertCircle,
  FileText,
  Terminal,
  Copy,
  Check,
} from "lucide-react";
import { ToolSimulation } from "./ToolSimulation";
import { NetworkScanner } from "./NetworkScanner";
import { WebScanner } from "./WebScanner";
import "../styles/tools.css";
import type { Tool } from "../types";

interface ToolExecution {
  id: string;
  toolId: string;
  toolName: string;
  startTime: string;
  endTime: string;
  parameters: string[];
  output: string;
  success: boolean;
  exitCode: number;
}

export const Tools: React.FC = () => {
  const [tools] = useState<Tool[]>([
    {
      id: "1",
      name: "Nmap",
      description: "Ferramenta de reconhecimento e mapeamento de rede",
      category: "recon",
      status: "disponivel",
    },
    {
      id: "2",
      name: "Nessus",
      description: "Verificador de vulnerabilidades completo",
      category: "scan",
      status: "disponivel",
    },
    {
      id: "3",
      name: "Burp Suite",
      description: "Plataforma de teste de segurança web",
      category: "web",
      status: "disponivel",
    },
    {
      id: "4",
      name: "Metasploit Framework",
      description: "Framework para exploração e testes de penetração",
      category: "exploit",
      status: "disponivel",
    },
    {
      id: "5",
      name: "SQLMap",
      description: "Ferramenta de exploração de SQL Injection",
      category: "web",
      status: "disponivel",
    },
    {
      id: "6",
      name: "Wireshark",
      description: "Analisador de tráfego de rede",
      category: "recon",
      status: "em_manutencao",
    },
    {
      id: "7",
      name: "John the Ripper",
      description: "Ferramenta de quebra de senhas",
      category: "post-exploit",
      status: "disponivel",
    },
    {
      id: "8",
      name: "Hydra",
      description: "Ferramenta de força bruta para serviços de rede",
      category: "exploit",
      status: "disponivel",
    },
    {
      id: "9",
      name: "OpenVAS",
      description: "Scanner de vulnerabilidades de código aberto",
      category: "scan",
      status: "disponivel",
    },
    {
      id: "10",
      name: "OWASP ZAP",
      description: "Scanner de segurança web de código aberto",
      category: "web",
      status: "disponivel",
    },
    {
      id: "11",
      name: "Nikto",
      description: "Scanner web de linha de comando",
      category: "web",
      status: "indisponivel",
    },
    {
      id: "12",
      name: "Ghidra",
      description: "Ferramenta de engenharia reversa",
      category: "post-exploit",
      status: "disponivel",
    },
  ]);

  const [activeTools, setActiveTools] = useState<Set<string>>(new Set());
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [executions, setExecutions] = useState<ToolExecution[]>([]);
  const [executingTool, setExecutingTool] = useState<string | null>(null);
  const [parameters, setParameters] = useState<string>("");
  const [showOutput, setShowOutput] = useState<boolean>(false);
  const [currentExecution, setCurrentExecution] =
    useState<ToolExecution | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [simulationOpen, setSimulationOpen] = useState<boolean>(false);
  const [simulationTool, setSimulationTool] = useState<any>(null);
  const [scannerOpen, setScannerOpen] = useState<boolean>(false);
  const [scannerTool, setScannerTool] = useState<any>(null);
  const [scannerRawOutput, setScannerRawOutput] = useState<string | null>(null);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      recon: "#00ff41",
      scan: "#00d4ff",
      exploit: "#ff0080",
      web: "#ffa500",
      "post-exploit": "#00d4ff",
    };
    return colors[category] || "#00ff41";
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      disponivel: { label: "Disponível", className: "badge-success" },
      indisponivel: { label: "Indisponível", className: "badge-danger" },
      em_manutencao: { label: "Manutenção", className: "badge-warning" },
    };
    return statusMap[status] || statusMap.disponivel;
  };

  const toggleTool = (toolId: string, status: string) => {
    if (status !== "disponivel") return;
    const newActive = new Set(activeTools);
    if (newActive.has(toolId)) {
      newActive.delete(toolId);
    } else {
      newActive.add(toolId);
    }
    setActiveTools(newActive);
  };

  const handleStart = (tool: Tool) => {
    if (tool.status !== "disponivel") return;
    // Execute the tool via API and show simulation (keeps expected 'código' output)
    // This ensures Nmap shows its textual output in the simulator instead of a blank scanner overlay.
    executeTool(tool);
  };

  const executeTool = async (tool: Tool) => {
    if (tool.status !== "disponivel") return;

    setExecutingTool(tool.id);
    const params = parameters.split(" ").filter((p) => p.trim() !== "");

    try {
      const response = await fetch(
        `http://localhost:3001/api/tools/${tool.id}/execute`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ parameters: params }),
        },
      );

      if (response.ok) {
        const execution = await response.json();
        setExecutions([execution, ...executions]);
        setCurrentExecution(execution);

        // Mantém a ferramenta ativa
        const newActive = new Set(activeTools);
        newActive.add(tool.id);
        setActiveTools(newActive);

        // Show textual output in the simulator for all tools (including recon)
        setSimulationTool({
          id: tool.id,
          name: tool.name,
          category: tool.category,
          usage: (tool as any).usage || "ferramenta",
          output: execution.output,
        });
        setSimulationOpen(true);
      }
    } catch (error) {
      console.error("Erro ao executar ferramenta:", error);
    } finally {
      setExecutingTool(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredTools = {
    recon: tools.filter((t) => t.category === "recon"),
    scan: tools.filter((t) => t.category === "scan"),
    exploit: tools.filter((t) => t.category === "exploit"),
    web: tools.filter((t) => t.category === "web"),
    "post-exploit": tools.filter((t) => t.category === "post-exploit"),
  };

  return (
    <div
      className="
        tools-container
      "
    >
      <div
        className="
          tools-header
        "
      >
        <h1
          className="
            page-title
          "
        >
          Ferramentas
        </h1>
        <p
          className="
            page-subtitle
          "
        >
          Ferramentas essenciais para pentest e segurança
        </p>
      </div>

      {/* Tools by Category */}
      {Object.entries(filteredTools).map(([category, categoryTools]) => (
        <div
          key={category}
          className="
            tools-section
          "
        >
          <h2
            className="
              section-title
            "
          >
            <Zap size={24} style={{ color: getCategoryColor(category) }} />
            {category === "recon" && "Reconhecimento"}
            {category === "scan" && "Varredura"}
            {category === "exploit" && "Exploração"}
            {category === "web" && "Testes Web"}
            {category === "post-exploit" && "Pós-Exploração"}
          </h2>

          <div
            className="
              tools-grid
            "
          >
            {categoryTools.map((tool) => {
              const statusInfo = getStatusBadge(tool.status);
              const isActive = activeTools.has(tool.id);

              return (
                <div
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className={`
                    tool-card
                    ${isActive ? "active" : ""}
                  `}
                >
                  <div
                    className="
                      tool-header
                    "
                  >
                    <h3
                      className="
                        tool-name
                      "
                    >
                      {tool.name}
                    </h3>
                    <span
                      className={`
                        badge ${statusInfo.className}
                      `}
                    >
                      {statusInfo.label}
                    </span>
                  </div>

                  <p
                    className="
                      tool-description
                    "
                  >
                    {tool.description}
                  </p>

                  <div
                    className="
                      tool-footer
                    "
                  >
                    {tool.status === "disponivel" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStart(tool);
                        }}
                        title={isActive ? "Parar" : "Iniciar"}
                        className={`
                          tool-button
                          ${isActive ? "active" : ""}
                        `}
                      >
                        {isActive ? (
                          <>
                            <Pause size={16} /> Parar
                          </>
                        ) : (
                          <>
                            <Play size={16} /> Iniciar
                          </>
                        )}
                      </button>
                    )}

                    {tool.status !== "disponivel" && (
                      <button
                        disabled
                        title="Não disponível"
                        className="
                          tool-button disabled
                        "
                      >
                        <AlertCircle size={16} /> Indisponível
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTool(tool);
                      }}
                      title="Detalhes"
                      className="
                        tool-info-button
                      "
                    >
                      <FileText size={16} />
                    </button>
                  </div>

                  {isActive && (
                    <div
                      className="
                        tool-running-indicator
                      "
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Tool Execution Modal */}
      {selectedTool && (
        <div
          onClick={() => {
            setSelectedTool(null);
            setShowOutput(false);
            setParameters("");
          }}
          className="
            modal-overlay
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              tool-modal large
            "
          >
            <div
              className="
                modal-header
              "
            >
              <h2>{selectedTool.name}</h2>
              <button
                onClick={() => {
                  setSelectedTool(null);
                  setShowOutput(false);
                  setParameters("");
                }}
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
              {!showOutput ? (
                <>
                  <p
                    className="
                      tool-full-description
                    "
                  >
                    {selectedTool.description}
                  </p>

                  <div
                    className="
                      tool-details
                    "
                  >
                    <div
                      className="
                        detail-item
                      "
                    >
                      <span
                        className="
                          detail-label
                        "
                      >
                        Categoria:
                      </span>
                      <span
                        className={`
                          detail-value category-${selectedTool.category}
                        `}
                      >
                        {selectedTool.category}
                      </span>
                    </div>
                    <div
                      className="
                        detail-item
                      "
                    >
                      <span
                        className="
                          detail-label
                        "
                      >
                        Status:
                      </span>
                      <span
                        className={`
                          badge ${getStatusBadge(selectedTool.status).className}
                        `}
                      >
                        {getStatusBadge(selectedTool.status).label}
                      </span>
                    </div>
                  </div>

                  {/* Full Description */}
                  {(selectedTool as any).fullDescription && (
                    <div
                      className="
                        info-box
                      "
                    >
                      <h3>Descrição Completa:</h3>
                      <p>{(selectedTool as any).fullDescription}</p>
                    </div>
                  )}

                  {/* Usage Example */}
                  {(selectedTool as any).usage && (
                    <div
                      className="
                        usage-box
                      "
                    >
                      <h3>Uso Padrão:</h3>
                      <pre
                        className="
                          usage-text
                        "
                      >
                        {(selectedTool as any).usage}
                      </pre>
                    </div>
                  )}

                  {/* Tips */}
                  {(selectedTool as any).tips &&
                    (selectedTool as any).tips.length > 0 && (
                      <div
                        className="
                          tips-box
                        "
                      >
                        <h3>Dicas:</h3>
                        <ul>
                          {(selectedTool as any).tips.map(
                            (tip: string, idx: number) => (
                              <li key={idx}>{tip}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}

                  {/* Execution */}
                  {selectedTool.status === "disponivel" && (
                    <div
                      className="
                        execution-box
                      "
                    >
                      <h3>Executar Ferramenta:</h3>
                      <div
                        className="
                          input-group
                        "
                      >
                        <input
                          type="text"
                          placeholder="Parâmetros (ex: -sV -sC -p-)"
                          value={parameters}
                          onChange={(e) => setParameters(e.target.value)}
                          className="
                            parameter-input
                          "
                        />
                        <button
                          onClick={() => executeTool(selectedTool)}
                          disabled={executingTool === selectedTool.id}
                          className="
                            btn-execute
                          "
                        >
                          {executingTool === selectedTool.id ? (
                            "Executando..."
                          ) : (
                            <>
                              <Play size={16} /> Executar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Execution History */}
                  {executions.filter((e) => e.toolId === selectedTool.id)
                    .length > 0 && (
                    <div
                      className="
                        history-box
                      "
                    >
                      <h3>Histórico de Execuções:</h3>
                      <div
                        className="
                          executions-list
                        "
                      >
                        {executions
                          .filter((e) => e.toolId === selectedTool.id)
                          .slice(0, 5)
                          .map((exec) => (
                            <div
                              key={exec.id}
                              className="
                                execution-item
                              "
                            >
                              <div
                                className="
                                  exec-time
                                "
                              >
                                {new Date(exec.startTime).toLocaleTimeString()}
                              </div>
                              <div
                                className="
                                  exec-params
                                "
                              >
                                {exec.parameters.join(" ") || "sem parâmetros"}
                              </div>
                              <button
                                onClick={() => {
                                  setCurrentExecution(exec);
                                  setShowOutput(true);
                                }}
                                className="
                                  btn-view-output
                                "
                              >
                                Ver Saída
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                // Output Display
                <div
                  className="
                    output-container
                  "
                >
                  <div
                    className="
                      output-header
                    "
                  >
                    <h3>
                      <Terminal size={18} /> Saída de Execução
                    </h3>
                    <button
                      onClick={() => setShowOutput(false)}
                      className="
                        btn-back
                      "
                    >
                      ← Voltar
                    </button>
                  </div>

                  {currentExecution && (
                    <>
                      <div
                        className="
                          execution-info
                        "
                      >
                        <div
                          className="
                            info-line
                          "
                        >
                          <span
                            className="
                              label
                            "
                          >
                            Ferramenta:
                          </span>
                          <span
                            className="
                              value
                            "
                          >
                            {currentExecution.toolName}
                          </span>
                        </div>
                        <div
                          className="
                            info-line
                          "
                        >
                          <span
                            className="
                              label
                            "
                          >
                            Horário:
                          </span>
                          <span
                            className="
                              value
                            "
                          >
                            {new Date(
                              currentExecution.startTime,
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div
                          className="
                            info-line
                          "
                        >
                          <span
                            className="
                              label
                            "
                          >
                            Parâmetros:
                          </span>
                          <span
                            className="
                              value
                            "
                          >
                            {currentExecution.parameters.join(" ") || "nenhum"}
                          </span>
                        </div>
                        <div
                          className="
                            info-line
                          "
                        >
                          <span
                            className="
                              label
                            "
                          >
                            Status:
                          </span>
                          <span
                            className={`
                              status-badge
                              ${currentExecution.success ? "success" : "error"}
                            `}
                          >
                            {currentExecution.success ? "✓ Sucesso" : "✗ Erro"}
                          </span>
                        </div>
                      </div>

                      <div
                        className="
                          output-box
                        "
                      >
                        <div
                          className="
                            output-header-bar
                          "
                        >
                          <span>OUTPUT</span>
                          <button
                            onClick={() =>
                              copyToClipboard(currentExecution.output)
                            }
                            title="Copiar saída"
                            className="
                              copy-btn
                            "
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                        <pre
                          className="
                            output-text
                          "
                        >
                          {currentExecution.output}
                        </pre>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {!showOutput && (
              <div
                className="
                  modal-footer
                "
              >
                <button
                  onClick={() => {
                    setSelectedTool(null);
                    setParameters("");
                  }}
                  className="
                    btn-secondary
                  "
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tool Simulation Terminal */}
      {/* Network Scanner Modal */}
      {scannerTool && scannerTool.category === "web" ? (
        <WebScanner
          isOpen={scannerOpen}
          onClose={() => {
            setScannerOpen(false);
            setScannerRawOutput(null);
          }}
          toolName={scannerTool.name}
          rawOutput={scannerRawOutput}
        />
      ) : (
        scannerTool && (
          <NetworkScanner
            isOpen={scannerOpen}
            onClose={() => {
              setScannerOpen(false);
              setScannerRawOutput(null);
            }}
            toolName={scannerTool.name}
            rawOutput={scannerRawOutput}
          />
        )
      )}

      {simulationTool && (
        <ToolSimulation
          tool={simulationTool}
          isOpen={simulationOpen}
          onClose={() => setSimulationOpen(false)}
          parameters={parameters}
          onOpenScanner={(raw) => {
            // open scanner with current tool and raw output
            setScannerTool(simulationTool);
            setScannerRawOutput(raw);
            setScannerOpen(true);
            // close the simulator
            setSimulationOpen(false);
          }}
        />
      )}
    </div>
  );
};
