import {
  useEffect,
  type FC,
  type Dispatch,
  type SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import type { ActividadRutaCrecimiento } from "../../../../../domain/interfaces/lgc-interfaces";

export type RegistroActividadFormState = {
  actividadId: string;
  fecha: string;
  observaciones: string;
  registradoPor: string;
  editadoPor?: string;
};

type RegistroActividadModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  actividades: ActividadRutaCrecimiento[];
  form: RegistroActividadFormState;
  setForm: Dispatch<SetStateAction<RegistroActividadFormState>>;
  error: string | null;
  onClose: () => void;
  onSave: () => void;
  disableActividadIds?: string[];
};

const RegistroActividadModal: FC<RegistroActividadModalProps> = ({
  isOpen,
  mode,
  actividades,
  form,
  setForm,
  error,
  onClose,
  onSave,
  disableActividadIds = [],
}) => {
  const isEditMode = mode === "edit";
  const disabledSet = new Set(disableActividadIds);
  const actividadesDisponibles = isEditMode
    ? actividades
    : actividades.filter((act) => !disabledSet.has(act.id));
  const hasActividades = actividadesDisponibles.length > 0;

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-lgc-border/70 bg-lgc-surface p-5 shadow-lg dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface"
        onClick={(e) => e.stopPropagation()}
      >
        <h5 className="text-base font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
          {isEditMode ? "Editar actividad" : "Registrar actividad"}
        </h5>

        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Actividad
            </label>
            <select
              value={form.actividadId}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  actividadId: e.target.value,
                }))
              }
              disabled={isEditMode || !hasActividades}
              className="
                mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80
                px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                disabled:cursor-not-allowed disabled:opacity-60
                dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
              "
            >
              {!hasActividades && (
                <option value="">
                  No hay actividades disponibles
                </option>
              )}
              {actividadesDisponibles.map((act) => (
                <option key={act.id} value={act.id}>
                  {act.orden}. {act.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Fecha de realizacion
            </label>
            <input
              type="date"
              value={form.fecha}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  fecha: e.target.value,
                }))
              }
              className="
                mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80
                px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
              "
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Descripcion / notas
            </label>
            <textarea
              value={form.observaciones}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  observaciones: e.target.value,
                }))
              }
              rows={3}
              className="
                mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80
                px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
              "
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Registrado por
            </label>
            <input
              type="text"
              value={form.registradoPor}
              readOnly
              className="
                mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80
                px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
              "
            />
          </div>

          {isEditMode && (
            <div>
              <label className="block text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Editado por
              </label>
              <input
                type="text"
                value={form.editadoPor ?? ""}
                readOnly
                className="
                  mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80
                  px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                  dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
                "
              />
            </div>
          )}

          {error && (
            <p className="text-xs text-lgc-danger dark:text-lgc-darkAccent">
              {error}
            </p>
          )}
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-4 py-2
              text-xs md:text-sm text-lgc-text hover:bg-lgc-surface
              dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
              dark:hover:bg-lgc-darkSurface
            "
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSave}
            className="
              rounded-xl bg-lgc-primary px-4 py-2 text-xs md:text-sm font-semibold text-lgc-onPrimary
              shadow-sm hover:bg-lgc-primarySoft
              dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
              transition-colors
            "
          >
            Guardar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RegistroActividadModal;
