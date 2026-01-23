import { useState, type FC, type FormEvent } from "react";
import type { PersonaCreateInput } from "./personas.types";
import { validatePersonaForm } from "./personas.utils";

interface RegistrarPersonaFormProps {
  onSave: (data: PersonaCreateInput) => void;
  onCancel?: () => void;
  hideCancelUntilDirty?: boolean;
  initialData?: PersonaCreateInput;
  submitLabel?: string;
  cancelLabel?: string;
}

const EMPTY_FORM: PersonaCreateInput = {
  nombreCompleto: "",
  telefono: "",
};

const RegistrarPersonaForm: FC<RegistrarPersonaFormProps> = ({
  onSave,
  onCancel,
  initialData,
  submitLabel = "Guardar persona",
  cancelLabel = "Cancelar",
}) => {
  // usamos initialData solo al montar el componente
  const [form, setForm] = useState<PersonaCreateInput>(
    () => initialData ?? EMPTY_FORM
  );
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (
    field: keyof PersonaCreateInput,
    value: string
  ) => {
    const normalized = value === "" ? undefined : value;

    setForm((prev) => ({
      ...prev,
      [field]: normalized,
    }));

    if (!isDirty) setIsDirty(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errorMessage = validatePersonaForm(form);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError(null);
    onSave(form);
    setIsDirty(false); // por si reutilizas el form sin desmontarlo
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Nombre */}
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Nombre completo *
          </label>
          <input
            type="text"
            value={form.nombreCompleto}
            onChange={(e) =>
              handleChange("nombreCompleto", e.target.value)
            }
            className="mt-1 w-full rounded-xl border border-lgc-border/70
                       bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text
                       shadow-sm outline-none
                       focus:border-transparent focus:ring-2 focus:ring-lgc-primary focus:ring-offset-1 focus:ring-offset-lgc-surface
                       dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
                       dark:focus:ring-lgc-darkPrimary dark:focus:ring-offset-lgc-darkSurface"
            placeholder="Ej: Carlos Pérez"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Teléfono *
          </label>
          <input
            type="tel"
            value={form.telefono ?? ""}
            onChange={(e) => handleChange("telefono", e.target.value)}
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                        focus:border-transparent focus:ring-2 focus:ring-lgc-primary focus:ring-offset-1 focus:ring-offset-lgc-surface
                        dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
                        dark:focus:ring-lgc-darkPrimary dark:focus:ring-offset-lgc-darkSurface"
          />
        </div>

        {/* Identificación: tipo + número */}
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Tipo de documento
          </label>
          <select
            value={form.tipoDocumento ?? ""}
            onChange={(e) =>
              handleChange("tipoDocumento", e.target.value)
            }
            className="
              mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80
              px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
              dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
            "
          >
            <option value="">Seleccione…</option>
            <option value="CC">Cédula de ciudadanía</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="PASAPORTE">Pasaporte</option>
            <option value="TI">Tarjeta de identidad</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Número de documento
          </label>
          <input
            type="text"
            value={form.numeroDocumento ?? ""}
            onChange={(e) =>
              handleChange("numeroDocumento", e.target.value)
            }
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                        focus:border-transparent focus:ring-2 focus:ring-lgc-primary focus:ring-offset-1 focus:ring-offset-lgc-surface
                        dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
                        dark:focus:ring-lgc-darkPrimary dark:focus:ring-offset-lgc-darkSurface"
          />
        </div>

        {/* Correo */}
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Correo
          </label>
          <input
            type="email"
            value={form.correo ?? ""}
            onChange={(e) => handleChange("correo", e.target.value)}
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                        focus:border-transparent focus:ring-2 focus:ring-lgc-primary focus:ring-offset-1 focus:ring-offset-lgc-surface
                        dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
                        dark:focus:ring-lgc-darkPrimary dark:focus:ring-offset-lgc-darkSurface"
          />
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Dirección
          </label>
          <input
            type="text"
            value={form.direccion ?? ""}
            onChange={(e) =>
              handleChange("direccion", e.target.value)
            }
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                        focus:border-transparent focus:ring-2 focus:ring-lgc-primary focus:ring-offset-1 focus:ring-offset-lgc-surface
                        dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
                        dark:focus:ring-lgc-darkPrimary dark:focus:ring-offset-lgc-darkSurface"
          />
        </div>

        {/* Género */}
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Género
          </label>
          <select
            value={form.genero ?? ""}
            onChange={(e) => handleChange("genero", e.target.value)}
            className="
              mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80
              px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
              dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
            "
          >
            <option value="">Seleccione…</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMENINO">Femenino</option>
          </select>
        </div>

        {/* Estado civil */}
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Estado civil
          </label>
          <select
            value={form.estadoCivil ?? ""}
            onChange={(e) =>
              handleChange("estadoCivil", e.target.value)
            }
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                       dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
          >
            <option value="">Seleccione…</option>
            <option value="SOLTERO">Soltero(a)</option>
            <option value="CASADO">Casado(a)</option>
            <option value="UNION_LIBRE">Unión libre</option>
            <option value="DIVORCIADO">Divorciado(a)</option>
            <option value="SEPARADO">Separado(a)</option>
            <option value="VIUDO">Viudo(a)</option>
          </select>
        </div>

        {/* Fecha nacimiento */}
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            value={form.fechaNacimiento ?? ""}
            onChange={(e) =>
              handleChange("fechaNacimiento", e.target.value)
            }
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                       dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
          />
        </div>

        {/* Nota: Estado en la iglesia se asume NUEVO en este formulario */}
      </div>

      {error && (
        <p className="text-xs md:text-sm text-lgc-danger dark:text-lgc-darkAccent">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between pt-2">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-4 py-2 text-xs md:text-sm text-lgc-text hover:bg-lgc-surface
               dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText dark:hover:bg-lgc-darkSurface"
          >
            {cancelLabel}
          </button>
        ) : (
          <span />
        )}

        <button
          type="submit"
          className="rounded-xl bg-lgc-primary px-4 py-2 text-xs md:text-sm font-semibold text-lgc-onPrimary shadow-sm hover:bg-lgc-primarySoft
               dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default RegistrarPersonaForm;
