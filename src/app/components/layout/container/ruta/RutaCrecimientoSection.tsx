import { useMemo, useState, type FC } from "react";
import type {
  RutaCrecimiento,
  EstadoPersona,
  ActividadRutaCrecimiento,
} from "../../../../../domain/interfaces/lgc-interfaces";
import CreateActividadModal from "./CreateActividadModal";
import CreateRutaModal from "./CretateRutaModal";
import type { ActividadSubmitData } from "./CreateActividadModal";
import RutaDetailView from "./RutaDetailView";
import Button from "../../../../ui/Button";

type ViewMode = "list" | "detail";

type RutaCrecimientoSectionProps = {
  rutas: RutaCrecimiento[];
  setRutas: React.Dispatch<React.SetStateAction<RutaCrecimiento[]>>;

  actividades: ActividadRutaCrecimiento[];
  setActividades: React.Dispatch<
    React.SetStateAction<ActividadRutaCrecimiento[]>
  >;
};

const RutaCrecimientoSection: FC<RutaCrecimientoSectionProps> = ({
  rutas,
  setRutas,
  actividades,
  setActividades,
}) => {
  // modal crear ruta
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [aplicaAEstado, setAplicaAEstado] =
    useState<EstadoPersona>("NUEVO");

  // vista detalle
  const [view, setView] = useState<ViewMode>("list");
  const [selectedRutaId, setSelectedRutaId] = useState<string | null>(
    null
  );

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [rutaEditId, setRutaEditId] = useState<string | null>(null);

  // modal crear actividad
  const [isActividadOpen, setIsActividadOpen] = useState(false);
  const [actividadEditId, setActividadEditId] = useState<
    string | null
  >(null);

  // Para contar actividades por ruta (solo UI)
  const actividadesPorRuta = useMemo(() => {
    const map = new Map<string, number>();
    for (const act of actividades) {
      map.set(act.rutaId, (map.get(act.rutaId) ?? 0) + 1);
    }
    return map;
  }, [actividades]);

  const selectedRuta = useMemo(() => {
    if (!selectedRutaId) return null;
    return rutas.find((r) => r.id === selectedRutaId) ?? null;
  }, [rutas, selectedRutaId]);

  const actividadesDeRuta = useMemo(() => {
    if (!selectedRutaId) return [];
    return actividades
      .filter((a) => a.rutaId === selectedRutaId)
      .sort((a, b) => a.orden - b.orden);
  }, [selectedRutaId, actividades]);

  const actividadToEdit = useMemo(() => {
    if (!actividadEditId) return null;
    return (
      actividadesDeRuta.find((a) => a.id === actividadEditId) ?? null
    );
  }, [actividadEditId, actividadesDeRuta]);

  const openCreateModal = () => {
    setError(null);
    setNombre("");
    setDescripcion("");
    setAplicaAEstado("NUEVO");
    setIsCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateOpen(false);
    setError(null);
    setNombre("");
    setDescripcion("");
    setAplicaAEstado("NUEVO");
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
    const ruta = rutas.find((r) => r.id === id);
    if (!ruta) return;

    setRutaEditId(id);
    setNombre(ruta.nombre);
    setDescripcion(ruta.descripcion ?? "");
    setAplicaAEstado(ruta.aplicaAEstado);
    setError(null);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setRutaEditId(null);
    setError(null);
  };

  const handleUpdateRuta = () => {
    if (!rutaEditId) return;
    if (!nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    const now = new Date().toISOString();

    setRutas((prev) =>
      prev.map((r) =>
        r.id === rutaEditId
          ? {
              ...r,
              nombre: nombre.trim(),
              descripcion: descripcion.trim() || undefined,
              aplicaAEstado,
              actualizadoEn: now,
            }
          : r
      )
    );

    closeEditModal();
  };

  const handleEliminar = (id: string) => {
    setRutas((prev) => prev.filter((r) => r.id !== id));

    // si estás viendo el detalle de la ruta eliminada, vuelve a list
    if (selectedRutaId === id) {
      setView("list");
      setSelectedRutaId(null);
    }
  };

  const handleOpenCreateActividad = () => {
    setActividadEditId(null);
    setIsActividadOpen(true);
  };

  const handleOpenEditActividad = (id: string) => {
    setActividadEditId(id);
    setIsActividadOpen(true);
  };
  const closeActividadModal = () => {
    setIsActividadOpen(false);
    setActividadEditId(null);
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
        aplicaAEstado,
        creadoEn: now,
        actualizadoEn: now,
      },
    ]);

    closeCreateModal();
  };

  const handleGuardarActividad = (data: ActividadSubmitData) => {
    if (!selectedRutaId) return;
    const now = new Date().toISOString();
    const descripcion = (data.descripcion ?? "").trim() || undefined;

    // EDITAR
    if (actividadEditId) {
      setActividades((prev) =>
        prev.map((a) =>
          a.id === actividadEditId
            ? {
                ...a,
                nombre: data.nombre.trim(),
                tipo: data.tipo,
                descripcion,
                actualizadoEn: now,
              }
            : a
        )
      );
      closeActividadModal();
      return;
    }

    // CREAR
    const ordenMax = Math.max(
      0,
      ...actividades
        .filter((a) => a.rutaId === selectedRutaId)
        .map((a) => a.orden)
    );

    setActividades((prev) => [
      ...prev,
      {
        id: `ACT-${Date.now()}`,
        rutaId: selectedRutaId,
        orden: ordenMax + 1,
        nombre: data.nombre.trim(),
        tipo: data.tipo,
        descripcion,
        activa: true,
        creadoEn: now,
        actualizadoEn: now,
      },
    ]);

    closeActividadModal();
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

            <Button variant="primary" onClick={openCreateModal}>
              Agregar ruta
            </Button>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-lgc-border/50 dark:border-lgc-darkBorder/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-lgc-surfaceMuted/70 dark:bg-lgc-darkSurface">
                <tr className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  <th className="px-4 py-3 font-medium">Nombre</th>
                  <th className="px-4 py-3 font-medium">Activa</th>
                  <th className="px-4 py-3 font-medium">
                    Actividades
                  </th>
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
                        <Button
                          onClick={() => handleVer(ruta.id)}
                          size="sm"
                        >
                          Ver
                        </Button>

                        <Button
                          onClick={() => handleEditar(ruta.id)}
                          variant="primary"
                          size="sm"
                        >
                          Editar
                        </Button>

                        <Button
                          variant="dangerSoft"
                          size="sm"
                          onClick={() => handleEliminar(ruta.id)}
                        >
                          Eliminar
                        </Button>
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
        <RutaDetailView
          ruta={selectedRuta}
          actividades={actividadesDeRuta}
          onBack={handleBack}
          onAddActividad={handleOpenCreateActividad}
          onEditActividad={handleOpenEditActividad}
          onToggleActividad={(id) => {
            const now = new Date().toISOString();
            setActividades((prev) =>
              prev.map((a) =>
                a.id === id
                  ? { ...a, activa: !a.activa, actualizadoEn: now }
                  : a
              )
            );
          }}
          onDeleteActividad={(id) => {
            setActividades((prev) => prev.filter((a) => a.id !== id));
          }}
        />
      )}

      {/* =========================
          MODAL CREAR RUTA
          ========================= */}
      {isCreateOpen && (
        <CreateRutaModal
          isOpen={isCreateOpen}
          nombre={nombre}
          descripcion={descripcion}
          error={error}
          aplicaAEstado={aplicaAEstado}
          onChangeAplicaAEstado={setAplicaAEstado}
          onChangeNombre={setNombre}
          onChangeDescripcion={setDescripcion}
          onClose={closeCreateModal}
          onCreate={handleCreateRuta}
        />
      )}

      <CreateActividadModal
        isOpen={isActividadOpen}
        title={
          actividadEditId ? "Editar actividad" : "Agregar actividad"
        }
        initialData={
          actividadToEdit
            ? {
                nombre: actividadToEdit.nombre,
                tipo: actividadToEdit.tipo,
                descripcion: actividadToEdit.descripcion ?? "",
              }
            : undefined
        }
        onClose={closeActividadModal}
        onSubmit={handleGuardarActividad}
      />

      {isEditOpen && (
        <CreateRutaModal
          isOpen={isEditOpen}
          title="Editar ruta de crecimiento"
          submitLabel="Guardar cambios"
          nombre={nombre}
          descripcion={descripcion}
          error={error}
          aplicaAEstado={aplicaAEstado}
          onChangeAplicaAEstado={setAplicaAEstado}
          onChangeNombre={setNombre}
          onChangeDescripcion={setDescripcion}
          onClose={closeEditModal}
          onCreate={handleUpdateRuta}
        />
      )}
    </div>
  );
};

export default RutaCrecimientoSection;
