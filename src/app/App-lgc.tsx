import { useState } from "react";
import type { Usuario } from "../domain/interfaces/lgc-interfaces";
import Contain from "./components/layout/container/Contain";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import Sidebar from "./components/layout/sidebar/Sidebar";
import type { AppSection } from "./types/layout";

interface AppLgcProps {
  user: Usuario;
  isDark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
}

const AppLgc: React.FC<AppLgcProps> = ({ user, isDark, onToggleTheme, onLogout }) => {
  const [activeSection, setActiveSection] = useState<AppSection>("dashboard");

  return (
    <div className="min-h-[calc(100vh-0px)] flex">
      {/* Sidebar */}
      <Sidebar
        isDark={isDark}
        user={user}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />{" "}
      {/* ZONA DERECHA */}
      <div className="flex flex-1 flex-col">
        {/* HEADER INTERNO */}
        <Header
          user={user}
          isDark={isDark}
          onToggle={onToggleTheme}
          activeSection={activeSection}
          onLogout={onLogout}
          onToggleTheme={onToggleTheme}
        />{" "}
        {/* CONTENIDO */}
        <Contain />
        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
};

export default AppLgc;
