// src/app/components/layout/sidebar/sidebar.constants.ts
import type { SidebarGroup } from "./sidebar.types";
const ICONS = {
  dashboard: "/home.svg",
  conexion: "/conexion.svg",
  nuevoCreyente: "/new_believer.svg",
  personas: "/person.svg",
  ruta: "/road.svg",
  config: "/settings.svg",
  miembrosAntiguos: "/person.svg",
} as const;

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: ICONS.dashboard,
    section: "dashboard",
  },
  {
    id: "conexion",
    label: "Conexion",
    icon: ICONS.conexion,
    section: "conexion",
  },
  {
    id: "nuevo-creyente",
    label: "Nuevo creyente",
    icon: ICONS.nuevoCreyente,
    children: [
      { id: "personas", label: "Personas", icon: ICONS.personas },
      { id: "ruta", label: "Ruta de crecimiento", icon: ICONS.ruta },
    ],
  },
  {
    id: "config",
    label: "Configuracion",
    icon: ICONS.config,
    section: "config",
  },
  {
    id: "miembros-antiguos",
    label: "Miembros antiguos",
    icon: ICONS.miembrosAntiguos,
    section: "miembros-antiguos",
  },
];
