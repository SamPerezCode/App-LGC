import type { FC } from "react";
import type { EstadoPersona } from "../../../../../domain/interfaces/lgc-interfaces";

interface CreateRutaModalProps {
  isOpen: boolean;
  nombre: string;
  descripcion: string;
  error: string | null;

  aplicaAEstado: EstadoPersona;
  onChangeAplicaAEstado: (value: EstadoPersona) => void;

  onChangeNombre: (value: string) => void;
  onChangeDescripcion: (value: string) => void;
  onClose: () => void;
  onCreate: () => void;
}

const CreateRutaModal: FC<CreateRutaModalProps> = ({
  isOpen,
  nombre,
  descripcion,
  error,
  aplicaAEstado,
  onChangeAplicaAEstado,
  onChangeNombre,
  onChangeDescripcion,
  onClose,
  onCreate,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
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
            value={nombre}
            onChange={(e) => onChangeNombre(e.target.value)}
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
            onChange={(e) => onChangeDescripcion(e.target.value)}
            rows={3}
            className="mt-1 w-full resize-none rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-2 text-xs
                       outline-none
                       dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface dark:text-lgc-darkText"
            placeholder="Breve descripción de la ruta"
          />
        </div>

        {/* ✅ NUEVO */}
        <div className="mt-3">
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Aplica a estado *
          </label>

          <select
            value={aplicaAEstado}
            onChange={(e) =>
              onChangeAplicaAEstado(e.target.value as EstadoPersona)
            }
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-2 text-xs
                       outline-none
                       dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface dark:text-lgc-darkText"
          >
            <option value="NUEVO">NUEVO</option>
            <option value="ASISTENTE_REGULAR">
              ASISTENTE REGULAR
            </option>
            <option value="MIEMBRO">MIEMBRO</option>
          </select>
        </div>

        {error && (
          <p className="mt-2 text-xs text-lgc-danger">{error}</p>
        )}

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
            onClick={onCreate}
            className="rounded-xl bg-lgc-primary px-4 py-2 text-xs font-semibold text-lgc-onPrimary
                       hover:bg-lgc-primarySoft
                       dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna"
          >
            Crear ruta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRutaModal;
