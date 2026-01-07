import { useMemo, type FC } from "react";
import type {
  EstadoActividadSeguimiento,
  Persona,
  SeguimientoActividadPersona,
  RutaCrecimiento,
  ActividadRutaCrecimiento,
} from "../../../../../domain/interfaces/lgc-interfaces";

interface SeguimientoSectionProps {
  persona: Persona;
  rutas: RutaCrecimiento[];
  actividades: ActividadRutaCrecimiento[];
  seguimientos: SeguimientoActividadPersona[];
  setSeguimientos: React.Dispatch<
    React.SetStateAction<SeguimientoActividadPersona[]>
  >;
  onBack: () => void;
}

const SeguimientoSection: FC<SeguimientoSectionProps> = ({
  persona,
  rutas,
  actividades,
  seguimientos,
  setSeguimientos,
  onBack,
}) => {
  // 1) ruta aplicable por estado
  const rutaAplicable = useMemo(() => {
    return (
      rutas.find(
        (r) => r.activa && r.aplicaAEstado === persona.estado
      ) ?? null
    );
  }, [rutas, persona.estado]);

  // 2) actividades de esa ruta
  const actividadesDeRuta = useMemo(() => {
    if (!rutaAplicable) return [];
    return actividades
      .filter((a) => a.rutaId === rutaAplicable.id)
      .sort((a, b) => a.orden - b.orden);
  }, [actividades, rutaAplicable]);

  // 3) índice rápido de seguimiento
  const seguimientoByActividad = useMemo(() => {
    const map = new Map<string, SeguimientoActividadPersona>();
    for (const s of seguimientos) {
      if (s.personaId === persona.id) {
        map.set(s.actividadRutaId, s);
      }
    }
    return map;
  }, [seguimientos, persona.id]);

  // 4) actividades con estado de seguimiento (default PENDIENTE)
  const actividadesConEstado = useMemo(() => {
    return actividadesDeRuta.map((a) => {
      const s = seguimientoByActividad.get(a.id);
      return {
        ...a,
        estadoSeguimiento: (s?.estado ??
          "PENDIENTE") as EstadoActividadSeguimiento,
      };
    });
  }, [actividadesDeRuta, seguimientoByActividad]);

  const total = actividadesConEstado.length;
  const completadas = actividadesConEstado.filter(
    (a) => a.estadoSeguimiento === "COMPLETADA"
  ).length;

  const setEstadoActividad = (
    actividadId: string,
    estado: EstadoActividadSeguimiento
  ) => {
    const now = new Date().toISOString();

    setSeguimientos((prev) => {
      const idx = prev.findIndex(
        (s) =>
          s.personaId === persona.id &&
          s.actividadRutaId === actividadId
      );

      if (idx === -1) {
        return [
          ...prev,
          {
            id: `SEG-${Date.now()}`,
            personaId: persona.id,
            actividadRutaId: actividadId,
            estado,
            fechaAsignacion: now,
            fechaCumplimiento:
              estado === "COMPLETADA" ? now : undefined,
          },
        ];
      }

      return prev.map((s, i) =>
        i === idx
          ? {
              ...s,
              estado,
              fechaCumplimiento:
                estado === "COMPLETADA" ? now : undefined,
            }
          : s
      );
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="
            inline-flex items-center gap-2 rounded-xl border border-lgc-border/70
            bg-lgc-surfaceMuted px-4 py-2 text-xs md:text-sm font-medium text-lgc-text
            hover:bg-lgc-surface
            dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
            dark:hover:bg-lgc-darkSurface
          "
        >
          <span className="text-base leading-none">←</span>
          Volver
        </button>

        <div className="text-xs md:text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
          Progreso:{" "}
          <span className="font-semibold text-lgc-text dark:text-lgc-darkText">
            {completadas}/{total}
          </span>
        </div>
      </div>

      {/* persona + ruta */}
      <div
        className="
          rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
          dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
        "
      >
        <h3 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
          Seguimiento — {persona.nombreCompleto}
        </h3>

        <div className="mt-2 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
          Estado:{" "}
          <span className="font-semibold">{persona.estado}</span>
        </div>

        {rutaAplicable ? (
          <div className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Ruta asignada:{" "}
            <span className="font-semibold text-lgc-text dark:text-lgc-darkText">
              {rutaAplicable.nombre}
            </span>
          </div>
        ) : (
          <div className="mt-2 text-sm text-lgc-danger">
            No hay ruta activa asignada para el estado{" "}
            {persona.estado}.
          </div>
        )}
      </div>

      {/* actividades */}
      {rutaAplicable && (
        <div
          className="
            rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
            dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
          "
        >
          <h4 className="text-sm md:text-base font-semibold text-lgc-text dark:text-lgc-darkText">
            Actividades
          </h4>

          <div className="mt-4 space-y-3">
            {actividadesConEstado.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl border border-lgc-border/50 bg-lgc-surfaceMuted/40 p-4
                           dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      Actividad {a.orden} • {a.tipo}
                    </div>

                    <div className="mt-1 text-sm font-semibold text-lgc-text dark:text-lgc-darkText">
                      {a.nombre}
                    </div>

                    {a.descripcion && (
                      <div className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                        {a.descripcion}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={a.estadoSeguimiento}
                      onChange={(e) =>
                        setEstadoActividad(
                          a.id,
                          e.target.value as EstadoActividadSeguimiento
                        )
                      }
                      className="
                        rounded-xl border border-lgc-border/70 bg-lgc-surface px-3 py-2 text-xs
                        text-lgc-text outline-none
                        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
                      "
                    >
                      <option value="PENDIENTE">Pendiente</option>
                      <option value="EN_PROCESO">En proceso</option>
                      <option value="COMPLETADA">Completada</option>
                      <option value="CANCELADA">Cancelada</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            {actividadesConEstado.length === 0 && (
              <div className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Esta ruta aún no tiene actividades.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeguimientoSection;
