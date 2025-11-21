import type { AppSection } from "../../../types/layout";

export interface SidebarItem {
  id: AppSection;
  label: string;
  icon: string;
}

const ICONS = {
  dashboard: "/home.svg",
  personas: "/person_add.svg",
  ruta: "/road.svg",
  seguimiento: "/list.svg",
  config: "/settings.svg",
} as const;

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: ICONS.dashboard },
  { id: "personas", label: "Registro de personas", icon: ICONS.personas },
  { id: "ruta", label: "Ruta de crecimiento", icon: ICONS.ruta },
  { id: "seguimiento", label: "Seguimiento", icon: ICONS.seguimiento },
  { id: "config", label: "Configuración", icon: ICONS.config },
];
