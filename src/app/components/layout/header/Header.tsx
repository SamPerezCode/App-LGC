// src/app/components/layout/header/Header.tsx
import { useState, useRef, type FC } from "react";
import type { HeaderProps } from "./header.types";
import { SECTION_TITLES } from "./header.constants";
import { getInitials, logoutWithDelay } from "./header.utils";
import { useClickOutside } from "../../../hooks/useClickOutside";

const Header: FC<HeaderProps> = ({
  user,
  isDark,
  activeSection,
  onToggleTheme,
  onLogout,
  onToggleSidebarMobile,
}) => {
  const themeIcon = isDark ? "/light.svg" : "/dark.svg";
  const sectionInfo = SECTION_TITLES[activeSection];
  const initials = getInitials(user.nombre);

  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(dropdownRef, () => setOpen(false), open);

  const handleLogoutClick = () => {
    logoutWithDelay({ setLoggingOut, setOpen, onLogout, delayMs: 500 });
  };

  return (
    <header className="px-4 md:px-6 pt-4 shrink-0">
      <div
        className="
          flex h-16 items-center justify-between
          rounded-2xl border border-lgc-border/60
          bg-lgc-surface/95 backdrop-blur-md
          px-4 md:px-6
          shadow-sm
          dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface/90
        "
      >
        {/*botón menú (móvil) + título */}
        <div className="flex items-center gap-3">
          {/* botón menú solo en móvil */}
          <button
            type="button"
            onClick={onToggleSidebarMobile}
            className="
              inline-flex h-9 w-9 items-center justify-center
              rounded-full border border-lgc-border bg-lgc-surface
              hover:bg-lgc-surfaceMuted
              md:hidden
              dark:border-lgc-darkBorder dark:bg-lgc-darkSurface dark:hover:bg-lgc-darkSurfaceMuted
            "
            aria-label="Abrir menú lateral"
          >
            <img src="/menu.svg" alt="Menú" className="h-4 w-4" />
          </button>

          <div>
            <h1 className="text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
              {sectionInfo.title}
            </h1>
            <p
              className="
      hidden md:block
      text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted
    "
            >
              {sectionInfo.subtitle}
            </p>
          </div>
        </div>

        {/* botón tema + avatar */}
        <div className="flex items-center gap-4">
          {/* botón de tema */}
          <button
            onClick={onToggleTheme}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full border border-lgc-border bg-lgc-surface
              hover:bg-lgc-surfaceMuted
              dark:border-lgc-darkBorder dark:bg-lgc-darkSurface dark:hover:bg-lgc-darkSurfaceMuted
              transition-colors
            "
            aria-label="Cambiar tema"
          >
            <img src={themeIcon} alt="icon-mode" className="h-4 w-4" />
          </button>

          {/* avatar + dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full bg-lgc-primary text-lgc-onPrimary
                text-xs font-semibold uppercase
                dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary
              "
              aria-label="Menú de usuario"
            >
              {initials}
            </button>

            {open && (
              <div
                className="
                  absolute right-0 mt-2 w-56
                  overflow-hidden rounded-xl border
                  border-lgc-border/70 bg-lgc-surface shadow-lg
                  dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface
                "
              >
                <div className="px-4 pt-3 pb-2 border-b border-lgc-border/60 dark:border-lgc-darkBorder/60">
                  <p className="text-sm font-medium text-lgc-text dark:text-lgc-darkText">
                    {user.nombre}
                  </p>
                  <p className="mt-0.5 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                    {user.rol}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogoutClick}
                  disabled={loggingOut}
                  className="
                    w-full px-4 py-2 text-left text-sm
                    text-lgc-text hover:text-lgc-danger hover:bg-lgc-surfaceMuted
                    dark:text-lgc-darkText dark:hover:text-lgc-darkAccent dark:hover:bg-lgc-darkSurfaceMuted
                    transition-colors
                    disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  {loggingOut ? "Cerrando sesión…" : "Cerrar sesión"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
