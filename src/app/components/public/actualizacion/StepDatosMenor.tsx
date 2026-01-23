import type { FC } from "react";
import { DOCUMENTOS, RELACIONES } from "./actualizacion.constants";
import type { UpdateField, UpdateForm } from "./actualizacion.types";
import type { Persona } from "../../../../domain/interfaces/lgc-interfaces";

type StepDatosMenorProps = {
  form: UpdateForm;
  adulto: Persona | null;
  onUpdate: UpdateField;
  onSetRelacion: (
    value: "PADRE" | "MADRE" | "TUTOR" | "OTRO" | ""
  ) => void;
};

const StepDatosMenor: FC<StepDatosMenorProps> = ({
  form,
  adulto,
  onUpdate,
  onSetRelacion,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
        Paso 3 de 4. Datos del menor
      </h2>

      <div className="rounded-2xl border border-dashed border-lgc-border/70 bg-lgc-surfaceMuted/60 p-4 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted">
        <h3 className="text-xs font-semibold text-lgc-text dark:text-lgc-darkText">
          Adulto responsable
        </h3>

        {adulto ? (
          <div className="mt-3 space-y-1 text-xs md:text-sm">
            <p>
              <span className="font-semibold">Nombre:</span>{" "}
              {adulto.nombreCompleto}
            </p>
            <p>
              <span className="font-semibold">Documento:</span>{" "}
              {adulto.tipoDocumento ?? "-"}{" "}
              {adulto.numeroDocumento ?? "-"}
            </p>
            <p>
              <span className="font-semibold">Telefono:</span>{" "}
              {adulto.telefono ?? "-"}
            </p>
            <p>
              <span className="font-semibold">Correo:</span>{" "}
              {adulto.correo ?? "-"}
            </p>
            <p>
              <span className="font-semibold">Direccion:</span>{" "}
              {adulto.direccion ?? "-"}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Aun no se ha confirmado el adulto responsable.
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Vinculo con el menor *
          </label>
          <select
            value={form.adultoRelacion}
            onChange={(e) =>
              onSetRelacion(
                e.target
                  .value as StepDatosMenorProps["onSetRelacion"] extends (
                  value: infer R
                ) => void
                  ? R
                  : never
              )
            }
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                       dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
          >
            {RELACIONES.map((relacion) => (
              <option key={relacion.value} value={relacion.value}>
                {relacion.label}
              </option>
            ))}
          </select>
        </div>

        {form.adultoRelacion === "OTRO" && (
          <div>
            <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
              Otro vinculo *
            </label>
            <input
              type="text"
              value={form.adultoRelacionOtro}
              onChange={(e) =>
                onUpdate("adultoRelacionOtro", e.target.value)
              }
              className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                         dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
            />
          </div>
        )}

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Nombre completo del menor *
          </label>
          <input
            type="text"
            value={form.nombreCompleto}
            onChange={(e) =>
              onUpdate("nombreCompleto", e.target.value)
            }
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                       focus:border-transparent focus:ring-2 focus:ring-lgc-primary focus:ring-offset-1 focus:ring-offset-lgc-surface
                       dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
                       dark:focus:ring-lgc-darkPrimary dark:focus:ring-offset-lgc-darkSurface"
            placeholder="Ej: Maria Jose Perez Gomez"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Fecha de nacimiento *
          </label>
          <input
            type="date"
            value={form.fechaNacimiento}
            onChange={(e) =>
              onUpdate("fechaNacimiento", e.target.value)
            }
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                       dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Tipo de documento *
          </label>
          <select
            value={form.tipoDocumento}
            onChange={(e) =>
              onUpdate("tipoDocumento", e.target.value)
            }
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                       dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
          >
            {DOCUMENTOS.map((doc) => (
              <option key={doc.value} value={doc.value}>
                {doc.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Numero de documento *
          </label>
          <input
            type="text"
            value={form.numeroDocumento}
            onChange={(e) =>
              onUpdate("numeroDocumento", e.target.value)
            }
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                       focus:border-transparent focus:ring-2 focus:ring-lgc-primary focus:ring-offset-1 focus:ring-offset-lgc-surface
                       dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
                       dark:focus:ring-lgc-darkPrimary dark:focus:ring-offset-lgc-darkSurface"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Genero *
          </label>
          <div className="mt-1 flex flex-wrap gap-3">
            <label className="flex items-center gap-2 rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/70 px-3 py-2 text-xs md:text-sm text-lgc-text dark:border-lgc-darkBorder/80 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText">
              <input
                type="radio"
                name="genero"
                value="MASCULINO"
                checked={form.genero === "MASCULINO"}
                onChange={() => onUpdate("genero", "MASCULINO")}
                className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
              />
              Masculino
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/70 px-3 py-2 text-xs md:text-sm text-lgc-text dark:border-lgc-darkBorder/80 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText">
              <input
                type="radio"
                name="genero"
                value="FEMENINO"
                checked={form.genero === "FEMENINO"}
                onChange={() => onUpdate("genero", "FEMENINO")}
                className="h-4 w-4 accent-lgc-primary dark:accent-lgc-darkPrimary"
              />
              Femenino
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepDatosMenor;
