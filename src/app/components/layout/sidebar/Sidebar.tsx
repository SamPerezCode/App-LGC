// src/app/components/layout/sidebar/Sidebar.tsx
import { useState, useRef, type FC } from "react";
import type { SidebarProps } from "./sidebar.types";
import type { AppSection } from "../../../types/layout";
import { SIDEBAR_GROUPS } from "./sidebar.constants";
import {
  handleSidebarMouseEnter,
  handleSidebarMouseLeave,
  type CollapseTimeoutRef,
} from "./sidebar.utils";

const NUEVO_CREYENTE_SECTIONS: AppSection[] = ["personas", "ruta", "seguimiento"];

const Sidebar: FC<SidebarProps> = ({
  isDark,
  user,
  activeSection,
  onSectionChange,
  variant = "desktop",
}) => {
  const isMobile = variant === "mobile";

  // en móvil siempre expandido
  const [expanded, setExpanded] = useState(isMobile);
  const collapseTimeoutRef = useRef<number | null>(null) as CollapseTimeoutRef;

  const isCollapsed = !isMobile && !expanded;

  // grupo abierto (sólo “nuevo-creyente” por ahora)
  const [openGroupId, setOpenGroupId] = useState<string | null>(() =>
    NUEVO_CREYENTE_SECTIONS.includes(activeSection) ? "nuevo-creyente" : null
  );

  const logoSrc = isDark ? "/lgc-solo-manna.PNG" : "/lgc-solo-color.PNG";

  const handleEnter = () => {
    if (isMobile) return;
    handleSidebarMouseEnter(collapseTimeoutRef, setExpanded);
  };

  const handleLeave = () => {
    if (isMobile) return;
    handleSidebarMouseLeave(collapseTimeoutRef, setExpanded, 300);
  };

  return (
    <aside
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`
        h-full md:h-screen
        border-r border-lgc-border/60 bg-lgc-olive text-lgc-manna
        dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface dark:text-lgc-darkText
        flex flex-col
        transition-[width] duration-300
        ${isMobile ? "w-64" : expanded ? "w-64" : "w-16"}
      `}
    >
      {/* Logo + rol */}
      <div className="h-16 flex items-center border-b border-lgc-border/40 px-3 dark:border-lgc-darkBorder/40">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lgc-manna shadow-sm dark:bg-lgc-darkSurfaceMuted">
          <img src={logoSrc} alt="Logo LGC" className="h-8 w-8 object-contain" />
        </div>

        {expanded && (
          <div className="ml-3 flex flex-col">
            <span className="text-sm font-semibold leading-tight">LGC • Panel</span>
            <span className="text-[11px] text-lgc-manna/80 dark:text-lgc-darkTextMuted">
              {user.rol}
            </span>
          </div>
        )}
      </div>

      {/* NAV – centrado vertical */}
      <nav className="flex-1 flex">
        <div className="flex w-full flex-col justify-center gap-4 px-2">
          {SIDEBAR_GROUPS.map((group) => {
            const hasChildren = !!group.children?.length;

            const isGroupActive = hasChildren
              ? group.children!.some((child) => child.id === activeSection)
              : (group.id as AppSection | "config") === activeSection;

            const shouldAutoOpenNuevoCreyente =
              hasChildren &&
              group.id === "nuevo-creyente" &&
              NUEVO_CREYENTE_SECTIONS.includes(activeSection);

            const showChildren =
              hasChildren && expanded && (openGroupId === group.id || shouldAutoOpenNuevoCreyente);

            // ====== ITEMS SIN HIJOS (Dashboard, Configuración) ======
            if (!hasChildren) {
              const isActive = isGroupActive;

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => {
                    // si salimos del módulo, cerramos cualquier grupo
                    setOpenGroupId(null);
                    onSectionChange(group.id as AppSection);
                  }}
                  className={[
                    "flex w-full items-center rounded-2xl px-2 py-2 transition-colors duration-200",
                    isActive
                      ? "bg-lgc-manna text-lgc-primary shadow-sm dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary"
                      : "text-lgc-manna/90 hover:bg-lgc-olive/80 dark:text-lgc-darkTextMuted dark:hover:bg-lgc-darkSurfaceMuted",
                  ].join(" ")}
                >
                  <span className="flex h-8 w-8 items-center justify-center">
                    <img src={group.icon} alt={group.label} className="h-5 w-5 object-contain" />
                  </span>
                  {expanded && (
                    <span className="ml-3 text-sm font-medium truncate">{group.label}</span>
                  )}
                </button>
              );
            }

            // ====== GRUPO CON HIJOS (Nuevo creyente) ======
            const handleGroupClick = () => {
              if (isCollapsed) return; // si está colapsado, no desplegamos
              setOpenGroupId((prev) => (prev === group.id ? null : group.id));
            };

            return (
              <div key={group.id}>
                {/* Botón del módulo */}
                <button
                  type="button"
                  onClick={handleGroupClick}
                  className={[
                    // 👇 mismo tamaño de texto que los items simples
                    "flex w-full items-center rounded-2xl px-2 py-2 text-sm font-medium tracking-wide transition-colors duration-200",
                    isGroupActive
                      ? "bg-lgc-olive/80 text-lgc-manna"
                      : "text-lgc-manna/80 hover:bg-lgc-olive/70",
                  ].join(" ")}
                >
                  <span className="flex h-8 w-8 items-center justify-center">
                    <img src={group.icon} alt={group.label} className="h-5 w-5 object-contain" />
                  </span>
                  {expanded && <span className="ml-3 truncate">{group.label}</span>}
                </button>

                {/* Hijos solo cuando el módulo está “abierto” */}
                {showChildren && (
                  <ul className="mt-2 space-y-1 pl-9">
                    {group.children!.map((child) => {
                      const isActive = child.id === activeSection;

                      return (
                        <li key={child.id}>
                          <button
                            type="button"
                            onClick={() => onSectionChange(child.id)}
                            className={[
                              "flex w-full items-center rounded-2xl px-2 py-2 text-sm transition-colors duration-200",
                              isActive
                                ? "bg-lgc-manna text-lgc-primary shadow-sm dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary"
                                : "text-lgc-manna/90 hover:bg-lgc-olive/80 dark:text-lgc-darkTextMuted dark:hover:bg-lgc-darkSurfaceMuted",
                            ].join(" ")}
                          >
                            <span className="flex h-8 w-8 items-center justify-center">
                              <img
                                src={child.icon}
                                alt={child.label}
                                className="h-5 w-5 object-contain"
                              />
                            </span>
                            {expanded && <span className="ml-3 truncate">{child.label}</span>}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
