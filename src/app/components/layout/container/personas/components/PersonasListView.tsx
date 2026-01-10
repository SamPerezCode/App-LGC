import { useState, type FC, type ChangeEvent } from "react";
import type { Persona } from "../../../../../../domain/interfaces/lgc-interfaces";
import { estadoLabel, formatFecha } from "../personas.utils";
import Button from "../../../../../ui/Button";

type PersonasListViewProps = {
  search: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCreate: () => void;
  pageItems: Persona[];
  filteredCount: number;
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onSeguimiento: (id: string) => void;
};

const PersonasListView: FC<PersonasListViewProps> = ({
  search,
  onSearchChange,
  onCreate,
  pageItems,
  filteredCount,
  page,
  totalPages,
  onPrev,
  onNext,
  onView,
  onEdit,
  onSeguimiento,
}) => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(
    null
  );

  return (
    <>
      {/* Buscador + botón */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="w-full md:max-w-sm">
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o estado..."
            value={search}
            onChange={onSearchChange}
            className="
              w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80
              px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
              focus:border-transparent focus:ring-2 focus:ring-lgc-primary focus:ring-offset-1 focus:ring-offset-lgc-surface
              dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
              dark:focus:ring-lgc-darkPrimary dark:focus:ring-offset-lgc-darkSurface
            "
          />
        </div>

        <button
          type="button"
          onClick={onCreate}
          className="
            inline-flex items-center justify-center rounded-xl
            bg-lgc-primary px-4 py-2 text-xs md:text-sm font-semibold text-lgc-onPrimary
            shadow-sm hover:bg-lgc-primarySoft
            dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
            transition-colors
          "
        >
          Registrar persona
        </button>
      </div>

      {/* === TABLA (desktop) === */}
      <div className="hidden md:block">
        <div className="overflow-x-auto rounded-xl border border-lgc-border/60 dark:border-lgc-darkBorder/70">
          <table className="min-w-full text-left text-xs md:text-sm">
            <thead className="bg-lgc-surfaceMuted dark:bg-lgc-darkSurface">
              <tr>
                <th className="px-4 py-2 font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  Nombre
                </th>
                <th className="px-4 py-2 font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  Teléfono
                </th>
                <th className="px-4 py-2 font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  Estado
                </th>
                <th className="px-4 py-2 font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  Última actualización
                </th>
                <th className="px-4 py-2 font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((persona) => (
                <tr
                  key={persona.id}
                  className="border-t border-lgc-border/40 dark:border-lgc-darkBorder/40"
                >
                  <td className="px-4 py-2">
                    {persona.nombreCompleto}
                  </td>
                  <td className="px-4 py-2">
                    {persona.telefono ?? "-"}
                  </td>
                  <td className="px-4 py-2">
                    {estadoLabel[persona.estado]}
                  </td>
                  <td className="px-4 py-2">
                    {formatFecha(persona.actualizadoEn)}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
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
                  </td>
                </tr>
              ))}

              {pageItems.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-4 text-center text-xs md:text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted"
                  >
                    No se encontraron personas con ese criterio.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* === CARDS (mobile) === */}
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

      {/* Paginador */}
      <div
        className="
          flex flex-col items-center gap-3 pt-4
          text-xs md:flex-row md:justify-center md:gap-6 md:text-sm
        "
      >
        <span className="text-lgc-textMuted dark:text-lgc-darkTextMuted text-center">
          Mostrando{" "}
          <span className="font-semibold">{pageItems.length}</span> de{" "}
          <span className="font-semibold">{filteredCount}</span>{" "}
          personas
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={page === 1}
            className="
              rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-1
              text-xs md:text-sm text-lgc-text
              disabled:cursor-not-allowed disabled:opacity-50
              hover:bg-lgc-surface
              dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
              dark:hover:bg-lgc-darkSurface
            "
          >
            Anterior
          </button>

          <span className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Página <span className="font-semibold">{page}</span> de{" "}
            <span className="font-semibold">{totalPages}</span>
          </span>

          <button
            type="button"
            onClick={onNext}
            disabled={page === totalPages}
            className="
              rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-1
              text-xs md:text-sm text-lgc-text
              disabled:cursor-not-allowed disabled:opacity-50
              hover:bg-lgc-surface
              dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
              dark:hover:bg-lgc-darkSurface
            "
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default PersonasListView;
