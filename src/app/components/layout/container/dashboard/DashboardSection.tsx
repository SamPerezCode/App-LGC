import { useMemo, useState, type FC } from "react";
import {
  personasMock,
  actividadesRutaMock,
  seguimientosMock,
  contactosMock,
} from "../../../../../domain/mock-data/lgc-mock";

type RangeOption = { label: string; days: number };

const RANGE_OPTIONS: RangeOption[] = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];

const DashboardSection: FC = () => {
  const [range, setRange] = useState<RangeOption>(RANGE_OPTIONS[1]);

  const dashboard = useMemo(() => {
    const allDates: number[] = [];

    personasMock.forEach((p) =>
      allDates.push(new Date(p.creadoEn).getTime())
    );
    contactosMock.forEach((c) =>
      allDates.push(new Date(c.fecha).getTime())
    );
    seguimientosMock.forEach((s) => {
      allDates.push(new Date(s.fechaAsignacion).getTime());
      if (s.fechaCumplimiento)
        allDates.push(new Date(s.fechaCumplimiento).getTime());
    });

    const maxDate = allDates.length ? Math.max(...allDates) : 0;
    const now = new Date(maxDate);

    const toDate = (value: string) => new Date(value);
    const daysBetween = (a: Date, b: Date) =>
      Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));

    const inWindow = (value: string, days: number) => {
      const date = toDate(value);
      return daysBetween(now, date) <= days;
    };

    const inPrevWindow = (value: string, days: number) => {
      const date = toDate(value);
      const diff = daysBetween(now, date);
      return diff > days && diff <= days * 2;
    };

    const totalPersonas = personasMock.length;
    const totalNuevos = personasMock.filter(
      (p) => p.estado === "NUEVO"
    ).length;
    const totalMiembros = personasMock.filter(
      (p) => p.estado === "MIEMBRO"
    ).length;
    const totalAsistentes = personasMock.filter(
      (p) => p.estado === "ASISTENTE_REGULAR"
    ).length;

    const nuevosEnPeriodo = personasMock.filter((p) =>
      inWindow(p.creadoEn, range.days)
    ).length;
    const nuevosPeriodoPrevio = personasMock.filter((p) =>
      inPrevWindow(p.creadoEn, range.days)
    ).length;

    const deltaPercent = (current: number, previous: number) => {
      if (!previous) return null;
      return Math.round(((current - previous) / previous) * 100);
    };

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

    const contactosRecientes = contactosMock
      .slice()
      .sort(
        (a, b) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      )
      .filter((c) => inWindow(c.fecha, range.days))
      .slice(0, 5);

    const lastContactByPersona = new Map<string, Date>();
    contactosMock.forEach((c) => {
      const current = lastContactByPersona.get(c.personaId);
      const date = new Date(c.fecha);
      if (!current || date > current)
        lastContactByPersona.set(c.personaId, date);
    });

    const sinContacto = personasMock.filter((p) => {
      const lastContact =
        lastContactByPersona.get(p.id) ?? new Date(p.creadoEn);
      return daysBetween(now, lastContact) > 14;
    }).length;

    const totalActividades = actividadesRutaMock.length || 1;
    const avancePromedio =
      personasMock.reduce((acc, persona) => {
        const completadas = seguimientosMock.filter(
          (s) =>
            s.personaId === persona.id && s.estado === "COMPLETADA"
        ).length;
        return acc + completadas / totalActividades;
      }, 0) / (personasMock.length || 1);

    const avancePercent = Math.round(avancePromedio * 100);

    const actividadPorPaso = actividadesRutaMock.map((act) => {
      const completadas = seguimientosMock.filter(
        (s) =>
          s.actividadRutaId === act.id && s.estado === "COMPLETADA"
      ).length;
      return { ...act, completadas };
    });

    const formatShort = (value: string) => {
      const date = new Date(value);
      return date.toISOString().slice(0, 10);
    };

    return {
      now,
      totalPersonas,
      totalNuevos,
      totalMiembros,
      totalAsistentes,
      nuevosEnPeriodo,
      nuevosPeriodoPrevio,
      nuevosDelta: deltaPercent(nuevosEnPeriodo, nuevosPeriodoPrevio),
      totalSeguimientos,
      seguimientosCompletados,
      seguimientosEnProceso,
      seguimientosPendientes,
      completionRate,
      contactosRecientes,
      sinContacto,
      avancePercent,
      actividadPorPaso,
      formatShort,
    };
  }, [range]);

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Panel ejecutivo
          </h2>
          <p className="text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Resumen de personas, ruta y seguimiento en un solo lugar.
          </p>
        </div>

        <div className="inline-flex items-center gap-1 rounded-2xl border border-lgc-border/60 bg-lgc-surface p-1 text-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          {RANGE_OPTIONS.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setRange(option)}
              className={[
                "rounded-xl px-3 py-1.5 font-medium transition-colors",
                range.label === option.label
                  ? "bg-lgc-primary text-lgc-onPrimary dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary"
                  : "text-lgc-textMuted hover:bg-lgc-surfaceMuted dark:text-lgc-darkTextMuted dark:hover:bg-lgc-darkSurfaceMuted",
              ].join(" ")}
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Personas activas
              </p>
              <p className="mt-2 text-2xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                {dashboard.totalPersonas}
              </p>
              <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Nuevos: {dashboard.totalNuevos} | Miembros:{" "}
                {dashboard.totalMiembros}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lgc-primary/10 dark:bg-lgc-darkPrimary/20">
              <img
                src="/person.svg"
                alt="Personas"
                className="h-5 w-5 opacity-80"
              />
            </div>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-lgc-border/40 dark:bg-lgc-darkBorder/40">
            <div
              className="h-full rounded-full bg-lgc-primary dark:bg-lgc-darkPrimary"
              style={{
                width: `${Math.min(
                  100,
                  (dashboard.totalNuevos /
                    (dashboard.totalPersonas || 1)) *
                    100
                )}%`,
              }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Nuevos registros
              </p>
              <p className="mt-2 text-2xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                {dashboard.nuevosEnPeriodo}
              </p>
              <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                {dashboard.nuevosDelta === null
                  ? "Sin base previa"
                  : `${dashboard.nuevosDelta > 0 ? "+" : ""}${
                      dashboard.nuevosDelta
                    }% vs periodo anterior`}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lgc-manna/40 dark:bg-lgc-darkSurfaceMuted">
              <img
                src="/person_add.svg"
                alt="Nuevos"
                className="h-5 w-5 opacity-80"
              />
            </div>
          </div>
          <p className="mt-4 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Rango activo: ultimos {range.days} dias
          </p>
        </div>

        <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Avance promedio ruta
              </p>
              <p className="mt-2 text-2xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                {dashboard.avancePercent}%
              </p>
              <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Completadas: {dashboard.seguimientosCompletados} de{" "}
                {dashboard.totalSeguimientos}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lgc-olive/30 dark:bg-lgc-darkSurfaceMuted">
              <img
                src="/road.svg"
                alt="Ruta"
                className="h-5 w-5 opacity-80"
              />
            </div>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-lgc-border/40 dark:bg-lgc-darkBorder/40">
            <div
              className="h-full rounded-full bg-lgc-olive dark:bg-lgc-darkPrimary"
              style={{ width: `${dashboard.avancePercent}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Seguimientos activos
              </p>
              <p className="mt-2 text-2xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                {dashboard.seguimientosEnProceso}
              </p>
              <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Pendientes: {dashboard.seguimientosPendientes}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lgc-danger/10 dark:bg-lgc-darkSurfaceMuted">
              <img
                src="/list.svg"
                alt="Seguimiento"
                className="h-5 w-5 opacity-80"
              />
            </div>
          </div>
          <p className="mt-4 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Tasa de cumplimiento: {dashboard.completionRate}%
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
              Distribucion por estado
            </h3>
            <span className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Personas actuales
            </span>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            {[
              { label: "Nuevos", value: dashboard.totalNuevos },
              {
                label: "Asistentes regulares",
                value: dashboard.totalAsistentes,
              },
              { label: "Miembros", value: dashboard.totalMiembros },
            ].map((item) => {
              const percent = Math.round(
                (item.value / (dashboard.totalPersonas || 1)) * 100
              );
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      {item.label}
                    </span>
                    <span className="text-xs font-medium text-lgc-text dark:text-lgc-darkText">
                      {item.value} ({percent}%)
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-lgc-border/40 dark:bg-lgc-darkBorder/40">
                    <div
                      className="h-full rounded-full bg-lgc-primary dark:bg-lgc-darkPrimary"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <h3 className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Alertas clave
          </h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl border border-lgc-border/60 bg-lgc-surfaceMuted px-3 py-2 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted">
              <span className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Personas sin contacto 14+ dias
              </span>
              <span className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                {dashboard.sinContacto}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-lgc-border/60 bg-lgc-surfaceMuted px-3 py-2 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted">
              <span className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Seguimientos pendientes
              </span>
              <span className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                {dashboard.seguimientosPendientes}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-lgc-border/60 bg-lgc-surfaceMuted px-3 py-2 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted">
              <span className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Seguimientos en proceso
              </span>
              <span className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                {dashboard.seguimientosEnProceso}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <h3 className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Actividad reciente
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            {dashboard.contactosRecientes.length === 0 && (
              <li className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                No hay registros en este rango.
              </li>
            )}
            {dashboard.contactosRecientes.map((contacto) => {
              const persona = personasMock.find(
                (p) => p.id === contacto.personaId
              );
              return (
                <li
                  key={contacto.id}
                  className="flex items-start justify-between rounded-xl border border-lgc-border/60 bg-lgc-surfaceMuted px-3 py-2 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted"
                >
                  <div>
                    <p className="text-sm font-medium text-lgc-text dark:text-lgc-darkText">
                      {persona?.nombreCompleto ??
                        "Persona sin nombre"}
                    </p>
                    <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      {contacto.tipo} ·{" "}
                      {dashboard.formatShort(contacto.fecha)}
                    </p>
                  </div>
                  <span className="text-[11px] uppercase text-lgc-textMuted dark:text-lgc-darkTextMuted">
                    contacto
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <h3 className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Avance por paso de ruta
          </h3>
          <div className="mt-4 space-y-3">
            {dashboard.actividadPorPaso.map((step) => {
              const percent = Math.round(
                (step.completadas / (dashboard.totalPersonas || 1)) *
                  100
              );
              return (
                <div key={step.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                    <span>{step.nombre}</span>
                    <span>{step.completadas} completadas</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-lgc-border/40 dark:bg-lgc-darkBorder/40">
                    <div
                      className="h-full rounded-full bg-lgc-olive dark:bg-lgc-darkPrimary"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
