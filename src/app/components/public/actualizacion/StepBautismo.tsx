import { useState, type FC } from "react";
import type { UpdateField, UpdateForm } from "./actualizacion.types";

type StepBautismoProps = {
  form: UpdateForm;
  onUpdate: UpdateField;
  onSetBautizado: (value: "yes" | "no" | "") => void;
  showTitle?: boolean;
  title?: string;
  showDeseaBautizarse?: boolean;
};

const StepBautismo: FC<StepBautismoProps> = ({
  form,
  onUpdate,
  onSetBautizado,
  showTitle = true,
  title = "Paso 4 de 4. Bautismo y autorización",
  showDeseaBautizarse = true,
}) => {
  const [showPolicy, setShowPolicy] = useState(false);

  return (
    <div className="space-y-4">
      {showTitle && (
        <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
          {title}
        </h2>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            ¿Está bautizado? *{" "}
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
              Sí
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
              Año de bautismo *
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

        {form.bautizado === "no" && showDeseaBautizarse && (
          <div className="rounded-2xl border border-dashed border-lgc-border/70 bg-lgc-surfaceMuted/60 p-4 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted">
            <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
              ¿Desea bautizarse? *{" "}
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
                Sí
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

        <div className="rounded-2xl border border-dashed border-lgc-border/70 bg-lgc-surfaceMuted/60 p-4 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted space-y-3">
          <label className="flex items-center gap-2 text-xs md:text-sm text-lgc-text dark:text-lgc-darkText">
            <input
              type="checkbox"
              checked={form.aceptaPolitica}
              onChange={(e) =>
                onUpdate("aceptaPolitica", e.target.checked)
              }
              className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
            />
            Acepto la política de tratamiento de datos personales{" "}
          </label>

          <label className="flex items-center gap-2 text-xs md:text-sm text-lgc-text dark:text-lgc-darkText">
            <input
              type="checkbox"
              checked={form.autorizaImagen}
              onChange={(e) =>
                onUpdate("autorizaImagen", e.target.checked)
              }
              className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
            />
            Autorizo el uso de imagen para fines institucionales{" "}
          </label>

          <button
            type="button"
            onClick={() => setShowPolicy(true)}
            className="text-xs text-lgc-primary underline dark:text-lgc-darkPrimary"
          >
            Ver politicas y autorizaciones
          </button>
        </div>
      </div>

      {showPolicy && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="mx-4 max-w-md rounded-2xl border border-lgc-border/70 bg-lgc-surface p-4 shadow-lg dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
            <h3 className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
              Políticas y autorizaciones
            </h3>
            <p className="mt-2 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Aquí va el contenido real de las políticas y
              autorizaciones
            </p>
            <button
              type="button"
              onClick={() => setShowPolicy(false)}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-lgc-primary px-3 py-2 text-xs font-semibold text-lgc-onPrimary shadow-sm hover:bg-lgc-primarySoft
                         dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepBautismo;
