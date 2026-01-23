import type { FC } from "react";
import { Link } from "react-router-dom";
import { DOCUMENTOS } from "./actualizacion.constants";
import type { UpdateField, UpdateForm } from "./actualizacion.types";
import type { Persona } from "../../../../domain/interfaces/lgc-interfaces";

type StepAdultoResponsableProps = {
  form: UpdateForm;
  onUpdate: UpdateField;
  onBuscar: () => void;
  adultoEncontrado: Persona | null;
  error?: string | null;
};

const StepAdultoResponsable: FC<StepAdultoResponsableProps> = ({
  form,
  onUpdate,
  onBuscar,
  adultoEncontrado,
  error,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
        Paso 2 de 4. Adulto responsable (ya registrado)
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Tipo de documento *
          </label>
          <select
            value={form.adultoTipoDocumento}
            onChange={(e) =>
              onUpdate("adultoTipoDocumento", e.target.value)
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
            value={form.adultoNumeroDocumento}
            onChange={(e) =>
              onUpdate("adultoNumeroDocumento", e.target.value)
            }
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                       focus:border-transparent focus:ring-2 focus:ring-lgc-primary focus:ring-offset-1 focus:ring-offset-lgc-surface
                       dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
                       dark:focus:ring-lgc-darkPrimary dark:focus:ring-offset-lgc-darkSurface"
            placeholder="Ej: 12345678"
          />
          <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Usa el mismo documento con el que fue registrado.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs md:text-sm text-red-700">
          {error}{" "}
          <Link to="/registro-persona" className="underline">
            Registrar adulto
          </Link>
        </div>
      )}

      {adultoEncontrado && (
        <div className="rounded-2xl border border-dashed border-lgc-border/70 bg-lgc-surfaceMuted/60 p-4 dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted">
          <h3 className="text-xs font-semibold text-lgc-text dark:text-lgc-darkText">
            Adulto responsable
          </h3>
          <div className="mt-3 space-y-1 text-xs md:text-sm">
            <p>
              <span className="font-semibold">Nombre:</span>{" "}
              {adultoEncontrado.nombreCompleto}
            </p>
            <p>
              <span className="font-semibold">Documento:</span>{" "}
              {adultoEncontrado.tipoDocumento ?? "-"}{" "}
              {adultoEncontrado.numeroDocumento ?? "-"}
            </p>
            <p>
              <span className="font-semibold">Telefono:</span>{" "}
              {adultoEncontrado.telefono ?? "-"}
            </p>
            <p>
              <span className="font-semibold">Correo:</span>{" "}
              {adultoEncontrado.correo ?? "-"}
            </p>
            <p>
              <span className="font-semibold">Direccion:</span>{" "}
              {adultoEncontrado.direccion ?? "-"}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        {!adultoEncontrado && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onBuscar}
              className="rounded-xl bg-lgc-primary px-4 py-2 text-xs md:text-sm font-semibold text-lgc-onPrimary shadow-sm hover:bg-lgc-primarySoft
                 dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna"
            >
              Buscar
            </button>
          </div>
        )}

        {adultoEncontrado && (
          <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted text-right">
            Adulto confirmado. Puedes continuar.
          </p>
        )}
      </div>
    </div>
  );
};

export default StepAdultoResponsable;
