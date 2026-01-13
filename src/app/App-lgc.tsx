// src/app/App-lgc.tsx
import { useState, useEffect, useRef } from "react";
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

const STORAGE_KEY = "lgc:sidebar:expanded";

const AppLgc: React.FC<AppLgcProps> = ({
  user,
  isDark,
  onToggleTheme,
  onLogout,
}) => {
  const [activeSection, setActiveSection] =
    useState<AppSection>("dashboard");
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] =
    useState(false);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return false;
    return stored === "1";
  });

  const desktopSidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebarMobile = () =>
    setIsSidebarMobileOpen((prev) => !prev);
  const closeSidebarMobile = () => setIsSidebarMobileOpen(false);

  const toggleSidebarDesktop = () =>
    setIsSidebarExpanded((prev) => !prev);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, isSidebarExpanded ? "1" : "0");
  }, [isSidebarExpanded]);

  // cerrar con ESC
  useEffect(() => {
    if (!isSidebarMobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSidebarMobile();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarMobileOpen]);

  useEffect(() => {
    if (!isSidebarExpanded) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const sidebarEl = desktopSidebarRef.current;

      if (!sidebarEl) return;

      if (target.closest('[data-sidebar-toggle="desktop"]')) return;
      if (sidebarEl.contains(target)) return;

      setIsSidebarExpanded(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, [isSidebarExpanded]);

  return (
    <div className="flex min-h-screen">
      {/* BACKDROP movil */}
      {isSidebarMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={closeSidebarMobile}
        />
      )}

      {/* SIDEBAR MOVIL */}
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
          user={user}
          activeSection={activeSection}
          onSectionChange={(section) => {
            setActiveSection(section);
            closeSidebarMobile();
          }}
        />
      </div>

      {/* SIDEBAR DESKTOP */}
      <div className="hidden md:block" ref={desktopSidebarRef}>
        <Sidebar
          variant="desktop"
          user={user}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          expanded={isSidebarExpanded}
          onToggleSidebarDesktop={toggleSidebarDesktop}
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

        <Contain activeSection={activeSection} />
        <Footer />
      </div>
    </div>
  );
};

export default AppLgc;
