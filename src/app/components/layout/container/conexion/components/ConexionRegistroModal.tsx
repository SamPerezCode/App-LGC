import { useState, type FC, useEffect } from "react";
import type { ActividadRutaCrecimiento } from "../../../../../../domain/interfaces/lgc-interfaces";
import Button from "../../../../../ui/Button";

type ConexionRegistroModalProps = {
  isOpen: boolean;
  actividades: ActividadRutaCrecimiento[];
  onClose: () => void;
  onSave: (data: { actividadId: string; fecha: string; observaciones: string }) => void;
};

const ConexionRegistroModal: FC<ConexionRegistroModalProps> = ({
  isOpen,
  actividades,
  onClose,
  onSave,
}) => {
  const [actividadId, setActividadId] = useState("");
  const [fecha, setFecha] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setActividadId(actividades[0]?.id ?? "");
      setFecha(new Date().toISOString().slice(0, 10));
      setObservaciones("");
      setError(null);
    }
  }, [isOpen, actividades]);

  const handleSubmit = () => {
    if (!actividadId) {
      setError("Selecciona una actividad");
      return;
    }
    if (!fecha) {
      setError("Selecciona una fecha");
      return;
    }

    onSave({ actividadId, fecha, observaciones });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-lgc-everdeep/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative mx-4 w-full max-w-md rounded-2xl border border-lgc-border/50
          bg-lgc-surface p-6 shadow-xl
          dark:border-lgc-darkBorder/50 dark:bg-lgc-darkSurface
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Registrar Actividad
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg p-1.5 text-lgc-textMuted transition-colors
              hover:bg-lgc-surfaceMuted hover:text-lgc-text
              dark:text-lgc-darkTextMuted dark:hover:bg-lgc-darkSurfaceMuted dark:hover:text-lgc-darkText
            "
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="mt-6 flex flex-col gap-4">
          {/* Actividad Select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-lgc-text dark:text-lgc-darkText">
              Actividad
            </label>
            <select
              value={actividadId}
              onChange={(e) => setActividadId(e.target.value)}
              className="
                rounded-xl border border-lgc-border/60 bg-lgc-surface px-3 py-2.5
                text-sm text-lgc-text
                focus:border-lgc-primary focus:outline-none focus:ring-1 focus:ring-lgc-primary/30
                dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface dark:text-lgc-darkText
              "
            >
              {actividades.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-lgc-text dark:text-lgc-darkText">
              Fecha de cumplimiento
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="
                rounded-xl border border-lgc-border/60 bg-lgc-surface px-3 py-2.5
                text-sm text-lgc-text
                focus:border-lgc-primary focus:outline-none focus:ring-1 focus:ring-lgc-primary/30
                dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface dark:text-lgc-darkText
              "
            />
          </div>

          {/* Observaciones */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-lgc-text dark:text-lgc-darkText">
              Observaciones
              <span className="ml-1 font-normal text-lgc-textMuted dark:text-lgc-darkTextMuted">
                (opcional)
              </span>
            </label>
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              rows={3}
              placeholder="Notas adicionales sobre esta actividad..."
              className="
                resize-none rounded-xl border border-lgc-border/60 bg-lgc-surface px-3 py-2.5
                text-sm text-lgc-text placeholder:text-lgc-textMuted
                focus:border-lgc-primary focus:outline-none focus:ring-1 focus:ring-lgc-primary/30
                dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface dark:text-lgc-darkText
                dark:placeholder:text-lgc-darkTextMuted
              "
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-lgc-danger">{error}</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConexionRegistroModal;
