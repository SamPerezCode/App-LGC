import type { AppSection } from "../../../types/layout";

export const SECTION_TITLES: Record<
  AppSection,
  { title: string; subtitle: string }
> = {
  dashboard: { title: "Dashboard", subtitle: "..." },
  conexion: { title: "Conexion", subtitle: "Seguimiento de nuevos creyentes" },
  personas: { title: "Personas", subtitle: "..." },
  ruta: { title: "Ruta de crecimiento", subtitle: "..." },
  seguimiento: { title: "Seguimiento", subtitle: "..." },
  "miembros-antiguos": {
    title: "Miembros antiguos",
    subtitle: "Actualiza informacion de miembros.",
  },
  config: { title: "Configuracion", subtitle: "..." },
};
