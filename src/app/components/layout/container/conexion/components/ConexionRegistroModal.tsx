import { useState, type FC, useEffect } from "react";
import type { ActividadRutaCrecimiento } from "../../../../../../domain/interfaces/lgc-interfaces";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative w-full max-w-md overflow-hidden rounded-2xl border border-lgc-border/40
          bg-white shadow-2xl
          dark:border-lgc-darkBorder/40 dark:bg-lgc-darkSurface
        "
      >
        {/* Header */}
        <div className="border-b border-lgc-border/30 px-6 py-4 dark:border-lgc-darkBorder/30">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-lgc-text dark:text-lgc-darkText">
                Registrar Actividad
              </h2>
              <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Marca una actividad como completada
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg p-2 text-lgc-textMuted transition-all
                hover:bg-lgc-surfaceMuted hover:text-lgc-text
                dark:text-lgc-darkTextMuted dark:hover:bg-lgc-darkSurfaceMuted dark:hover:text-lgc-darkText
              "
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5 px-6 py-5">
          {/* Actividad Select */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-lgc-text dark:text-lgc-darkText">
              Actividad
            </label>
            <select
              value={actividadId}
              onChange={(e) => setActividadId(e.target.value)}
              className="
                w-full rounded-lg border border-lgc-border/60 bg-white px-3 py-2.5
                text-sm text-lgc-text transition-all
                focus:border-lgc-primary focus:outline-none focus:ring-2 focus:ring-lgc-primary/20
                dark:border-lgc-darkBorder/60 dark:bg-lgc-darkBgAlt dark:text-lgc-darkText
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
          <div className="space-y-2">
            <label className="text-xs font-medium text-lgc-text dark:text-lgc-darkText">
              Fecha de cumplimiento
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="
                w-full rounded-lg border border-lgc-border/60 bg-white px-3 py-2.5
                text-sm text-lgc-text transition-all
                focus:border-lgc-primary focus:outline-none focus:ring-2 focus:ring-lgc-primary/20
                dark:border-lgc-darkBorder/60 dark:bg-lgc-darkBgAlt dark:text-lgc-darkText
              "
            />
          </div>

          {/* Observaciones */}
          <div className="space-y-2">
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
                w-full resize-none rounded-lg border border-lgc-border/60 bg-white px-3 py-2.5
                text-sm text-lgc-text placeholder:text-lgc-textMuted/60 transition-all
                focus:border-lgc-primary focus:outline-none focus:ring-2 focus:ring-lgc-primary/20
                dark:border-lgc-darkBorder/60 dark:bg-lgc-darkBgAlt dark:text-lgc-darkText
                dark:placeholder:text-lgc-darkTextMuted/60
              "
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-lgc-border/30 bg-lgc-surfaceMuted/30 px-6 py-4 dark:border-lgc-darkBorder/30 dark:bg-lgc-darkSurfaceMuted/30">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg border border-lgc-border/60 bg-white px-4 py-2 text-sm font-medium
              text-lgc-text transition-all hover:bg-lgc-surfaceMuted
              dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface dark:text-lgc-darkText
              dark:hover:bg-lgc-darkSurfaceMuted
            "
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="
              rounded-lg bg-lgc-primary px-4 py-2 text-sm font-medium text-lgc-onPrimary
              shadow-sm transition-all hover:bg-lgc-primarySoft hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-lgc-primary/50 focus:ring-offset-2
              dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
            "
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConexionRegistroModal;
