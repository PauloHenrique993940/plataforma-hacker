import React, { useState, useRef, useEffect } from "react";
import { X, RefreshCw, Download } from "lucide-react";
import "../styles/tool-scanner.css";

interface Host {
  ip: string;
  port: string;
  service: string;
  version: string;
  status: string;
}

export const NetworkScanner: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  rawOutput?: string | null;
}> = ({ isOpen, onClose, toolName, rawOutput = null }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hosts, setHosts] = useState<Host[]>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "raw">(
    rawOutput ? "raw" : "overview",
  );

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.setProperty(
        "--progress-width",
        `${Math.min(progress, 100)}%`,
      );
    }
  }, [progress]);

  const startScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setProgress(0);
    setHosts([]);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, Math.round(prev + Math.random() * 25));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setHosts([
              {
                ip: "192.168.1.10",
                port: "22",
                service: "SSH",
                version: "OpenSSH 7.4",
                status: "open",
              },
              {
                ip: "192.168.1.10",
                port: "80",
                service: "HTTP",
                version: "Apache 2.4.6",
                status: "open",
              },
              {
                ip: "192.168.1.11",
                port: "443",
                service: "HTTPS",
                version: "nginx 1.14",
                status: "open",
              },
              {
                ip: "192.168.1.12",
                port: "3306",
                service: "MySQL",
                version: "5.7.32",
                status: "open",
              },
            ]);
            setIsScanning(false);
          }, 300);
        }
        return next;
      });
    }, 300);
  };

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
          <h2>{toolName} - Network Scanner</h2>
          <button
            onClick={onClose}
            title="Close"
            className="
              scanner-close
            "
          >
            <X size={20} />
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
            <label>Target Network:</label>
            <div
              className="
                input-group
              "
            >
              <input
                type="text"
                placeholder="192.168.1.0/24"
                defaultValue="192.168.1.0/24"
                className="
                  scan-input
                "
              />
              <button
                onClick={startScan}
                disabled={isScanning}
                className="
                  btn-scan
                "
              >
                {isScanning ? "Scanning..." : "Start Scan"}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div
            className="
              scanner-tabs
            "
          >
            <button
              onClick={() => setActiveTab("overview")}
              className={`
                tab-btn
                ${activeTab === "overview" ? "active" : ""}
              `}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("raw")}
              disabled={!rawOutput}
              className={`
                tab-btn
                ${activeTab === "raw" ? "active" : ""}
              `}
            >
              Raw Output
            </button>
          </div>

          {isScanning && activeTab === "overview" && (
            <div
              className="
                progress-section
              "
            >
              <div
                ref={progressRef}
                className="
                  progress-bar
                "
              >
                <div
                  className="
                    progress-fill
                  "
                />
              </div>
              <span
                className="
                  progress-text
                "
              >
                {Math.floor(progress)}%
              </span>
            </div>
          )}

          {activeTab === "overview" && hosts.length > 0 && (
            <div
              className="
                results-section
              "
            >
              <h3>Hosts Found: {hosts.length}</h3>
              <div
                className="
                  hosts-table
                "
              >
                <table>
                  <thead>
                    <tr>
                      <th>IP</th>
                      <th>Port</th>
                      <th>Service</th>
                      <th>Version</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hosts.map((host, idx) => (
                      <tr key={idx}>
                        <td
                          className="
                            ip-addr
                          "
                        >
                          {host.ip}
                        </td>
                        <td>{host.port}</td>
                        <td>{host.service}</td>
                        <td
                          className="
                            version
                          "
                        >
                          {host.version}
                        </td>
                        <td>
                          <span
                            className={`
                              status status-${host.status}
                            `}
                          >
                            {host.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className="
                  export-section
                "
              >
                <button
                  className="
                    btn-export
                  "
                >
                  <Download size={16} /> CSV
                </button>
                <button
                  className="
                    btn-export
                  "
                >
                  <Download size={16} /> JSON
                </button>
              </div>
            </div>
          )}

          {activeTab === "overview" && hosts.length > 0 && !isScanning && (
            <div
              className="
                stats-section
              "
            >
              <div
                className="
                  stat-box
                "
              >
                <span
                  className="
                    stat-label
                  "
                >
                  Hosts
                </span>
                <span
                  className="
                    stat-value
                  "
                >
                  {hosts.length}
                </span>
              </div>
              <div
                className="
                  stat-box
                "
              >
                <span
                  className="
                    stat-label
                  "
                >
                  Ports
                </span>
                <span
                  className="
                    stat-value
                  "
                >
                  {hosts.length * 4}
                </span>
              </div>
              <div
                className="
                  stat-box
                "
              >
                <span
                  className="
                    stat-label
                  "
                >
                  Services
                </span>
                <span
                  className="
                    stat-value
                  "
                >
                  4
                </span>
              </div>
            </div>
          )}

          {/* Raw output panel */}
          {activeTab === "raw" && (
            <div
              className="
                raw-output-section
              "
            >
              <div
                className="
                  raw-output-header
                "
              >
                <h3>Raw Output</h3>
                <div
                  className="
                    raw-actions
                  "
                >
                  <button
                    onClick={() => {
                      if (rawOutput) navigator.clipboard.writeText(rawOutput);
                    }}
                    className="
                      btn-export
                    "
                  >
                    Copy
                  </button>
                </div>
              </div>
              <pre
                className="
                  raw-output-text
                "
              >
                {rawOutput || "Sem saída disponível."}
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
            Close
          </button>
          {hosts.length > 0 && (
            <button
              onClick={startScan}
              className="
                btn-rescan
              "
            >
              <RefreshCw size={16} /> Rescan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
