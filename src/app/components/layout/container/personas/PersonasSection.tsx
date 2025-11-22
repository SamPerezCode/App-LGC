// src/app/components/layout/container/personas/PersonasSection.tsx
import { useState, type FC, type ChangeEvent, useEffect } from "react";
import type { Persona } from "../../../../../domain/interfaces/lgc-interfaces";
import { personasMock } from "../../../../../domain/mock-data/lgc-mock";

import RegistrarPersonaForm, { type PersonaCreateInput } from "./RegistrarPersonaForm";
import { estadoLabel, formatFecha, normalizeText } from "./personas.utils";

const PAGE_SIZE = 5;

const PersonasSection: FC = () => {
  const [personas, setPersonas] = useState<Persona[]>(personasMock);

  // vista actual: listado o formulario
  const [view, setView] = useState<"list" | "create">("list");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // cerrar automáticamente el mensaje de éxito después de 3 segundos
  useEffect(() => {
    if (!successMessage) return;

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  // cuando cambia el buscador, reseteamos a página 1
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // término normalizado (sin tildes, en minúsculas, sin espacios extra)
  const term = normalizeText(search);

  const filtered = personas.filter((persona) => {
    if (!term) return true;

    const nombre = normalizeText(persona.nombreCompleto);
    const telefono = normalizeText(persona.telefono ?? "");
    const estadoTexto = normalizeText(estadoLabel[persona.estado] ?? persona.estado);

    return nombre.includes(term) || telefono.includes(term) || estadoTexto.includes(term);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const startIndex = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const handleSavePersona = (data: PersonaCreateInput) => {
    const now = new Date().toISOString();

    const newPersona: Persona = {
      ...data,
      id: `PER-${String(personas.length + 1).padStart(3, "0")}`,
      creadoEn: now,
      actualizadoEn: now,
    };

    setPersonas((prev) => [...prev, newPersona]);
    setView("list");
    setPage(1);

    setSuccessMessage("Persona registrada correctamente.");
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
      {/* Toast / mensaje de éxito */}
      {successMessage && (
        <div
          className="
      fixed inset-0 z-50
      flex items-center justify-center
    "
        >
          <div className="absolute inset-0 bg-black/30" onClick={() => setSuccessMessage(null)} />

          {/* contenido del modal */}
          <div
            className="
        relative z-10
        max-w-xs rounded-2xl border border-lgc-border/70
        bg-lgc-surface/95 px-4 py-3
        text-xs md:text-sm shadow-lg
        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface
      "
          >
            <p className="font-medium text-lgc-primary dark:text-lgc-manna">{successMessage}</p>
          </div>
        </div>
      )}

      <div className="space-y-4 md:space-y-6">
        {/* Título */}
        <div>
          <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Personas de la iglesia
          </h2>
        </div>

        {/* === VISTA LISTADO === */}
        {view === "list" && (
          <>
            {/* Buscador + botón */}
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              {/* Buscador */}
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

              {/* Botón Registrar persona -> cambia a vista "create" */}
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

        {/* === VISTA FORMULARIO === */}
        {view === "create" && (
          <RegistrarPersonaForm onCancel={() => setView("list")} onSave={handleSavePersona} />
        )}
      </div>
    </div>
  );
};

export default PersonasSection;
