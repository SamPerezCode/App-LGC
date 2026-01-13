import { type FC, type ChangeEvent } from "react";
import type { Persona } from "../../../../../../domain/interfaces/lgc-interfaces";
import { estadoLabel, formatFecha } from "../personas.utils";
import Button from "../../../../../ui/Button";
import Pagination from "../../../../../ui/Pagination";
import PersonasListViewMobile from "./PersonasListViewMobile";

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
      <PersonasListViewMobile
        pageItems={pageItems}
        onView={onView}
        onEdit={onEdit}
        onSeguimiento={onSeguimiento}
      />

      {/* Paginador */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        showingCount={pageItems.length}
        totalCount={filteredCount}
        itemLabel="personas"
        onPrev={onPrev}
        onNext={onNext}
      />
    </>
  );
};

export default PersonasListView;
