import type { FC } from "react";
import type { UpdateField, UpdateForm } from "./actualizacion.types";

type StepBautismoProps = {
  form: UpdateForm;
  onUpdate: UpdateField;
  onSetBautizado: (value: "yes" | "no" | "") => void;
};

const StepBautismo: FC<StepBautismoProps> = ({
  form,
  onUpdate,
  onSetBautizado,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
        Paso 4 de 4. Bautismo y autorizacion
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Es bautizado? *
          </label>
          <div className="mt-1 flex flex-wrap gap-3">
            <label className="flex items-center gap-2 rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/70 px-3 py-2 text-xs md:text-sm text-lgc-text dark:border-lgc-darkBorder/80 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText">
              <input
                type="radio"
                name="bautizado"
                value="yes"
                checked={form.bautizado === "yes"}
                onChange={() => onSetBautizado("yes")}
                className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
              />
              Si
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/70 px-3 py-2 text-xs md:text-sm text-lgc-text dark:border-lgc-darkBorder/80 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText">
              <input
                type="radio"
                name="bautizado"
                value="no"
                checked={form.bautizado === "no"}
                onChange={() => onSetBautizado("no")}
                className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
              />
              No
            </label>
          </div>
        </div>

        {form.bautizado === "yes" && (
          <div className="rounded-2xl border border-dashed border-lgc-border/70 bg-lgc-surfaceMuted/60 p-4 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted">
            <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
              Ano de bautismo *
            </label>
            <input
              type="number"
              min="1900"
              max="2100"
              value={form.anoBautismo}
              onChange={(e) =>
                onUpdate("anoBautismo", e.target.value)
              }
              className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surface px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                         dark:bg-lgc-darkSurface dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
              placeholder="Ej: 2018"
            />
          </div>
        )}

        {form.bautizado === "no" && (
          <div className="rounded-2xl border border-dashed border-lgc-border/70 bg-lgc-surfaceMuted/60 p-4 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted">
            <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
              Desea bautizarse? *
            </label>
            <div className="mt-2 flex flex-wrap gap-3">
              <label className="flex items-center gap-2 rounded-xl border border-lgc-border/70 bg-lgc-surface px-3 py-2 text-xs md:text-sm text-lgc-text dark:border-lgc-darkBorder/80 dark:bg-lgc-darkSurface dark:text-lgc-darkText">
                <input
                  type="radio"
                  name="deseaBautizarse"
                  value="yes"
                  checked={form.deseaBautizarse === "yes"}
                  onChange={() => onUpdate("deseaBautizarse", "yes")}
                  className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
                />
                Si
              </label>
              <label className="flex items-center gap-2 rounded-xl border border-lgc-border/70 bg-lgc-surface px-3 py-2 text-xs md:text-sm text-lgc-text dark:border-lgc-darkBorder/80 dark:bg-lgc-darkSurface dark:text-lgc-darkText">
                <input
                  type="radio"
                  name="deseaBautizarse"
                  value="no"
                  checked={form.deseaBautizarse === "no"}
                  onChange={() => onUpdate("deseaBautizarse", "no")}
                  className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
                />
                No
              </label>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-dashed border-lgc-border/70 bg-lgc-surfaceMuted/60 p-4 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted">
          <label className="flex items-center gap-2 text-xs md:text-sm text-lgc-text dark:text-lgc-darkText">
            <input
              type="checkbox"
              checked={form.aceptaPolitica}
              onChange={(e) =>
                onUpdate("aceptaPolitica", e.target.checked)
              }
              className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
            />
            Acepto la politica de tratamiento de datos personales
          </label>
          <p className="mt-2 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            La informacion sera usada unicamente para fines pastorales
            y administrativos de la iglesia.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepBautismo;
