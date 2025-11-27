import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Missions } from "./pages/Missions";
import { Labs } from "./pages/Labs";
import { Tools } from "./pages/Tools";
import {
  Challenges,
  Ranking,
  Learning,
  BugBounty,
  Admin,
} from "./pages/Placeholder";
import { useAppStore } from "./store";
import "./styles/global.css";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { login, isLoggedIn } = useAppStore();

  // Initialize user on mount
  useEffect(() => {
    if (!isLoggedIn) {
      login("Hacker");
    }
  }, [isLoggedIn, login]);

  // Close sidebar on route change
  useEffect(() => {
    // Defer state update to avoid cascading renders
    const timer = setTimeout(() => {
      setSidebarOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "missions":
        return <Missions />;
      case "labs":
        return <Labs />;
      case "tools":
        return <Tools />;
      case "challenges":
        return <Challenges />;
      case "ranking":
        return <Ranking />;
      case "learning":
        return <Learning />;
      case "bugbounty":
        return <BugBounty />;
      case "admin":
        return <Admin />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div
        className="
          login-container
        "
      >
        <div
          className="
            login-content
          "
        >
          <div
            className="
              login-logo
            "
          >
            {"</>"}
          </div>
          <h1
            className="
              login-title
            "
          >
            HACKER LABS
          </h1>
          <p
            className="
              login-subtitle
            "
          >
            Plataforma de Treinamento em Segurança Ofensiva
          </p>
          <button
            onClick={() => login("Hacker")}
            className="
              btn-primary login-button
            "
          >
            Entrar na Plataforma
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        app-layout
      "
    >
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div
        className="
          main-container
        "
      >
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
        <main
          className="
            main-content
          "
        >
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
