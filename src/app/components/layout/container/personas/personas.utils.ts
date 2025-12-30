import type { Persona } from "../../../../../domain/interfaces/lgc-interfaces";
import type { PersonaCreateInput } from "./personas.types";

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

export const validatePersonaForm = (form: PersonaCreateInput): string | null => {
  if (!form.nombreCompleto?.trim()) return "El nombre completo es obligatorio.";
  if (!form.telefono?.trim()) return "El teléfono es obligatorio.";
  return null;
};

export const normalizeText = (value: string | null | undefined): string =>
  (value ?? "")
    .normalize("NFD") // separa letras de los acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina los acentos (´¨ etc)
    .toLowerCase()
    .trim();
