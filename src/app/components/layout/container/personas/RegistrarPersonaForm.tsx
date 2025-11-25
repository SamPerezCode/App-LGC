// src/app/components/layout/container/personas/RegistrarPersonaForm.tsx
import { useState, type FC, type FormEvent } from "react";
import type { PersonaCreateInput } from "./personas.types";
import { validatePersonaForm } from "./personas.utils";

interface RegistrarPersonaFormProps {
  onSave: (data: PersonaCreateInput) => void;
  onCancel?: () => void; // opcional
  hideCancelUntilDirty?: boolean; // opcional: oculta "Cancelar" hasta que se modifique algo
  initialData?: PersonaCreateInput; // opcional: para modo edición
  submitLabel?: string;
}

// estado base para “crear”
const EMPTY_FORM: PersonaCreateInput = {
  nombreCompleto: "",
  telefono: "",
  whatsapp: "",
  correo: "",
  direccion: "",
  genero: "MASCULINO",
  estadoCivil: "SOLTERO",
  fechaNacimiento: "",
  estado: "NUEVO",
};

const RegistrarPersonaForm: FC<RegistrarPersonaFormProps> = ({
  onSave,
  onCancel,
  hideCancelUntilDirty = false,
  initialData,
  submitLabel = "Guardar persona",
}) => {
  // usamos initialData solo al montar el componente
  const [form, setForm] = useState<PersonaCreateInput>(() => initialData ?? EMPTY_FORM);

  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: keyof PersonaCreateInput, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
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
            onChange={(e) => handleChange("nombreCompleto", e.target.value)}
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

        {/* WhatsApp */}
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            WhatsApp
          </label>
          <input
            type="tel"
            value={form.whatsapp ?? ""}
            onChange={(e) => handleChange("whatsapp", e.target.value)}
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
            onChange={(e) => handleChange("direccion", e.target.value)}
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
            value={form.genero ?? "MASCULINO"}
            onChange={(e) => handleChange("genero", e.target.value)}
            className="
              mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80
              px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
              dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
            "
          >
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
            value={form.estadoCivil ?? "SOLTERO"}
            onChange={(e) => handleChange("estadoCivil", e.target.value)}
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                       dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
          >
            <option value="SOLTERO">Soltero(a)</option>
            <option value="CASADO">Casado(a)</option>
            <option value="DIVORCIADO">Divorciado(a)</option>
            <option value="VIUDO">Viudo(a)</option>
            <option value="OTRO">Otro</option>
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
            onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                       dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
          />
        </div>

        {/* Estado dentro de la iglesia */}
        <div>
          <label className="block text-xs font-medium text-lgc-text dark:text-lgc-darkText">
            Estado en la iglesia
          </label>
          <select
            value={form.estado}
            onChange={(e) => handleChange("estado", e.target.value)}
            className="mt-1 w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80 px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
                       dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText"
          >
            <option value="NUEVO">Nuevo</option>
            <option value="ASISTENTE_REGULAR">Asistente regular</option>
            <option value="MIEMBRO">Miembro</option>
          </select>
        </div>
      </div>

      {error && (
        <p className="text-xs md:text-sm text-lgc-danger dark:text-lgc-darkAccent">{error}</p>
      )}

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (!hideCancelUntilDirty || isDirty) && (
          <button
            type="button"
            onClick={onCancel}
            className="
              rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-4 py-2
              text-xs md:text-sm text-lgc-text hover:bg-lgc-surface
              dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
              dark:hover:bg-lgc-darkSurface
          "
          >
            Cancelar
          </button>
        )}

        <button
          type="submit"
          className="
            rounded-xl bg-lgc-primary px-4 py-2 text-xs md:text-sm font-semibold text-lgc-onPrimary
            shadow-sm hover:bg-lgc-primarySoft
            dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
            transition-colors
          "
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default RegistrarPersonaForm;
