export const API_PATHS = {
  personas: "/personas",
  persona: (id: string) => `/personas/${id}`,

  rutas: "/rutas",
  ruta: (id: string) => `/rutas/${id}`,

  actividades: "/actividades",
  actividad: (id: string) => `/actividades/${id}`,

  // opcional futuro
  seguimientos: "/seguimientos",
  seguimiento: (id: string) => `/seguimientos/${id}`,
};
