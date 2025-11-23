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
  const errores: string[] = [];

  // 1) Nombre obligatorio
  if (!form.nombreCompleto.trim()) {
    errores.push("El nombre es obligatorio.");
  }

  // 2) Teléfono obligatorio (como tú quieres: mínimo nombre + teléfono)
  if (!form.telefono || !form.telefono.trim()) {
    errores.push("El teléfono es obligatorio.");
  }

  // 3) Formato básico de correo (solo si lo escriben)
  if (form.correo && form.correo.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.correo.trim())) {
      errores.push("El correo electrónico no tiene un formato válido.");
    }
  }

  if (errores.length === 0) return null;
  return errores.join(" ");
};

// Normalizador para búsquedas sin tildes y sin mayúsculas
export const normalizeText = (value: string | null | undefined): string =>
  (value ?? "")
    .normalize("NFD") // separa letras de los acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina los acentos (´¨ etc)
    .toLowerCase()
    .trim();
