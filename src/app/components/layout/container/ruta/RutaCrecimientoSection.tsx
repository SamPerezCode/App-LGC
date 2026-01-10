import { type FC } from "react";
import type {
  RutaCrecimiento,
  ActividadRutaCrecimiento,
} from "../../../../../domain/interfaces/lgc-interfaces";
import CreateActividadModal from "./CreateActividadModal";
import CreateRutaModal from "./CretateRutaModal";
import RutaDetailView from "./RutaDetailView";
import Button from "../../../../ui/Button";

import useRutaCrecimiento from "./useRutaCrecimiento";
import RutaListMobileCards from "./RutaListMobileCards";

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
  const {
    view,
    selectedRuta,
    actividadesDeRuta,
    actividadesPorRuta,
    actividadToEdit,

    isCreateOpen,
    isEditOpen,
    isActividadOpen,
    nombre,
    descripcion,
    aplicaAEstado,
    error,

    setNombre,
    setDescripcion,
    setAplicaAEstado,

    openCreateModal,
    closeCreateModal,
    closeEditModal,
    handleCreateRuta,
    handleUpdateRuta,

    handleVer,
    handleEditar,
    handleEliminar,
    handleBack,

    handleOpenCreateActividad,
    handleOpenEditActividad,
    closeActividadModal,
    handleGuardarActividad,
    handleToggleActividad,
  } = useRutaCrecimiento({
    rutas,
    setRutas,
    actividades,
    setActividades,
  });
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

          <div className="mt-4 hidden md:block overflow-hidden rounded-2xl border border-lgc-border/50 dark:border-lgc-darkBorder/60">
            {" "}
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

          <div className="mt-4 md:hidden">
            <RutaListMobileCards
              rutas={rutas}
              actividadesPorRuta={actividadesPorRuta}
              onView={handleVer}
              onEdit={handleEditar}
              onDelete={handleEliminar}
            />
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
          onToggleActividad={handleToggleActividad}
          onDeleteActividad={(id) =>
            setActividades((prev) => prev.filter((a) => a.id !== id))
          }
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
          actividadToEdit ? "Editar actividad" : "Agregar actividad"
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
