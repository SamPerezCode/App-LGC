import { useMemo, type FC } from "react";
import type {
  SeguimientoActividadPersona,
  ActividadRutaCrecimiento,
} from "../../../../../../domain/interfaces/lgc-interfaces";

type ConexionTimelineProps = {
  seguimientos: SeguimientoActividadPersona[];
  actividades: ActividadRutaCrecimiento[];
};

const tipoIcons: Record<string, JSX.Element> = {
  EVENTO: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  CURSO: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  REUNION: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  MINISTERIO: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
};

const formatDate = (iso: string): string => {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (iso: string): string => {
  return new Date(iso).toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
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
      <div className="flex flex-col items-center justify-center py-8">
        <div
          className="
            mb-3 flex h-12 w-12 items-center justify-center rounded-full
            bg-lgc-surfaceMuted dark:bg-lgc-darkSurfaceMuted
          "
        >
          <svg
            className="h-6 w-6 text-lgc-textMuted/50 dark:text-lgc-darkTextMuted/50"
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
        <p className="text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
          Aun no hay actividades registradas
        </p>
        <p className="mt-1 text-xs text-lgc-textMuted/70 dark:text-lgc-darkTextMuted/70">
          Registra la primera actividad para comenzar el seguimiento
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div
        className="
          absolute bottom-0 left-5 top-0 w-px
          bg-lgc-border/50 dark:bg-lgc-darkBorder/50
        "
      />

      <div className="flex flex-col gap-4">
        {sortedSeguimientos.map((seg, index) => {
          const actividad = actividadesById.get(seg.actividadRutaId);
          const fecha = seg.fechaCumplimiento ?? seg.fechaAsignacion;
          const isFirst = index === 0;

          return (
            <div key={seg.id} className="relative flex gap-4 pl-2">
              {/* Timeline node */}
              <div
                className={`
                  relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full
                  ${
                    isFirst
                      ? "bg-lgc-olive text-lgc-manna"
                      : "bg-lgc-surfaceMuted text-lgc-textMuted dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkTextMuted"
                  }
                `}
              >
                {tipoIcons[actividad?.tipo ?? "EVENTO"]}
              </div>

              {/* Content */}
              <div
                className={`
                  flex-1 rounded-xl border p-4 transition-all
                  ${
                    isFirst
                      ? "border-lgc-olive/30 bg-lgc-olive/5 dark:border-lgc-olive/20 dark:bg-lgc-olive/10"
                      : "border-lgc-border/40 bg-lgc-surfaceMuted/30 dark:border-lgc-darkBorder/40 dark:bg-lgc-darkSurfaceMuted/30"
                  }
                `}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`
                          rounded-full px-2 py-0.5 text-[10px] font-medium uppercase
                          ${
                            isFirst
                              ? "bg-lgc-olive/20 text-lgc-everdeep dark:bg-lgc-olive/30 dark:text-lgc-olive"
                              : "bg-lgc-border/40 text-lgc-textMuted dark:bg-lgc-darkBorder/40 dark:text-lgc-darkTextMuted"
                          }
                        `}
                      >
                        {actividad?.tipo ?? "Actividad"}
                      </span>
                    </div>

                    <h4
                      className={`
                        mt-2 text-sm font-medium
                        ${
                          isFirst
                            ? "text-lgc-everdeep dark:text-lgc-darkPrimary"
                            : "text-lgc-text dark:text-lgc-darkText"
                        }
                      `}
                    >
                      {actividad?.nombre ?? "Actividad no encontrada"}
                    </h4>

                    {seg.observaciones && (
                      <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                        {seg.observaciones}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1 text-right">
                    <span className="text-xs font-medium text-lgc-text dark:text-lgc-darkText">
                      {formatDate(fecha)}
                    </span>
                    <span className="text-[10px] text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      {formatTime(fecha)}
                    </span>
                  </div>
                </div>

                {seg.registradoPorUsuarioId && (
                  <div className="mt-3 border-t border-lgc-border/20 pt-2 dark:border-lgc-darkBorder/20">
                    <span className="text-[10px] text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      Registrado por: {seg.registradoPorUsuarioId}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConexionTimeline;
