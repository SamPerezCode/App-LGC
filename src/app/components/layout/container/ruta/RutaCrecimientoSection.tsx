import { useMemo, useState, type FC } from "react";
import type { RutaCrecimiento } from "../../../../../domain/interfaces/lgc-interfaces";
import { rutasMock, actividadesRutaMock } from "../../../../../domain/mock-data/lgc-mock";

type ViewMode = "list" | "detail";

const RutaCrecimientoSection: FC = () => {
  const [rutas, setRutas] = useState<RutaCrecimiento[]>(rutasMock);

  // modal crear ruta
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState<string | null>(null);

  // vista detalle
  const [view, setView] = useState<ViewMode>("list");
  const [selectedRutaId, setSelectedRutaId] = useState<string | null>(null);

  // Para contar actividades por ruta (solo UI)
  const actividadesPorRuta = useMemo(() => {
    const map = new Map<string, number>();
    for (const act of actividadesRutaMock) {
      map.set(act.rutaId, (map.get(act.rutaId) ?? 0) + 1);
    }
    return map;
  }, []);

  const selectedRuta = useMemo(() => {
    if (!selectedRutaId) return null;
    return rutas.find((r) => r.id === selectedRutaId) ?? null;
  }, [rutas, selectedRutaId]);

  const actividadesDeRuta = useMemo(() => {
    if (!selectedRutaId) return [];
    return actividadesRutaMock
      .filter((a) => a.rutaId === selectedRutaId)
      .sort((a, b) => a.orden - b.orden);
  }, [selectedRutaId]);

  const openCreateModal = () => {
    setError(null);
    setNombre("");
    setDescripcion("");
    setIsCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateOpen(false);
    setError(null);
    setNombre("");
    setDescripcion("");
  };

  const handleVer = (id: string) => {
    setSelectedRutaId(id);
    setView("detail");
  };

  const handleBack = () => {
    setView("list");
    setSelectedRutaId(null);
  };

  const handleEditar = (id: string) => {
    console.log("Editar ruta", id);
  };

  const handleEliminar = (id: string) => {
    setRutas((prev) => prev.filter((r) => r.id !== id));

    // si estás viendo el detalle de la ruta eliminada, vuelve a list
    if (selectedRutaId === id) {
      setView("list");
      setSelectedRutaId(null);
    }
  };

  const handleCreateRuta = () => {
    if (!nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    const now = new Date().toISOString();

    setRutas((prev) => [
      ...prev,
      {
        id: `RUTA-${String(prev.length + 1).padStart(3, "0")}`,
        nombre: nombre.trim(),
        descripcion: descripcion.trim() || undefined,
        activa: true,
        creadoEn: now,
        actualizadoEn: now,
      },
    ]);

    closeCreateModal();
  };

  return (
    <div
      className="
        relative w-full
        rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
      "
    >
      {/* =========================
          VISTA LISTA (TABLA RUTAS)
          ========================= */}
      {view === "list" && (
        <>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                Ruta de crecimiento
              </h2>
              <p className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Administra rutas y sus actividades.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="
                inline-flex items-center justify-center rounded-xl
                bg-lgc-primary px-4 py-2 text-xs md:text-sm font-semibold text-lgc-onPrimary
                shadow-sm hover:bg-lgc-primarySoft
                dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
                transition-colors
              "
            >
              Agregar ruta
            </button>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-lgc-border/50 dark:border-lgc-darkBorder/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-lgc-surfaceMuted/70 dark:bg-lgc-darkSurface">
                <tr className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  <th className="px-4 py-3 font-medium">Nombre</th>
                  <th className="px-4 py-3 font-medium">Activa</th>
                  <th className="px-4 py-3 font-medium">Actividades</th>
                  <th className="px-4 py-3 font-medium">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {rutas.map((ruta) => (
                  <tr
                    key={ruta.id}
                    className="border-t border-lgc-border/40 dark:border-lgc-darkBorder/40"
                  >
                    <td className="px-4 py-3 text-lgc-text dark:text-lgc-darkText">
                      {ruta.nombre}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium
                          ${
                            ruta.activa
                              ? "bg-lgc-surfaceMuted text-lgc-text dark:bg-lgc-darkSurface dark:text-lgc-darkText"
                              : "bg-lgc-surfaceMuted/60 text-lgc-textMuted dark:bg-lgc-darkSurface dark:text-lgc-darkTextMuted"
                          }`}
                      >
                        {ruta.activa ? "Activa" : "Inactiva"}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-lgc-text dark:text-lgc-darkText">
                      {actividadesPorRuta.get(ruta.id) ?? 0}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleVer(ruta.id)}
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
                          onClick={() => handleEditar(ruta.id)}
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
                          onClick={() => handleEliminar(ruta.id)}
                          className="
                            rounded-full border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-1
                            text-[11px] font-medium text-lgc-text hover:bg-lgc-surface
                            dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
                            dark:hover:bg-lgc-darkSurface
                          "
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {rutas.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted"
                    >
                      No hay rutas creadas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* =========================
          VISTA DETALLE (RUTA)
          ========================= */}
      {view === "detail" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
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

            <button
              type="button"
              onClick={() => console.log("Abrir modal agregar actividad")}
              className="
                rounded-xl bg-lgc-primary px-4 py-2 text-xs md:text-sm font-semibold text-lgc-onPrimary
                shadow-sm hover:bg-lgc-primarySoft
                dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
                transition-colors
              "
            >
              Agregar actividad
            </button>
          </div>

          {selectedRuta ? (
            <div
              className="
                rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
                dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
              "
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                    {selectedRuta.nombre}
                  </h3>

                  {selectedRuta.descripcion && (
                    <p className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      {selectedRuta.descripcion}
                    </p>
                  )}
                </div>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium
                    ${
                      selectedRuta.activa
                        ? "bg-lgc-surfaceMuted text-lgc-text dark:bg-lgc-darkSurface dark:text-lgc-darkText"
                        : "bg-lgc-surfaceMuted/60 text-lgc-textMuted dark:bg-lgc-darkSurface dark:text-lgc-darkTextMuted"
                    }`}
                >
                  {selectedRuta.activa ? "Activa" : "Inactiva"}
                </span>
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-lgc-border/50 dark:border-lgc-darkBorder/60">
                <table className="w-full text-left text-sm">
                  <thead className="bg-lgc-surfaceMuted/70 dark:bg-lgc-darkSurface">
                    <tr className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      <th className="px-4 py-3 font-medium">Orden</th>
                      <th className="px-4 py-3 font-medium">Nombre</th>
                      <th className="px-4 py-3 font-medium">Tipo</th>
                      <th className="px-4 py-3 font-medium">Activa</th>
                      <th className="px-4 py-3 font-medium">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {actividadesDeRuta.map((act) => (
                      <tr
                        key={act.id}
                        className="border-t border-lgc-border/40 dark:border-lgc-darkBorder/40"
                      >
                        <td className="px-4 py-3 text-lgc-text dark:text-lgc-darkText">
                          {act.orden}
                        </td>
                        <td className="px-4 py-3 text-lgc-text dark:text-lgc-darkText">
                          {act.nombre}
                        </td>
                        <td className="px-4 py-3 text-lgc-text dark:text-lgc-darkText">
                          {act.tipo}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium
                              ${
                                act.activa
                                  ? "bg-lgc-surfaceMuted text-lgc-text dark:bg-lgc-darkSurface dark:text-lgc-darkText"
                                  : "bg-lgc-surfaceMuted/60 text-lgc-textMuted dark:bg-lgc-darkSurface dark:text-lgc-darkTextMuted"
                              }`}
                          >
                            {act.activa ? "Activa" : "Inactiva"}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => console.log("Editar actividad", act.id)}
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
                              onClick={() => console.log("Toggle actividad", act.id)}
                              className="
                                rounded-full border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-1
                                text-[11px] font-medium text-lgc-text hover:bg-lgc-surface
                                dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
                                dark:hover:bg-lgc-darkSurface
                              "
                            >
                              {act.activa ? "Desactivar" : "Activar"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {actividadesDeRuta.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-8 text-center text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted"
                        >
                          Esta ruta aún no tiene actividades.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div
              className="
                rounded-xl border border-lgc-border/60 bg-lgc-surface p-4 text-xs
                text-lgc-textMuted shadow-sm
                dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkTextMuted
              "
            >
              No se encontró la ruta seleccionada.
            </div>
          )}
        </div>
      )}

      {/* =========================
          MODAL CREAR RUTA
          ========================= */}
      {isCreateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={closeCreateModal}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-lgc-surface p-4 md:p-6 shadow-lg dark:bg-lgc-darkSurfaceMuted"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm md:text-base font-semibold text-lgc-text dark:text-lgc-darkText">
                Crear ruta de crecimiento
              </h3>

              <button
                type="button"
                onClick={closeCreateModal}
                className="text-lgc-textMuted hover:text-lgc-text dark:hover:text-lgc-darkText"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
                Nombre *
              </label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-2 text-xs
                           outline-none focus:ring-2 focus:ring-lgc-primary
                           dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface dark:text-lgc-darkText"
                placeholder="Ej: Nuevos"
              />
            </div>

            <div className="mt-3">
              <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={3}
                className="mt-1 w-full resize-none rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-2 text-xs
                           outline-none
                           dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface dark:text-lgc-darkText"
                placeholder="Breve descripción de la ruta"
              />
            </div>

            {error && <p className="mt-2 text-xs text-lgc-danger">{error}</p>}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeCreateModal}
                className="rounded-xl border border-lgc-border/70 px-4 py-2 text-xs hover:bg-lgc-surface
                           dark:border-lgc-darkBorder/70 dark:text-lgc-darkText dark:hover:bg-lgc-darkSurface"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleCreateRuta}
                className="rounded-xl bg-lgc-primary px-4 py-2 text-xs font-semibold text-lgc-onPrimary
                           hover:bg-lgc-primarySoft
                           dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna"
              >
                Crear ruta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RutaCrecimientoSection;
