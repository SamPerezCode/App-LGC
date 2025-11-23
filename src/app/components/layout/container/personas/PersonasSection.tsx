// src/app/components/layout/container/personas/PersonasSection.tsx
import type { FC } from "react";

import RegistrarPersonaForm from "./RegistrarPersonaForm";
import { estadoLabel, formatFecha } from "./personas.utils";
import { usePersonasSection } from "./usePersonasSection";
import SuccessModal from "../../../common/SuccessModal";

const PersonasSection: FC = () => {
  const {
    view,
    setView,
    search,
    page,
    successMessage,
    filtered,
    pageItems,
    totalPages,
    handleSearchChange,
    handlePrev,
    handleNext,
    handleSavePersona,
    closeSuccessMessage,
  } = usePersonasSection();

  return (
    <div
      className="
        relative
        w-full
        rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
      "
    >
      {/* Modal de éxito reutilizable */}
      <SuccessModal
        open={!!successMessage}
        title="Registro exitoso"
        message="La persona se registró correctamente. Puedes agregar otra si lo deseas."
        onClose={closeSuccessMessage}
      />

      <div className="space-y-4 md:space-y-6">
        {/* Título */}
        <div>
          <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Personas de la iglesia
          </h2>
        </div>

        {/* === LISTADO === */}
        {view === "list" && (
          <>
            {/* Buscador + botón */}
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="w-full md:max-w-sm">
                <input
                  type="text"
                  placeholder="Buscar por nombre, teléfono o estado..."
                  value={search}
                  onChange={handleSearchChange}
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
                onClick={() => setView("create")}
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

            {/* Tabla */}
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
                      <td className="px-4 py-2">{persona.nombreCompleto}</td>
                      <td className="px-4 py-2">{persona.telefono ?? "-"}</td>
                      <td className="px-4 py-2">{estadoLabel[persona.estado]}</td>
                      <td className="px-4 py-2">{formatFecha(persona.actualizadoEn)}</td>
                      <td className="px-4 py-2">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="
                              text-xs font-medium text-lgc-primary hover:underline
                              dark:text-lgc-manna
                            "
                          >
                            Ver
                          </button>
                          <button
                            type="button"
                            className="
                              text-xs font-medium text-lgc-textMuted hover:text-lgc-primary hover:underline
                              dark:text-lgc-darkTextMuted dark:hover:text-lgc-manna
                            "
                          >
                            Editar
                          </button>
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

            {/* Paginador */}
            <div
              className="
                flex flex-col items-center gap-3 pt-4
                text-xs md:flex-row md:justify-center md:gap-6 md:text-sm
              "
            >
              <span className="text-lgc-textMuted dark:text-lgc-darkTextMuted text-center">
                Mostrando <span className="font-semibold">{pageItems.length}</span> de{" "}
                <span className="font-semibold">{filtered.length}</span> personas
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
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
                  onClick={handleNext}
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
        )}

        {/* === FORMULARIO === */}
        {view === "create" && (
          <RegistrarPersonaForm onCancel={() => setView("list")} onSave={handleSavePersona} />
        )}
      </div>
    </div>
  );
};

export default PersonasSection;
