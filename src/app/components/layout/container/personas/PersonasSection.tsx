// src/app/components/layout/container/personas/PersonasSection.tsx
import { useState, type FC } from "react";
import RegistrarPersonaForm from "./RegistrarPersonaForm";
import { estadoLabel, formatFecha } from "./personas.utils";
import { usePersonasSection } from "./usePersonasSection";
import SuccessModal from "../../../common/SuccessModal";
import type { PersonaCreateInput } from "./personas.types";
import type { Persona } from "../../../../../domain/interfaces/lgc-interfaces";
import SeguimientoSection from "../seguimiento/SeguimientoSection";

const PersonasSection: FC = () => {
  const {
    view,
    setView,
    selectedPersona,
    resetSelection,
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
    handleViewPersona,
    handleEditPersona,
    handleUpdatePersona,
    closeSuccessMessage,
    handleSeguimientoPersona,
  } = usePersonasSection();

  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const handleBackToList = () => {
    setView("list");
    resetSelection();
    setExpandedCardId(null);
  };

  const personaToFormInput = (persona: Persona | null): PersonaCreateInput | null => {
    if (!persona) return null;

    return {
      // Mapeo
      // obligatorios
      nombreCompleto: persona.nombreCompleto ?? "",
      telefono: persona.telefono ?? "",

      // opcionales
      correo: persona.correo,
      direccion: persona.direccion,
      genero: persona.genero,
      estadoCivil: persona.estadoCivil,
      fechaNacimiento: persona.fechaNacimiento,
      tipoDocumento: persona.tipoDocumento,
      numeroDocumento: persona.numeroDocumento,

      // opcional(futuro)
      estado: persona.estado ?? "NUEVO",
    };
  };

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
        title="Acción exitosa"
        message={successMessage ?? "La operación se completó correctamente."}
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
                        <td className="px-4 py-2">{persona.nombreCompleto}</td>
                        <td className="px-4 py-2">{persona.telefono ?? "-"}</td>
                        <td className="px-4 py-2">{estadoLabel[persona.estado]}</td>
                        <td className="px-4 py-2">{formatFecha(persona.actualizadoEn)}</td>
                        <td className="px-4 py-2">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleViewPersona(persona.id)}
                              className="
                                rounded-full border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-1
                                text-[11px] font-medium text-lgc-text hover:bg-lgc-surface
                                dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
                                dark:hover:bg-lgc-darkSurface
                              "
                            >
                              Ver
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEditPersona(persona.id)}
                              className="
                                rounded-full bg-lgc-primary px-3 py-1 text-[11px] font-semibold text-lgc-onPrimary
                                shadow-sm hover:bg-lgc-primarySoft
                                dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
                              "
                            >
                              Editar
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSeguimientoPersona(persona.id)}
                              className="
                                rounded-full border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-1
                                text-[11px] font-medium text-lgc-text hover:bg-lgc-surface
                                dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
                                dark:hover:bg-lgc-darkSurface
                              "
                            >
                              Seguimiento
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
            </div>

            {/* === CARDS (móvil) === */}
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
                      <span>Actualizado: {formatFecha(persona.actualizadoEn)}</span>
                      <button
                        type="button"
                        className="font-semibold text-lgc-primary hover:underline dark:text-lgc-manna"
                        onClick={() =>
                          setExpandedCardId((prev) => (prev === persona.id ? null : persona.id))
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
                          <span className="text-right">{persona.direccion ?? "-"}</span>
                        </div>

                        <div className="pt-2 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleViewPersona(persona.id)}
                            className="rounded-full border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-1 text-[11px] font-medium text-lgc-text hover:bg-lgc-surface dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText dark:hover:bg-lgc-darkSurface"
                          >
                            Ver
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditPersona(persona.id)}
                            className="rounded-full bg-lgc-primary px-3 py-1 text-[11px] font-semibold text-lgc-onPrimary shadow-sm hover:bg-lgc-primarySoft dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna"
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSeguimientoPersona(persona.id)}
                            className="
                              rounded-full border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-1
                              text-[11px] font-medium text-lgc-text hover:bg-lgc-surface
                              dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
                              dark:hover:bg-lgc-darkSurface
                            "
                          >
                            Seguimiento
                          </button>
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

        {/* === FORMULARIO CREAR === */}
        {view === "create" && (
          <RegistrarPersonaForm onCancel={() => setView("list")} onSave={handleSavePersona} />
        )}

        {/* === DETALLE === */}
        {view === "detail" && (
          <div className="space-y-4">
            {/* Botones superiores */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleBackToList}
                className="
                  inline-flex items-center gap-1 rounded-full border border-lgc-border/70
                  bg-lgc-surfaceMuted px-4 py-1.5 text-xs md:text-sm font-medium text-lgc-text
                  hover:bg-lgc-surface
                  dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
                  dark:hover:bg-lgc-darkSurface
                "
              >
                <span className="text-base leading-none">←</span>
                <span>Volver al listado</span>
              </button>

              {selectedPersona && (
                <button
                  type="button"
                  onClick={() => handleEditPersona(selectedPersona.id)}
                  className="
                    inline-flex items-center gap-1 rounded-full bg-lgc-primary px-4 py-1.5
                    text-xs md:text-sm font-semibold text-lgc-onPrimary shadow-sm
                    hover:bg-lgc-primarySoft
                    dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
                  "
                >
                  Editar
                </button>
              )}
            </div>

            {selectedPersona ? (
              <div className="space-y-4 rounded-xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      Nombre completo
                    </p>
                    <p className="mt-1 text-sm md:text-base font-semibold text-lgc-text dark:text-lgc-darkText">
                      {selectedPersona.nombreCompleto}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      Teléfono
                    </p>
                    <p className="mt-1 text-sm text-lgc-text dark:text-lgc-darkText">
                      {selectedPersona.telefono ?? "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      Correo
                    </p>
                    <p className="mt-1 text-sm text-lgc-text dark:text-lgc-darkText">
                      {selectedPersona.correo ?? "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      Dirección
                    </p>
                    <p className="mt-1 text-sm text-lgc-text dark:text-lgc-darkText">
                      {selectedPersona.direccion ?? "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      Género
                    </p>
                    <p className="mt-1 text-sm text-lgc-text dark:text-lgc-darkText">
                      {selectedPersona.genero === "MASCULINO" ? "Masculino" : "Femenino"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      Estado civil
                    </p>
                    <p className="mt-1 text-sm text-lgc-text dark:text-lgc-darkText">
                      {selectedPersona.estadoCivil}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      Fecha de nacimiento
                    </p>
                    <p className="mt-1 text-sm text-lgc-text dark:text-lgc-darkText">
                      {selectedPersona.fechaNacimiento
                        ? formatFecha(selectedPersona.fechaNacimiento)
                        : "-"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap justify-between gap-3 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  <span>
                    Estado en la iglesia:{" "}
                    <span className="font-semibold text-lgc-text dark:text-lgc-darkText">
                      {estadoLabel[selectedPersona.estado]}
                    </span>
                  </span>
                  <span>Última actualización: {formatFecha(selectedPersona.actualizadoEn)}</span>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-lgc-border/60 bg-lgc-surface p-4 text-xs text-lgc-textMuted shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkTextMuted">
                No se encontró la información de la persona seleccionada.
              </div>
            )}
          </div>
        )}

        {/* === EDICIÓN === */}
        {view === "edit" && (
          <div className="space-y-4">
            {/* Botón volver */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setView(selectedPersona ? "detail" : "list")}
                className="
                  inline-flex items-center gap-1 rounded-full border border-lgc-border/70
                  bg-lgc-surfaceMuted px-4 py-1.5 text-xs md:text-sm font-medium text-lgc-text
                  hover:bg-lgc-surface
                  dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
                  dark:hover:bg-lgc-darkSurface
                "
              >
                <span className="text-base leading-none">←</span>
                <span>Volver</span>
              </button>
            </div>

            {selectedPersona ? (
              <RegistrarPersonaForm
                onSave={handleUpdatePersona}
                onCancel={() => setView("detail")}
                initialData={personaToFormInput(selectedPersona) ?? undefined}
                submitLabel="Guardar cambios"
              />
            ) : (
              <div
                className="
                  rounded-xl border border-lgc-border/60 bg-lgc-surface p-4 text-xs
                  text-lgc-textMuted shadow-sm
                  dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkTextMuted
                "
              >
                No se encontró la persona que deseas editar.
              </div>
            )}
          </div>
        )}

        {view === "seguimiento" && selectedPersona && (
          <SeguimientoSection persona={selectedPersona} onBack={() => setView("list")} />
        )}

        {view === "seguimiento" && !selectedPersona && (
          <p className="text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
            No hay persona seleccionada.
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonasSection;
