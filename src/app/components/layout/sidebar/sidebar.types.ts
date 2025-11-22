// src/app/components/layout/sidebar/sidebar.types.ts
import type { Usuario } from "../../../../domain/interfaces/lgc-interfaces";
import type { AppSection } from "../../../types/layout";

export interface SidebarProps {
  isDark: boolean;
  user: Usuario;
  activeSection: AppSection;
  onSectionChange: (section: AppSection) => void;
  variant: "desktop" | "mobile";
}

export interface SidebarChildItem {
  id: AppSection;
  label: string;
  icon: string;
}

export interface SidebarGroup {
  id: "dashboard" | "nuevo-creyente" | "config";
  label: string;
  icon: string;

  /** Para grupos sin hijos (Dashboard, Config) */
  section?: AppSection;

  /** Para módulos con sub-items (Nuevo creyente) */
  children?: SidebarChildItem[];
}
