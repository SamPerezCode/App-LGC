import type { FC } from "react";
import { DOCUMENTOS, ESTADO_CIVIL } from "./actualizacion.constants";
import type { UpdateField, UpdateForm } from "./actualizacion.types";

type StepDatosPersonalesProps = {
  form: UpdateForm;
  age: number | null;
  isMinor: boolean;
  onUpdate: UpdateField;
};

const StepDatosPersonales: FC<StepDatosPersonalesProps> = ({
  form,
  age,
  isMinor,
  onUpdate,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
        Paso 2 de 4. Datos personales
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Nombre completo *
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
            placeholder="Ej: Juan David Perez Gomez"
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
          {age !== null && (
            <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Edad aproximada: {age} anos.
            </p>
          )}
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
            placeholder="Ej: 1234567890"
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

        {!isMinor && (
          <div>
            <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
              Estado civil *
            </label>
            <select
              value={form.estadoCivil}
              onChange={(e) =>
                onUpdate("estadoCivil", e.target.value)
              }
              className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                         dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
            >
              {ESTADO_CIVIL.map((estado) => (
                <option key={estado.value} value={estado.value}>
                  {estado.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {!isMinor && (
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
              Correo electronico *
            </label>
            <input
              type="email"
              value={form.correo}
              onChange={(e) => onUpdate("correo", e.target.value)}
              className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                         focus:border-transparent focus:ring-2 focus:ring-lgc-primary focus:ring-offset-1 focus:ring-offset-lgc-surface
                         dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
                         dark:focus:ring-lgc-darkPrimary dark:focus:ring-offset-lgc-darkSurface"
              placeholder="Ej: correo@ejemplo.com"
            />
            <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Lo usaremos para contacto y actualizaciones.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepDatosPersonales;
