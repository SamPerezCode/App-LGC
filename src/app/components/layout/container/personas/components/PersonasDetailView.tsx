import type { FC } from "react";
import type { Persona } from "../../../../../../domain/interfaces/lgc-interfaces";
import { estadoLabel, formatFecha } from "../personas.utils";

type PersonasDetailViewProps = {
  persona: Persona | null;
  onBack: () => void;
  onEdit: () => void;
};

const PersonasDetailView: FC<PersonasDetailViewProps> = ({
  persona,
  onBack,
  onEdit,
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
          <span className="text-base leading-none">←</span>
          <span>Volver al listado</span>
        </button>

        {persona && (
          <button
            type="button"
            onClick={onEdit}
            className="
              inline-flex items-center gap-1 rounded-full bg-lgc-primary px-4 py-1.5
              text-xs md:text-sm font-semibold text-lgc-onPrimary shadow-sm
              hover:bg-lgc-primarySoft
              dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
            "
          >
            Editar
          </button>
        )}
      </div>

      {persona ? (
        <div className="space-y-4 rounded-xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Nombre completo
              </p>
              <p className="mt-1 text-sm md:text-base font-semibold text-lgc-text dark:text-lgc-darkText">
                {persona.nombreCompleto}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Teléfono
              </p>
              <p className="mt-1 text-sm text-lgc-text dark:text-lgc-darkText">
                {persona.telefono ?? "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Correo
              </p>
              <p className="mt-1 text-sm text-lgc-text dark:text-lgc-darkText">
                {persona.correo ?? "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Dirección
              </p>
              <p className="mt-1 text-sm text-lgc-text dark:text-lgc-darkText">
                {persona.direccion ?? "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Género
              </p>
              <p className="mt-1 text-sm text-lgc-text dark:text-lgc-darkText">
                {persona.genero === "MASCULINO"
                  ? "Masculino"
                  : "Femenino"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Estado civil
              </p>
              <p className="mt-1 text-sm text-lgc-text dark:text-lgc-darkText">
                {persona.estadoCivil}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Fecha de nacimiento
              </p>
              <p className="mt-1 text-sm text-lgc-text dark:text-lgc-darkText">
                {persona.fechaNacimiento
                  ? formatFecha(persona.fechaNacimiento)
                  : "-"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-between gap-3 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            <span>
              Estado en la iglesia:{" "}
              <span className="font-semibold text-lgc-text dark:text-lgc-darkText">
                {estadoLabel[persona.estado]}
              </span>
            </span>
            <span>
              Última actualización:{" "}
              {formatFecha(persona.actualizadoEn)}
            </span>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-lgc-border/60 bg-lgc-surface p-4 text-xs text-lgc-textMuted shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkTextMuted">
          No se encontró la información de la persona seleccionada.
        </div>
      )}
    </div>
  );
};

export default PersonasDetailView;
