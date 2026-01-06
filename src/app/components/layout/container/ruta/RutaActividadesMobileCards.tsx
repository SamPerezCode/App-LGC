import { useState, type FC } from "react";

type ActividadItem = {
  id: string;
  orden: number;
  nombre: string;
  tipo: string;
  activa: boolean;
  descripcion?: string;
};

interface RutaActividadesMobileCardsProps {
  actividades: ActividadItem[];
  onEdit: (id: string) => void;
  onToggleActiva: (id: string) => void;
}

const RutaActividadesMobileCards: FC<RutaActividadesMobileCardsProps> = ({
  actividades,
  onEdit,
  onToggleActiva,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {actividades.map((act) => {
        const isExpanded = expandedId === act.id;

        return (
          <div
            key={act.id}
            className="
              rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm
              dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
            "
          >
            {/* Header card */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  Actividad {act.orden}
                </p>

                <h4 className="mt-1 truncate text-sm font-semibold text-lgc-text dark:text-lgc-darkText">
                  {act.nombre}
                </h4>

                <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  Tipo: <span className="font-medium">{act.tipo}</span>
                </p>
              </div>

              {/* Badge activa */}
              <span
                className={`
    inline-flex items-center justify-center
    w-20 px-3 py-1
    rounded-full text-[11px] font-medium
    ${
      act.activa
        ? "bg-lgc-surfaceMuted text-lgc-text dark:bg-lgc-darkSurface dark:text-lgc-darkText"
        : "bg-lgc-surfaceMuted/60 text-lgc-textMuted dark:bg-lgc-darkSurface dark:text-lgc-darkTextMuted"
    }
  `}
              >
                {act.activa ? "Activa" : "Inactiva"}
              </span>
            </div>

            {/* Descripción */}
            {act.descripcion && (
              <div className="rounded-xl border my-2 border-lgc-border/60 bg-lgc-surfaceMuted/60 p-3 text-xs text-lgc-text dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface dark:text-lgc-darkText">
                {act.descripcion}
              </div>
            )}

            {/* Expand */}
            <div className="mt-3 flex items-center justify-end">
              <button
                type="button"
                onClick={() => toggleExpand(act.id)}
                className="text-xs font-semibold text-lgc-primary hover:text-lgc-primarySoft dark:text-lgc-darkPrimary"
              >
                {isExpanded ? "Ver menos" : "Ver más"}
              </button>
            </div>

            {/* Details + acciones */}
            {isExpanded && (
              <div className="mt-3 space-y-3">
                {/* Acciones */}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(act.id)}
                    className="
                      rounded-full bg-lgc-primary px-4 py-2 text-[11px] font-semibold text-lgc-onPrimary
                      shadow-sm hover:bg-lgc-primarySoft
                      dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
                    "
                  >
                    Editar
                  </button>

                  {/* Toggle visual */}
                  <button
                    type="button"
                    onClick={() => onToggleActiva(act.id)}
                    className="
                      inline-flex items-center justify-between
                      w-28 px-3 py-1
                      rounded-full border border-lgc-border/70
                      bg-lgc-surfaceMuted
                      text-[11px] font-medium text-lgc-text
                      hover:bg-lgc-surface
                      dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
                      transition-colors
                    "
                    aria-pressed={act.activa}
                  >
                    <span className="min-w-[52px] text-left">
                      {act.activa ? "Activa" : "Inactiva"}
                    </span>

                    <span
                      className={`
    relative inline-flex h-5 w-9 items-center rounded-full transition-colors
    ${act.activa ? "bg-lgc-primary" : "bg-lgc-border/60 dark:bg-lgc-darkBorder/60"}
  `}
                    >
                      <span
                        className={`
      inline-block h-4 w-4 rounded-full bg-white transition-transform
      ${act.activa ? "translate-x-4" : "translate-x-1"}
    `}
                      />
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {actividades.length === 0 && (
        <div className="rounded-xl border border-lgc-border/60 bg-lgc-surfaceMuted/60 p-4 text-center text-xs text-lgc-textMuted dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface dark:text-lgc-darkTextMuted">
          No hay actividades en esta ruta.
        </div>
      )}
    </div>
  );
};

export default RutaActividadesMobileCards;
