import type { FC } from "react";
import { RELACIONES } from "./actualizacion.constants";
import type { UpdateField, UpdateForm } from "./actualizacion.types";

type StepSelectorProps = {
  form: UpdateForm;
  onUpdate: UpdateField;
  onSetRegistrando: (value: "self" | "other") => void;
  onSetRelacion: (
    value: "PADRE" | "MADRE" | "TUTOR" | "OTRO" | ""
  ) => void;
};

const StepSelector: FC<StepSelectorProps> = ({
  form,
  onUpdate,
  onSetRegistrando,
  onSetRelacion,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
        Paso 1 de 4. A quien estas registrando?
      </h2>

      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2 rounded-full border border-lgc-border/60 bg-lgc-surfaceMuted/80 px-4 py-2 text-sm text-lgc-text dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText">
          <input
            type="radio"
            name="registrando"
            value="self"
            checked={form.registrando === "self"}
            onChange={() => onSetRegistrando("self")}
            className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
          />
          A mi (mayor de edad)
        </label>

        <label className="flex items-center gap-2 rounded-full border border-lgc-border/60 bg-lgc-surfaceMuted/80 px-4 py-2 text-sm text-lgc-text dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText">
          <input
            type="radio"
            name="registrando"
            value="other"
            checked={form.registrando === "other"}
            onChange={() => onSetRegistrando("other")}
            className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
          />
          A otra persona (menor o a cargo)
        </label>
      </div>

      {form.registrando === "other" && (
        <div className="rounded-2xl border border-dashed border-lgc-border/70 bg-lgc-surfaceMuted/60 p-4 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted">
          <h3 className="text-xs font-semibold text-lgc-text dark:text-lgc-darkText">
            Datos del adulto responsable *
          </h3>

          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
                Nombre completo
              </label>
              <input
                type="text"
                value={form.adultoNombre}
                onChange={(e) =>
                  onUpdate("adultoNombre", e.target.value)
                }
                className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surface px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                           dark:bg-lgc-darkSurface dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
                Relacion
              </label>
              <select
                value={form.adultoRelacion}
                onChange={(e) =>
                  onSetRelacion(
                    e.target
                      .value as StepSelectorProps["onSetRelacion"] extends (
                      value: infer R
                    ) => void
                      ? R
                      : never
                  )
                }
                className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surface px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                           dark:bg-lgc-darkSurface dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
              >
                {RELACIONES.map((relacion) => (
                  <option key={relacion.value} value={relacion.value}>
                    {relacion.label}
                  </option>
                ))}
              </select>
            </div>

            {form.adultoRelacion === "OTRO" && (
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
                  Cual es el otro tipo de relacion?
                </label>
                <input
                  type="text"
                  value={form.adultoRelacionOtro}
                  onChange={(e) =>
                    onUpdate("adultoRelacionOtro", e.target.value)
                  }
                  className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surface px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                             dark:bg-lgc-darkSurface dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
                />
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
                Contacto (telefono o correo)
              </label>
              <input
                type="text"
                value={form.adultoContacto}
                onChange={(e) =>
                  onUpdate("adultoContacto", e.target.value)
                }
                className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surface px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                           dark:bg-lgc-darkSurface dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
                placeholder="Ej: 3200000000 o correo@ejemplo.com"
              />
              <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Solo para confirmar informacion del menor.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepSelector;
