import type { Usuario } from "../../../../domain/interfaces/lgc-interfaces";
import type { AppSection } from "../../../types/layout";

export interface HeaderProps {
  user: Usuario;
  isDark: boolean;
  activeSection: AppSection;
  onToggleTheme: () => void;
  onToggle: () => void;
  onLogout: () => void;
}
