import { useMemo, useState } from "react";
import type {
  RutaCrecimiento,
  EstadoPersona,
  ActividadRutaCrecimiento,
} from "../../../../../domain/interfaces/lgc-interfaces";
import type { ActividadSubmitData } from "./CreateActividadModal";

type ViewMode = "list" | "detail";

type UseRutaCrecimientoArgs = {
  rutas: RutaCrecimiento[];
  setRutas: React.Dispatch<React.SetStateAction<RutaCrecimiento[]>>;
  actividades: ActividadRutaCrecimiento[];
  setActividades: React.Dispatch<
    React.SetStateAction<ActividadRutaCrecimiento[]>
  >;
};

const useRutaCrecimiento = ({
  rutas,
  setRutas,
  actividades,
  setActividades,
}: UseRutaCrecimientoArgs) => {
  const [view, setView] = useState<ViewMode>("list");
  const [selectedRutaId, setSelectedRutaId] = useState<string | null>(
    null
  );

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [aplicaAEstado, setAplicaAEstado] =
    useState<EstadoPersona>("NUEVO");
  const [rutaEditId, setRutaEditId] = useState<string | null>(null);

  const [isActividadOpen, setIsActividadOpen] = useState(false);
  const [actividadEditId, setActividadEditId] = useState<
    string | null
  >(null);

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

  const closeEditModal = () => {
    setIsEditOpen(false);
    setRutaEditId(null);
    setError(null);
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

  const handleEliminar = (id: string) => {
    setRutas((prev) => prev.filter((r) => r.id !== id));
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

  const handleGuardarActividad = (data: ActividadSubmitData) => {
    if (!selectedRutaId) return;
    const now = new Date().toISOString();
    const desc = (data.descripcion ?? "").trim() || undefined;

    if (actividadEditId) {
      setActividades((prev) =>
        prev.map((a) =>
          a.id === actividadEditId
            ? {
                ...a,
                nombre: data.nombre.trim(),
                tipo: data.tipo,
                descripcion: desc,
                actualizadoEn: now,
              }
            : a
        )
      );
      closeActividadModal();
      return;
    }

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
        descripcion: desc,
        activa: true,
        creadoEn: now,
        actualizadoEn: now,
      },
    ]);

    closeActividadModal();
  };

  const handleToggleActividad = (id: string) => {
    const now = new Date().toISOString();
    setActividades((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, activa: !a.activa, actualizadoEn: now }
          : a
      )
    );
  };

  return {
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
  };
};

export default useRutaCrecimiento;
