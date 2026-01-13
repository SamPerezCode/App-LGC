import { useState, type FC } from "react";
import type { Persona } from "../../../../../../domain/interfaces/lgc-interfaces";
import { estadoLabel, formatFecha } from "../personas.utils";
import Button from "../../../../../ui/Button";

type PersonasListViewMobileProps = {
  pageItems: Persona[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onSeguimiento: (id: string) => void;
};

const PersonasListViewMobile: FC<PersonasListViewMobileProps> = ({
  pageItems,
  onView,
  onEdit,
  onSeguimiento,
}) => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(
    null
  );

  return (
    <div className="space-y-3 md:hidden">
      {pageItems.map((persona) => {
        const isExpanded = expandedCardId === persona.id;

        return (
          <div
            key={persona.id}
            className="rounded-xl border border-lgc-border/60 bg-lgc-surface p-3 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-lgc-text dark:text-lgc-darkText">
                  {persona.nombreCompleto}
                </p>
                <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  {persona.telefono ?? "-"}
                </p>
              </div>

              <span className="rounded-full bg-lgc-surfaceMuted px-3 py-1 text-[10px] font-medium text-lgc-text dark:bg-lgc-darkSurface dark:text-lgc-darkText">
                {estadoLabel[persona.estado]}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-lgc-textMuted dark:text-lgc-darkTextMuted">
              <span>
                Actualizado: {formatFecha(persona.actualizadoEn)}
              </span>
              <button
                type="button"
                className="font-semibold text-lgc-primary hover:underline dark:text-lgc-manna"
                onClick={() =>
                  setExpandedCardId((prev) =>
                    prev === persona.id ? null : persona.id
                  )
                }
              >
                {isExpanded ? "Ver menos" : "Ver más"}
              </button>
            </div>

            {isExpanded && (
              <div className="mt-3 space-y-2 text-xs text-lgc-text dark:text-lgc-darkText">
                <div className="flex items-center justify-between">
                  <span className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
                    Correo
                  </span>
                  <span>{persona.correo ?? "-"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
                    Dirección
                  </span>
                  <span className="text-right">
                    {persona.direccion ?? "-"}
                  </span>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <Button
                    onClick={() => onView(persona.id)}
                    size="sm"
                  >
                    Ver
                  </Button>

                  <Button
                    onClick={() => onEdit(persona.id)}
                    variant="primary"
                    size="sm"
                  >
                    Editar
                  </Button>

                  <Button
                    size="sm"
                    variant="accentSoft"
                    onClick={() => onSeguimiento(persona.id)}
                  >
                    Seguimiento
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {pageItems.length === 0 && (
        <p className="text-center text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
          No se encontraron personas con ese criterio.
        </p>
      )}
    </div>
  );
};

export default PersonasListViewMobile;
