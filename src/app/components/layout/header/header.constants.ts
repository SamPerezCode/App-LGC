import type { AppSection } from "../../../types/layout";

// src/app/components/layout/header/header.constants.ts
export const HEADER_CONTENT: Record<
  AppSection,
  { title: string; subtitle: string }
> = {
  dashboard: { title: "Dashboard", subtitle: "..." },
  personas: { title: "Personas", subtitle: "..." },
  ruta: { title: "Ruta de crecimiento", subtitle: "..." },
  seguimiento: { title: "Seguimiento", subtitle: "..." },
  "miembros-antiguos": {
    title: "Miembros antiguos",
    subtitle: "Actualiza informacion de miembros.",
  },
  config: { title: "Configuracion", subtitle: "..." },
};
