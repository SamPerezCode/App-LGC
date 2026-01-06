import { useEffect, useState, type FC } from "react";
import type { TipoActividadRuta } from "../../../../../domain/interfaces/lgc-interfaces";

export interface ActividadFormData {
  nombre: string;
  tipo: TipoActividadRuta | "";
  descripcion?: string;
}

interface CreateActividadModalProps {
  isOpen: boolean;
  title?: string;
  initialData?: ActividadFormData;
  onClose: () => void;
  onSubmit: (data: ActividadFormData) => void;
}

const CreateActividadModal: FC<CreateActividadModalProps> = ({
  isOpen,
  title = "Agregar actividad",
  initialData,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<ActividadFormData>({
    nombre: "",
    tipo: "",
    descripcion: "",
  });

  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setForm({
      nombre: initialData?.nombre ?? "",
      tipo: initialData?.tipo ?? "",
      descripcion: initialData?.descripcion ?? "",
    });
    setError(null);
  };

  // ✅ cada vez que abras o cambie initialData, recarga el form
  useEffect(() => {
    if (!isOpen) return;
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialData]);

  const handleChange = (field: keyof ActividadFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.nombre.trim()) return setError("El nombre es obligatorio.");
    if (!form.tipo) return setError("El tipo de actividad es obligatorio.");

    setError(null);
    onSubmit({
      nombre: form.nombre.trim(),
      tipo: form.tipo,
      descripcion: form.descripcion?.trim() || undefined,
    });
  };

  const handleClose = () => {
    onClose();
    // opcional: si quieres limpiar también al cerrar
    setForm({ nombre: "", tipo: "", descripcion: "" });
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-lgc-surface p-4 md:p-6 shadow-lg dark:bg-lgc-darkSurfaceMuted"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm md:text-base font-semibold text-lgc-text dark:text-lgc-darkText">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
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
            value={form.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
            placeholder="Nombre de actividad"
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-2 text-xs
                       outline-none focus:ring-2 focus:ring-lgc-primary
                       dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface dark:text-lgc-darkText"
          />
        </div>

        <div className="mt-3">
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Tipo *
          </label>
          <select
            value={form.tipo}
            onChange={(e) => handleChange("tipo", e.target.value)}
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-2 text-xs
                       outline-none dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface dark:text-lgc-darkText"
          >
            <option value="">Seleccione...</option>
            <option value="EVENTO">EVENTO</option>
            <option value="REUNION">REUNION</option>
            <option value="CURSO">CURSO</option>
            <option value="MINISTERIO">MINISTERIO</option>
          </select>
        </div>

        <div className="mt-3">
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Descripción
          </label>
          <textarea
            rows={3}
            value={form.descripcion ?? ""}
            onChange={(e) => handleChange("descripcion", e.target.value)}
            placeholder="Agrega una descripción..."
            className="mt-1 w-full resize-none rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-2 text-xs
                       outline-none dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface dark:text-lgc-darkText"
          />
        </div>

        {error && <p className="mt-2 text-xs text-lgc-danger">{error}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-lgc-border/70 px-4 py-2 text-xs hover:bg-lgc-surface
                       dark:border-lgc-darkBorder/70 dark:text-lgc-darkText dark:hover:bg-lgc-darkSurface"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-lgc-primary px-4 py-2 text-xs font-semibold text-lgc-onPrimary
                       hover:bg-lgc-primarySoft
                       dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateActividadModal;
