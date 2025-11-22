import type { Persona } from "../../../../../domain/interfaces/lgc-interfaces";

// Mapeo de estados a etiquetas legibles
export const estadoLabel: Record<Persona["estado"], string> = {
  NUEVO: "Nuevo",
  ASISTENTE_REGULAR: "Asistente regular",
  MIEMBRO: "Miembro",
};

export const formatFecha = (iso: string | null | undefined): string => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Normalizador para búsquedas sin tildes y sin mayúsculas
export const normalizeText = (value: string | null | undefined): string =>
  (value ?? "")
    .normalize("NFD") // separa letras de los acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina los acentos (´¨ etc)
    .toLowerCase()
    .trim();
