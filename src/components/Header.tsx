import React from "react";
import { Menu, LogOut, User as UserIcon, Settings } from "lucide-react";
import "../styles/header.css";
import { useAppStore } from "../store";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAppStore();

  return (
    <header
      className="
        header
      "
    >
      <div
        className="
          header-left
        "
      >
        <button
          onClick={onMenuClick}
          className="
            menu-toggle
          "
        >
          <Menu size={24} />
        </button>
        <div
          className="
            logo
          "
        >
          <span
            className="
              logo-icon
            "
          >
            {"</>"}
          </span>
          <span
            className="
              logo-text
            "
          >
            HACKER LABS
          </span>
        </div>
      </div>

      <div
        className="
          header-right
        "
      >
        <div
          className="
            header-stats
          "
        >
          {user && (
            <>
              <div
                className="
                  stat-item
                "
              >
                <span
                  className="
                    stat-label
                  "
                >
                  Level
                </span>
                <span
                  className="
                    stat-value
                  "
                >
                  {user.level}
                </span>
              </div>
              <div
                className="
                  stat-item
                "
              >
                <span
                  className="
                    stat-label
                  "
                >
                  Points
                </span>
                <span
                  className="
                    stat-value glow-text
                  "
                >
                  {user.points}
                </span>
              </div>
              <div
                className="
                  stat-item
                "
              >
                <span
                  className="
                    stat-label
                  "
                >
                  Rank
                </span>
                <span
                  className="
                    stat-value
                  "
                >
                  #{user.rank}
                </span>
              </div>
            </>
          )}
        </div>

        <div
          className="
            user-menu
          "
        >
          {user && (
            <>
              <div
                className="
                  user-info
                "
              >
                <UserIcon size={20} />
                <span>{user.username}</span>
              </div>
              <button
                title="Settings"
                className="
                  icon-button
                "
              >
                <Settings size={20} />
              </button>
              <button
                onClick={logout}
                title="Logout"
                className="
                  icon-button logout
                "
              >
                <LogOut size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
