import { useMemo } from "react";
import {
  actividadesRutaMock,
  seguimientosMock,
  contactosMock,
} from "../../../../../domain/mock-data/lgc-mock";
import { usePersonasContext } from "../personas/PersonasContext";

export type RangeOption = { label: string; days: number };

export type KpiData = {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  hint?: string;
  icon: string;
  iconBgClass?: string;
  progress?: number;
  progressClass?: string;
};

export type DistributionItem = {
  label: string;
  value: number;
  percent: number;
};

export type AlertItem = {
  label: string;
  value: number;
};

export type ActivityItem = {
  id: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  kind: "contacto" | "ruta";
};

export type RouteStepItem = {
  id: string;
  name: string;
  completed: number;
  percent: number;
};

export type DashboardMetrics = {
  kpis: KpiData[];
  distribution: DistributionItem[];
  alerts: AlertItem[];
  recentActivity: ActivityItem[];
  routeSteps: RouteStepItem[];
};

const KPI_ICONS = {
  personas: "/person.svg",
  nuevos: "/person_add.svg",
  ruta: "/road.svg",
  seguimiento: "/list.svg",
} as const;

const clampPercent = (value: number) =>
  Math.min(100, Math.max(0, Math.round(value)));

const toTimestamp = (value: string) => Date.parse(value);

const formatShort = (value: string) => value.slice(0, 10);

const daysBetween = (a: number, b: number) =>
  Math.round((a - b) / (1000 * 60 * 60 * 24));

const getReferenceTimestamp = (values: string[]) => {
  const timestamps = values
    .map(toTimestamp)
    .filter((value) => Number.isFinite(value));
  return timestamps.length ? Math.max(...timestamps) : 0;
};

const deltaPercent = (current: number, previous: number) => {
  if (!previous) return null;
  return Math.round(((current - previous) / previous) * 100);
};

