import type { Usuario } from "../../../../domain/interfaces/lgc-interfaces";
import type { AppSection } from "../../../types/layout";

export interface SidebarProps {
  isDark: boolean;
  user: Usuario;
  activeSection: AppSection;
  onSectionChange: (section: AppSection) => void;
}
