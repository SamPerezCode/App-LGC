import type { AppSection } from "../../../types/layout";

export const SECTION_TITLES: Record<AppSection, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Resumen general del estado de la iglesia y los módulos.",
  },
  personas: {
    title: "Registro de personas",
    subtitle: "Administra los nuevos asistentes, miembros y su información.",
  },
  ruta: {
    title: "Ruta de crecimiento",
    subtitle: "Configura y administra las actividades de la ruta de crecimiento.",
  },
  seguimiento: {
    title: "Seguimiento",
    subtitle: "Da seguimiento a los nuevos según su avance en la ruta.",
  },
  config: {
    title: "Configuración",
    subtitle: "Ajusta parámetros generales del sistema.",
  },
};