export const useDashboardMetrics = (
  range: RangeOption
): DashboardMetrics => {
  const { personas } = usePersonasContext();

  return useMemo(() => {
    const referenceDates: string[] = [
      ...personas.map((p) => p.creadoEn),
      ...contactosMock.map((c) => c.fecha),
      ...seguimientosMock.map((s) => s.fechaAsignacion),
      ...seguimientosMock.flatMap((s) =>
        s.fechaCumplimiento ? [s.fechaCumplimiento] : []
      ),
      ...actividadesRutaMock.map((a) => a.actualizadoEn),
    ];

    const now = getReferenceTimestamp(referenceDates);

    const inWindow = (value: string, days: number) =>
      daysBetween(now, toTimestamp(value)) <= days;

    const inPrevWindow = (value: string, days: number) => {
      const diff = daysBetween(now, toTimestamp(value));
      return diff > days && diff <= days * 2;
    };

    const totalPersonas = personas.length;
    const totalNuevos = personas.filter(
      (p) => p.estado === "NUEVO"
    ).length;
    const totalMiembros = personas.filter(
      (p) => p.estado === "MIEMBRO"
    ).length;
    const totalAsistentes = personas.filter(
      (p) => p.estado === "ASISTENTE_REGULAR"
    ).length;

    const nuevosEnPeriodo = personas.filter((p) =>
      inWindow(p.creadoEn, range.days)
    ).length;
    const nuevosPeriodoPrevio = personas.filter((p) =>
      inPrevWindow(p.creadoEn, range.days)
    ).length;

    const totalSeguimientos = seguimientosMock.length;
    const seguimientosCompletados = seguimientosMock.filter(
      (s) => s.estado === "COMPLETADA"
    ).length;
    const seguimientosEnProceso = seguimientosMock.filter(
      (s) => s.estado === "EN_PROCESO"
    ).length;
    const seguimientosPendientes = seguimientosMock.filter(
      (s) => s.estado === "PENDIENTE"
    ).length;

    const completionRate = totalSeguimientos
      ? Math.round(
          (seguimientosCompletados / totalSeguimientos) * 100
        )
      : 0;

    const totalActividades = actividadesRutaMock.length || 1;
    const avancePromedio =
      personas.reduce((acc, persona) => {
        const completadas = seguimientosMock.filter(
          (s) =>
            s.personaId === persona.id && s.estado === "COMPLETADA"
        ).length;
        return acc + completadas / totalActividades;
      }, 0) / (personas.length || 1);

    const avancePercent = Math.round(avancePromedio * 100);

    const personasById = new Map(personas.map((p) => [p.id, p]));

    const contactos = contactosMock.map((contacto) => {
      const persona = personasById.get(contacto.personaId);
      return {
        id: contacto.id,
        title: persona?.nombreCompleto ?? "Persona sin nombre",
        subtitle: contacto.tipo,
        dateLabel: formatShort(contacto.fecha),
        date: contacto.fecha,
        kind: "contacto" as const,
      };
    });

    const actividades = actividadesRutaMock.map((actividad) => ({
      id: actividad.id,
      title: actividad.nombre,
      subtitle: actividad.tipo,
      dateLabel: formatShort(actividad.actualizadoEn),
      date: actividad.actualizadoEn,
      kind: "ruta" as const,
    }));

    const recentActivity = [...contactos, ...actividades]
      .filter((item) => inWindow(item.date, range.days))
      .sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date))
      .slice(0, 5)
      .map(({ date: _date, ...item }) => item);

    const lastContactByPersona = new Map<string, number>();
    contactosMock.forEach((contacto) => {
      const timestamp = toTimestamp(contacto.fecha);
      const current = lastContactByPersona.get(contacto.personaId);
      if (!current || timestamp > current) {
        lastContactByPersona.set(contacto.personaId, timestamp);
      }
    });

    const sinContacto = personas.filter((persona) => {
      const lastContact =
        lastContactByPersona.get(persona.id) ??
        toTimestamp(persona.creadoEn);
      return daysBetween(now, lastContact) > 14;
    }).length;

    const routeSteps: RouteStepItem[] = actividadesRutaMock.map(
      (actividad) => {
        const completadas = seguimientosMock.filter(
          (s) =>
            s.actividadRutaId === actividad.id &&
            s.estado === "COMPLETADA"
        ).length;

        return {
          id: actividad.id,
          name: actividad.nombre,
          completed: completadas,
          percent: clampPercent(
            (completadas / (totalPersonas || 1)) * 100
          ),
        };
      }
    );

    const nuevosDelta = deltaPercent(
      nuevosEnPeriodo,
      nuevosPeriodoPrevio
    );

    const kpis: KpiData[] = [
      {
        id: "personas",
        title: "Personas activas",
        value: totalPersonas,
        subtitle: `Nuevos: ${totalNuevos} | Miembros: ${totalMiembros}`,
        icon: KPI_ICONS.personas,
        iconBgClass: "bg-lgc-primary/10 dark:bg-lgc-darkPrimary/20",
        progress: clampPercent(
          (totalNuevos / (totalPersonas || 1)) * 100
        ),
        progressClass: "bg-lgc-primary dark:bg-lgc-darkPrimary",
      },
      {
        id: "nuevos",
        title: "Nuevos registros",
        value: nuevosEnPeriodo,
        subtitle:
          nuevosDelta === null
            ? "Sin base previa"
            : `${
                nuevosDelta > 0 ? "+" : ""
              }${nuevosDelta}% vs periodo anterior`,
        hint: `Rango activo: ultimos ${range.days} dias`,
        icon: KPI_ICONS.nuevos,
        iconBgClass: "bg-lgc-manna/40 dark:bg-lgc-darkSurfaceMuted",
      },
      {
        id: "ruta",
        title: "Avance promedio ruta",
        value: `${avancePercent}%`,
        subtitle: `Completadas: ${seguimientosCompletados} de ${totalSeguimientos}`,
        icon: KPI_ICONS.ruta,
        iconBgClass: "bg-lgc-olive/30 dark:bg-lgc-darkSurfaceMuted",
        progress: clampPercent(avancePercent),
        progressClass: "bg-lgc-olive dark:bg-lgc-darkPrimary",
      },
      {
        id: "seguimientos",
        title: "Seguimientos activos",
        value: seguimientosEnProceso,
        subtitle: `Pendientes: ${seguimientosPendientes}`,
        hint: `Tasa de cumplimiento: ${completionRate}%`,
        icon: KPI_ICONS.seguimiento,
        iconBgClass: "bg-lgc-danger/10 dark:bg-lgc-darkSurfaceMuted",
      },
    ];

    return {
      kpis,
      distribution: [
        {
          label: "Nuevos",
          value: totalNuevos,
          percent: clampPercent(
            (totalNuevos / (totalPersonas || 1)) * 100
          ),
        },
        {
          label: "Asistentes regulares",
          value: totalAsistentes,
          percent: clampPercent(
            (totalAsistentes / (totalPersonas || 1)) * 100
          ),
        },
        {
          label: "Miembros",
          value: totalMiembros,
          percent: clampPercent(
            (totalMiembros / (totalPersonas || 1)) * 100
          ),
        },
      ],
      alerts: [
        {
          label: "Personas sin contacto 14+ dias",
          value: sinContacto,
        },
        {
          label: "Seguimientos pendientes",
          value: seguimientosPendientes,
        },
        {
          label: "Seguimientos en proceso",
          value: seguimientosEnProceso,
        },
      ],
      recentActivity,
      routeSteps,
    };
  }, [range, personas]);
};
