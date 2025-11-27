import React from "react";
import {
  Home,
  Zap,
  Target,
  Gauge,
  BookOpen,
  Shield,
  Users,
  BarChart3,
  Settings as SettingsIcon,
  X,
} from "lucide-react";
import "../styles/sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "missions", label: "Missões", icon: Target },
    { id: "labs", label: "Laboratórios", icon: Gauge },
    { id: "tools", label: "Ferramentas", icon: Zap },
    { id: "challenges", label: "Desafios CTF", icon: BookOpen },
    { id: "ranking", label: "Ranking", icon: BarChart3 },
    { id: "learning", label: "Aprendizado", icon: BookOpen },
    { id: "bugbounty", label: "Bug Bounty", icon: Shield },
    { id: "admin", label: "Admin", icon: Users },
  ];

  const handleNavigate = (pageId: string) => {
    onNavigate(pageId);
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`
          sidebar-overlay
          ${isOpen ? "active" : ""}
        `}
      />
      <aside
        className={`
          sidebar
          ${isOpen ? "open" : ""}
        `}
      >
        <div
          className="
            sidebar-header
          "
        >
          <h2
            className="
              sidebar-title
            "
          >
            MENU
          </h2>
          <button
            onClick={onClose}
            title="Fechar menu"
            className="
              close-button
            "
          >
            <X size={24} />
          </button>
        </div>

        <nav
          className="
            sidebar-nav
          "
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`
                  nav-item
                  ${currentPage === item.id ? "active" : ""}
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div
          className="
            sidebar-footer
          "
        >
          <button
            className="
              nav-item settings
            "
          >
            <SettingsIcon size={20} />
            <span>Configurações</span>
          </button>
        </div>
      </aside>
    </>
  );
};
