import type { FC } from "react";
import {
  MINISTERIOS_INFANTIL,
  TIEMPOS_ASISTE,
} from "./actualizacion.constants";
import type { UpdateField, UpdateForm } from "./actualizacion.types";
import StepBautismo from "./StepBautismo";

type StepVidaIglesiaMenorProps = {
  form: UpdateForm;
  onUpdate: UpdateField;
  onSetVinculado: (value: "yes" | "no" | "") => void;
  onToggleMinisterio: (value: string) => void;
  onSetBautizado: (value: "yes" | "no" | "") => void;
};

const StepVidaIglesiaMenor: FC<StepVidaIglesiaMenorProps> = ({
  form,
  onUpdate,
  onSetVinculado,
  onToggleMinisterio,
  onSetBautizado,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
        Paso 4 de 4. Vida en la iglesia y autorizaciones
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            ¿Hace cuánto tiempo asiste a la iglesia? *
          </label>
          <select
            value={form.tiempoAsiste}
            onChange={(e) => onUpdate("tiempoAsiste", e.target.value)}
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                       dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
          >
            {TIEMPOS_ASISTE.map((tiempo) => (
              <option key={tiempo.value} value={tiempo.value}>
                {tiempo.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            ¿Está vinculado a un ministerio infantil? *{" "}
          </label>
          <div className="mt-1 flex flex-wrap gap-3">
            <label className="flex items-center gap-2 rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/70 px-3 py-2 text-xs md:text-sm text-lgc-text dark:border-lgc-darkBorder/80 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText">
              <input
                type="radio"
                name="ministerio-infantil"
                value="yes"
                checked={form.vinculadoMinisterio === "yes"}
                onChange={() => onSetVinculado("yes")}
                className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
              />
              Si
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/70 px-3 py-2 text-xs md:text-sm text-lgc-text dark:border-lgc-darkBorder/80 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText">
              <input
                type="radio"
                name="ministerio-infantil"
                value="no"
                checked={form.vinculadoMinisterio === "no"}
                onChange={() => onSetVinculado("no")}
                className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
              />
              No
            </label>
          </div>
        </div>
      </div>

      {form.vinculadoMinisterio === "yes" && (
        <div className="rounded-2xl border border-dashed border-lgc-border/70 bg-lgc-surfaceMuted/60 p-4 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted">
          <p className="text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            ¿Cuál ministerio? *{" "}
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {MINISTERIOS_INFANTIL.map((ministerio) => (
              <label
                key={ministerio.id}
                className="flex items-center gap-3 rounded-xl border border-lgc-border/70 bg-lgc-surface px-3 py-3 text-xs md:text-sm text-lgc-text dark:border-lgc-darkBorder/80 dark:bg-lgc-darkSurface dark:text-lgc-darkText"
              >
                <input
                  type="checkbox"
                  checked={form.ministerios.includes(
                    ministerio.label
                  )}
                  onChange={() =>
                    onToggleMinisterio(ministerio.label)
                  }
                  className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lgc-surfaceMuted/80 dark:bg-lgc-darkSurfaceMuted">
                  <img
                    src={ministerio.logo}
                    alt={ministerio.label}
                    className="h-10 w-10 object-contain"
                  />
                </div>

                <span>{ministerio.label}</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Selecciona una o varias opciones.
          </p>
        </div>
      )}

      <StepBautismo
        form={form}
        onUpdate={onUpdate}
        onSetBautizado={onSetBautizado}
        showTitle={false}
        showDeseaBautizarse={false}
      />
    </div>
  );
};

export default StepVidaIglesiaMenor;
