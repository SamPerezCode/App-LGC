import { useMemo } from "react";
import type {
  Persona,
  SeguimientoActividadPersona,
  ActividadRutaCrecimiento,
} from "../../../../../../domain/interfaces/lgc-interfaces";

export type ConexionMetrics = {
  totalPersonas: number;
  nuevos: number;
  asistentesRegulares: number;
  miembros: number;
  actividadesCompletadas: number;
  actividadesPendientes: number;
  tasaConversion: number;
  personasSinActividad: number;
};

export const useConexionMetrics = (
  personas: Persona[],
  seguimientos: SeguimientoActividadPersona[],
  actividades: ActividadRutaCrecimiento[]
): ConexionMetrics => {
  return useMemo(() => {
    const totalPersonas = personas.length;
    const nuevos = personas.filter((p) => p.estado === "NUEVO").length;
    const asistentesRegulares = personas.filter(
      (p) => p.estado === "ASISTENTE_REGULAR"
    ).length;
    const miembros = personas.filter((p) => p.estado === "MIEMBRO").length;

    const actividadesCompletadas = seguimientos.filter(
      (s) => s.estado === "COMPLETADA"
    ).length;
    const actividadesPendientes = seguimientos.filter(
      (s) => s.estado === "PENDIENTE"
    ).length;

    // Personas con al menos una actividad completada
    const personasConActividad = new Set(
      seguimientos.filter((s) => s.estado === "COMPLETADA").map((s) => s.personaId)
    );
    const personasSinActividad = totalPersonas - personasConActividad.size;

    // Tasa de conversion: % de personas que han pasado de NUEVO a otro estado
    const tasaConversion =
      totalPersonas > 0
        ? Math.round(((asistentesRegulares + miembros) / totalPersonas) * 100)
        : 0;

    return {
      totalPersonas,
      nuevos,
      asistentesRegulares,
      miembros,
      actividadesCompletadas,
      actividadesPendientes,
      tasaConversion,
      personasSinActividad,
    };
  }, [personas, seguimientos, actividades]);
};
