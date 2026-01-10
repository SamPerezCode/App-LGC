import { useState, type FC } from "react";
import type { RutaCrecimiento } from "../../../../../domain/interfaces/lgc-interfaces";
import Button from "../../../../ui/Button";

type RutaListMobileCardsProps = {
  rutas: RutaCrecimiento[];
  actividadesPorRuta: Map<string, number>;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const formatDate = (value: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  return date.toLocaleDateString("es-CO");
};

const RutaListMobileCards: FC<RutaListMobileCardsProps> = ({
  rutas,
  actividadesPorRuta,
  onView,
  onEdit,
  onDelete,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {rutas.map((ruta) => {
        const isExpanded = expandedId === ruta.id;
        const count = actividadesPorRuta.get(ruta.id) ?? 0;

        return (
          <div
            key={ruta.id}
            className="rounded-xl border border-lgc-border/60 bg-lgc-surface p-3 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-lgc-text dark:text-lgc-darkText">
                  {ruta.nombre}
                </p>
                <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  Actividades: {count}
                </p>
              </div>

              <span className="rounded-full bg-lgc-surfaceMuted px-3 py-1 text-[10px] font-medium text-lgc-text dark:bg-lgc-darkSurface dark:text-lgc-darkText">
                {ruta.activa ? "Activa" : "Inactiva"}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-lgc-textMuted dark:text-lgc-darkTextMuted">
              <span>
                Actualizado: {formatDate(ruta.actualizadoEn)}
              </span>
              <button
                type="button"
                className="font-semibold text-lgc-primary hover:underline dark:text-lgc-manna"
                onClick={() =>
                  setExpandedId((prev) =>
                    prev === ruta.id ? null : ruta.id
                  )
                }
              >
                {isExpanded ? "Ver menos" : "Ver mas"}
              </button>
            </div>

            {isExpanded && (
              <div className="mt-3 space-y-2 text-xs text-lgc-text dark:text-lgc-darkText">
                <div className="flex items-center justify-between">
                  <span className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
                    Aplica a
                  </span>
                  <span>{ruta.aplicaAEstado}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
                    Descripcion
                  </span>
                  <span className="text-right">
                    {ruta.descripcion ?? "-"}
                  </span>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => onView(ruta.id)}>
                    Ver
                  </Button>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onEdit(ruta.id)}
                  >
                    Editar
                  </Button>

                  <Button
                    size="sm"
                    variant="dangerSoft"
                    onClick={() => onDelete(ruta.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {rutas.length === 0 && (
        <p className="text-center text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
          No hay rutas creadas.
        </p>
      )}
    </div>
  );
};

export default RutaListMobileCards;
