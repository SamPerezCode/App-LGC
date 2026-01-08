import type { FC } from "react";
import type { Persona } from "../../../../../../domain/interfaces/lgc-interfaces";
import type { PersonaCreateInput } from "../personas.types";
import RegistrarPersonaForm from "../RegistrarPersonaForm";
import { mapPersonaToFormInput } from "../personas.utils";

type PersonasEditViewProps = {
  persona: Persona | null;
  onBack: () => void;
  onSave: (data: PersonaCreateInput) => void;
  onCancel: () => void;
};

const PersonasEditView: FC<PersonasEditViewProps> = ({
  persona,
  onBack,
  onSave,
  onCancel,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="
            inline-flex items-center gap-1 rounded-full border border-lgc-border/70
            bg-lgc-surfaceMuted px-4 py-1.5 text-xs md:text-sm font-medium text-lgc-text
            hover:bg-lgc-surface
            dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
            dark:hover:bg-lgc-darkSurface
          "
        >
          <span className="text-base leading-none">
            ƒÅ?
          </span>
          <span>Volver</span>
        </button>
      </div>

      {persona ? (
        <RegistrarPersonaForm
          onSave={onSave}
          onCancel={onCancel}
          initialData={
            mapPersonaToFormInput(persona) ?? undefined
          }
          submitLabel="Guardar cambios"
        />
      ) : (
        <div
          className="
            rounded-xl border border-lgc-border/60 bg-lgc-surface p-4 text-xs
            text-lgc-textMuted shadow-sm
            dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkTextMuted
          "
        >
          No se encontrÇü la persona que deseas editar.
        </div>
      )}
    </div>
  );
};

export default PersonasEditView;
