// src/app/components/layout/sidebar/sidebar.types.ts
import type { Usuario } from "../../../../domain/interfaces/lgc-interfaces";
import type { AppSection } from "../../../types/layout";

export interface SidebarProps {
  isDark: boolean;
  user: Usuario;
  activeSection: AppSection;
  onSectionChange: (section: AppSection) => void;
  variant: "desktop" | "mobile";
  expanded?: boolean;
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
  section?: AppSection;
  children?: SidebarChildItem[];
}
