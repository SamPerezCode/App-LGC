// src/app/App-lgc.tsx
import { useState, useEffect } from "react";
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
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);

  const toggleSidebarMobile = () => setIsSidebarMobileOpen((prev) => !prev);
  const closeSidebarMobile = () => setIsSidebarMobileOpen(false);

  // cerrar con ESC
  useEffect(() => {
    if (!isSidebarMobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSidebarMobile();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarMobileOpen]);

  return (
    <div className="flex min-h-screen">
      {/* BACKDROP móvil */}
      {isSidebarMobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={closeSidebarMobile} />
      )}

      {/* SIDEBAR MÓVIL */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 md:hidden
          w-64
          transition-transform duration-300
          ${isSidebarMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar
          variant="mobile"
          isDark={isDark}
          user={user}
          activeSection={activeSection}
          onSectionChange={(section) => {
            setActiveSection(section);
            closeSidebarMobile();
          }}
        />
      </div>

      {/* SIDEBAR DESKTOP */}
      <div className="hidden md:block">
        <Sidebar
          variant="desktop"
          isDark={isDark}
          user={user}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      <div className="flex flex-1 flex-col bg-lgc-bg dark:bg-lgc-darkBg">
        <Header
          user={user}
          isDark={isDark}
          activeSection={activeSection}
          onToggleTheme={onToggleTheme}
          onToggle={onToggleTheme}
          onLogout={onLogout}
          onToggleSidebarMobile={toggleSidebarMobile}
        />

        <Contain />
        <Footer />
      </div>
    </div>
  );
};

export default AppLgc;
