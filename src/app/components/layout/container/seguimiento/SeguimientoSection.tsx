import { useMemo, useState, type FC } from "react";
import type {
  Persona,
  SeguimientoActividadPersona,
  RutaCrecimiento,
  ActividadRutaCrecimiento,
} from "../../../../../domain/interfaces/lgc-interfaces";
import RegistroActividadModal, {
  type RegistroActividadFormState,
} from "./RegistroActividadModal";
import BackButton from "../../../../ui/BackButton";
import Button from "../../../../ui/Button";

interface SeguimientoSectionProps {
  persona: Persona;
  rutas: RutaCrecimiento[];
  actividades: ActividadRutaCrecimiento[];
  seguimientos: SeguimientoActividadPersona[];
  setSeguimientos: React.Dispatch<
    React.SetStateAction<SeguimientoActividadPersona[]>
  >;
  onBack: () => void;
}

const getCurrentUserName = () => {
  try {
    const raw = localStorage.getItem("lgc:user");
    if (!raw) return "Administrador";
    const parsed = JSON.parse(raw);
    return parsed?.nombre ?? "Administrador";
  } catch {
    return "Administrador";
  }
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const toDateInput = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const SeguimientoSection: FC<SeguimientoSectionProps> = ({
  persona,
  rutas,
  actividades,
  seguimientos,
  setSeguimientos,
  onBack,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<RegistroActividadFormState>({
    actividadId: "",
    fecha: "",
    observaciones: "",
    registradoPor: getCurrentUserName(),
    editadoPor: "",
  });

  const rutaAplicable = useMemo(() => {
    return (
      rutas.find(
        (r) => r.activa && r.aplicaAEstado === persona.estado
      ) ?? null
    );
  }, [rutas, persona.estado]);

  const actividadesDeRuta = useMemo(() => {
    if (!rutaAplicable) return [];
    return actividades
      .filter((a) => a.rutaId === rutaAplicable.id)
      .sort((a, b) => a.orden - b.orden);
  }, [actividades, rutaAplicable]);

  const actividadesById = useMemo(
    () => new Map(actividadesDeRuta.map((a) => [a.id, a])),
    [actividadesDeRuta]
  );

  const seguimientosPersona = useMemo(
    () => seguimientos.filter((s) => s.personaId === persona.id),
    [seguimientos, persona.id]
  );
  const seguimientosRegistrados = useMemo(
    () =>
      seguimientosPersona.filter((s) => s.estado === "COMPLETADA"),
    [seguimientosPersona]
  );

  const registrosOrdenados = useMemo(() => {
    return [...seguimientosRegistrados].sort((a, b) => {
      const aDate = a.fechaCumplimiento ?? a.fechaAsignacion;
      const bDate = b.fechaCumplimiento ?? b.fechaAsignacion;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });
  }, [seguimientosRegistrados]);

  const actividadRegistradaIds = useMemo(
    () =>
      new Set(seguimientosRegistrados.map((s) => s.actividadRutaId)),
    [seguimientosRegistrados]
  );

  const actividadesDisponibles = useMemo(
    () =>
      actividadesDeRuta.filter(
        (a) => !actividadRegistradaIds.has(a.id)
      ),
    [actividadesDeRuta, actividadRegistradaIds]
  );

  const completadasUnicas = useMemo(() => {
    const ids = new Set(
      seguimientosRegistrados.map((s) => s.actividadRutaId)
    );
    return ids.size;
  }, [seguimientosRegistrados]);

  const total = actividadesDeRuta.length;
  const canAddActividad = actividadesDisponibles.length > 0;

  const openCreateModal = () => {
    setError(null);
    setEditingId(null);
    setForm({
      actividadId: actividadesDisponibles[0]?.id ?? "",
      fecha: "",
      observaciones: "",
      registradoPor: getCurrentUserName(),
      editadoPor: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (entry: SeguimientoActividadPersona) => {
    setError(null);
    setEditingId(entry.id);
    const fechaBase =
      entry.fechaCumplimiento ?? entry.fechaAsignacion;
    setForm({
      actividadId: entry.actividadRutaId,
      fecha: toDateInput(fechaBase),
      observaciones: entry.observaciones ?? "",
      registradoPor: entry.registradoPorUsuarioId ?? "Administrador",
      editadoPor: getCurrentUserName(),
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setError(null);
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!form.actividadId) {
      setError("Selecciona una actividad.");
      return;
    }

    if (!editingId && actividadRegistradaIds.has(form.actividadId)) {
      setError("Esta actividad ya fue registrada.");
      return;
    }

    const isoDate = form.fecha
      ? new Date(form.fecha).toISOString()
      : new Date().toISOString();

    if (editingId) {
      setSeguimientos((prev) =>
        prev.map((item) => {
          if (item.id !== editingId) return item;
          return {
            ...item,
            estado: "COMPLETADA",
            observaciones: form.observaciones?.trim() || undefined,
            fechaCumplimiento: isoDate,
            editadoPorUsuarioId:
              form.editadoPor || getCurrentUserName(),
          };
        })
      );
    } else {
      const newEntry: SeguimientoActividadPersona = {
        id: `SEG-${Date.now()}`,
        personaId: persona.id,
        actividadRutaId: form.actividadId,
        estado: "COMPLETADA",
        fechaAsignacion: new Date().toISOString(),
        fechaCumplimiento: isoDate,
        observaciones: form.observaciones?.trim() || undefined,
        registradoPorUsuarioId: form.registradoPor || undefined,
      };

      setSeguimientos((prev) => [...prev, newEntry]);
    }

    closeModal();
  };

  const modalMode = editingId ? "edit" : "create";

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BackButton onClick={onBack}></BackButton>

        <div className="flex items-center gap-3">
          <div className="text-xs md:text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Progreso:{" "}
            <span className="font-semibold text-lgc-text dark:text-lgc-darkText">
              {completadasUnicas}/{total}
            </span>
          </div>

          <Button
            variant="primary"
            onClick={openCreateModal}
            disabled={!canAddActividad}
          >
            Agregar actividad
          </Button>
        </div>
      </div>

      <div
        className="
          rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
          dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
        "
      >
        <h3 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
          Seguimiento - {persona.nombreCompleto}
        </h3>

        <div className="mt-2 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
          Estado:{" "}
          <span className="font-semibold">{persona.estado}</span>
        </div>

        {rutaAplicable ? (
          <div className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Ruta asignada:{" "}
            <span className="font-semibold text-lgc-text dark:text-lgc-darkText">
              {rutaAplicable.nombre}
            </span>
          </div>
        ) : (
          <div className="mt-2 text-sm text-lgc-danger">
            No hay ruta activa asignada para el estado{" "}
            {persona.estado}.
          </div>
        )}
      </div>

      <div
        className="
          rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
          dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
        "
      >
        <h4 className="text-sm md:text-base font-semibold text-lgc-text dark:text-lgc-darkText">
          Bitacora de actividades
        </h4>

        <div className="mt-4 space-y-3">
          {registrosOrdenados.length === 0 && (
            <div className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Aun no hay actividades registradas.
            </div>
          )}

          {registrosOrdenados.map((reg) => {
            const actividad = actividadesById.get(
              reg.actividadRutaId
            );

            return (
              <div
                key={reg.id}
                className="rounded-2xl border border-lgc-border/50 bg-lgc-surfaceMuted/40 p-4
                           dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                      {actividad?.tipo ?? "ACTIVIDAD"} ·{" "}
                      {formatDate(
                        reg.fechaCumplimiento ?? reg.fechaAsignacion
                      )}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-lgc-text dark:text-lgc-darkText">
                      {actividad?.nombre ?? "Actividad no encontrada"}
                    </div>
                    {reg.observaciones && (
                      <div className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                        {reg.observaciones}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2 text-[11px] text-lgc-textMuted dark:text-lgc-darkTextMuted">
                    <span className="rounded-full px-2 py-1 bg-lgc-surfaceMuted dark:bg-lgc-darkSurface">
                      {reg.estado}
                    </span>
                    <span>
                      Registrado por:{" "}
                      {reg.registradoPorUsuarioId ?? "-"}
                    </span>
                    {reg.editadoPorUsuarioId && (
                      <span>
                        Editado por: {reg.editadoPorUsuarioId}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => openEditModal(reg)}
                      className="
                        rounded-lg border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-1 text-[11px]
                        text-lgc-text hover:bg-lgc-surface
                        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
                        dark:hover:bg-lgc-darkSurface
                      "
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <RegistroActividadModal
        isOpen={isModalOpen}
        mode={modalMode}
        actividades={actividadesDeRuta}
        form={form}
        setForm={setForm}
        error={error}
        onClose={closeModal}
        onSave={handleSave}
        disableActividadIds={[...actividadRegistradaIds]}
      />
    </div>
  );
};

export default SeguimientoSection;
