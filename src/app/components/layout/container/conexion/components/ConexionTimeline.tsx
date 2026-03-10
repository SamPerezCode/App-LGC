import { useMemo, type FC } from "react";
import type {
  SeguimientoActividadPersona,
  ActividadRutaCrecimiento,
} from "../../../../../../domain/interfaces/lgc-interfaces";

type ConexionTimelineProps = {
  seguimientos: SeguimientoActividadPersona[];
  actividades: ActividadRutaCrecimiento[];
};

const tipoConfig: Record<string, { icon: JSX.Element; color: string; bgColor: string }> = {
  EVENTO: {
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-900/30",
  },
  CURSO: {
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  REUNION: {
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
  MINISTERIO: {
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/30",
  },
};

const defaultConfig = {
  icon: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  color: "text-emerald-600 dark:text-emerald-400",
  bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
};

const formatDate = (iso: string): string => {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ConexionTimeline: FC<ConexionTimelineProps> = ({ seguimientos, actividades }) => {
  const actividadesById = useMemo(
    () => new Map(actividades.map((a) => [a.id, a])),
    [actividades]
  );

  const sortedSeguimientos = useMemo(() => {
    return [...seguimientos]
      .filter((s) => s.estado === "COMPLETADA")
      .sort((a, b) => {
        const dateA = a.fechaCumplimiento ?? a.fechaAsignacion;
        const dateB = b.fechaCumplimiento ?? b.fechaAsignacion;
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
  }, [seguimientos]);

  if (sortedSeguimientos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-4 rounded-full bg-lgc-surfaceMuted p-4 dark:bg-lgc-darkSurfaceMuted">
          <svg
            className="h-8 w-8 text-lgc-textMuted/40 dark:text-lgc-darkTextMuted/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-lgc-text dark:text-lgc-darkText">
          Sin actividades registradas
        </h3>
        <p className="mt-1 max-w-xs text-center text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
          Registra la primera actividad para comenzar a dar seguimiento
        </p>
      </div>
    );
  }

  return (
    <div className="relative space-y-4">
      {/* Timeline line */}
      <div className="absolute bottom-0 left-5 top-0 w-px bg-lgc-border/50 dark:bg-lgc-darkBorder/50" />

      {sortedSeguimientos.map((seg, index) => {
        const actividad = actividadesById.get(seg.actividadRutaId);
        const config = tipoConfig[actividad?.tipo ?? ""] ?? defaultConfig;
        const fecha = seg.fechaCumplimiento ?? seg.fechaAsignacion;
        const isFirst = index === 0;

        return (
          <div key={seg.id} className="relative flex gap-4 pl-1">
            {/* Node */}
            <div
              className={`
                relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl
                transition-all ${config.bgColor}
                ${isFirst ? "ring-2 ring-lgc-primary/20 dark:ring-lgc-darkPrimary/20" : ""}
              `}
            >
              <span className={config.color}>{config.icon}</span>
            </div>

            {/* Content */}
            <div
              className={`
                flex-1 rounded-xl border p-4 transition-all
                ${
                  isFirst
                    ? "border-lgc-primary/20 bg-lgc-primary/5 dark:border-lgc-darkPrimary/20 dark:bg-lgc-darkPrimary/5"
                    : "border-lgc-border/30 bg-lgc-surfaceMuted/30 dark:border-lgc-darkBorder/30 dark:bg-lgc-darkSurfaceMuted/30"
                }
              `}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase ${config.bgColor} ${config.color}`}>
                      {actividad?.tipo ?? "Actividad"}
                    </span>
                    {isFirst && (
                      <span className="rounded-full bg-lgc-primary/10 px-2 py-0.5 text-[10px] font-medium text-lgc-primary dark:bg-lgc-darkPrimary/10 dark:text-lgc-darkPrimary">
                        Reciente
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-lgc-text dark:text-lgc-darkText">
                    {actividad?.nombre ?? "Actividad no encontrada"}
                  </h4>
                  {seg.observaciones && (
                    <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      {seg.observaciones}
                    </p>
                  )}
                </div>

                <div className="flex-shrink-0 text-right">
                  <span className="text-xs font-medium text-lgc-text dark:text-lgc-darkText">
                    {formatDate(fecha)}
                  </span>
                </div>
              </div>

              {seg.registradoPorUsuarioId && (
                <div className="mt-3 border-t border-lgc-border/20 pt-3 dark:border-lgc-darkBorder/20">
                  <span className="text-[10px] text-lgc-textMuted dark:text-lgc-darkTextMuted">
                    Registrado por {seg.registradoPorUsuarioId}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConexionTimeline;
