// src/app/components/layout/sidebar/Sidebar.tsx
import { useState, useRef, type FC } from "react";
import type { SidebarProps } from "./sidebar.types";
import { SIDEBAR_ITEMS } from "./sidebar.constants";
import {
  handleSidebarMouseEnter,
  handleSidebarMouseLeave,
  type CollapseTimeoutRef,
} from "./sidebar.utils";

const Sidebar: FC<SidebarProps> = ({ isDark, user, activeSection, onSectionChange, variant }) => {
  const isMobile = variant === "mobile";

  // en móvil siempre empiezan extendidos
  const [expanded, setExpanded] = useState(isMobile);
  const collapseTimeoutRef = useRef<number | null>(null) as CollapseTimeoutRef;

  const logoSrc = isDark ? "/lgc-solo-manna.PNG" : "/lgc-solo-color.PNG";

  const handleEnter = () => {
    if (isMobile) return;
    handleSidebarMouseEnter(collapseTimeoutRef, setExpanded);
  };

  const handleLeave = () => {
    if (isMobile) return;
    handleSidebarMouseLeave(collapseTimeoutRef, setExpanded, 300);
  };

  const widthClass = isMobile ? "w-64" : expanded ? "w-64" : "w-16";
  const shapeClass = isMobile ? "rounded-r-3xl shadow-xl" : "";

  return (
    <aside
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`
        ${widthClass}
        ${shapeClass}
        h-full md:h-screen
        border-r border-lgc-border/60 bg-lgc-olive text-lgc-manna
        dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface dark:text-lgc-darkText
        flex flex-col
        transition-[width] duration-300
      `}
    >
      {/* Logo + rol */}
      <div
        className="
          h-16 flex items-center border-b border-lgc-border/40
          px-3
          dark:border-lgc-darkBorder/40
        "
      >
        <div
          className="
            flex h-10 w-10 items-center justify-center
            rounded-2xl bg-lgc-manna shadow-sm
            dark:bg-lgc-darkSurfaceMuted
          "
        >
          <img src={logoSrc} alt="Logo LGC" className="h-8 w-8 object-contain" />
        </div>

        {((!isMobile && expanded) || isMobile) && (
          <div className="ml-3 flex flex-col">
            <span className="text-sm font-semibold leading-tight">LGC • Panel</span>
            <span className="text-[11px] text-lgc-manna/80 dark:text-lgc-darkTextMuted">
              {user.rol}
            </span>
          </div>
        )}
      </div>

      {/* Navegación */}
      <nav className="flex-1 flex flex-col justify-center">
        <ul className="space-y-3 px-2">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = item.id === activeSection;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSectionChange(item.id)}
                  className={[
                    "flex items-center rounded-2xl px-2 py-2 w-full",
                    "transition-colors duration-200",
                    isActive
                      ? "bg-lgc-manna text-lgc-primary shadow-sm dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary"
                      : "text-lgc-manna/90 hover:bg-lgc-olive/80 dark:text-lgc-darkTextMuted dark:hover:bg-lgc-darkSurfaceMuted",
                  ].join(" ")}
                >
                  <span className="flex h-8 w-8 items-center justify-center">
                    <img src={item.icon} alt={item.label} className="h-5 w-5 object-contain" />
                  </span>

                  {((!isMobile && expanded) || isMobile) && (
                    <span className="ml-3 text-sm font-medium truncate">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
