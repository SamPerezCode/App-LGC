import type { FC } from "react";
import type { Persona } from "../../../../../domain/interfaces/lgc-interfaces";

interface SeguimientoSectionProps {
  persona: Persona;
  onBack: () => void;
}

const SeguimientoSection: FC<SeguimientoSectionProps> = ({ persona, onBack }) => {
  return (
    <div
      className="
        mx-auto w-full
        rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
      "
    >
      {/* Header + volver */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Seguimiento
          </h2>
          <p className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Persona:{" "}
            <span className="font-semibold text-lgc-text dark:text-lgc-darkText">
              {persona.nombreCompleto}
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="
            rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted px-4 py-2
            text-xs md:text-sm text-lgc-text hover:bg-lgc-surface
            dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
            dark:hover:bg-lgc-darkSurface
          "
        >
          Volver
        </button>
      </div>

      {/* Placeholder (por ahora) */}
      <p className="mt-4 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
        Aquí registraremos llamadas, visitas y acciones (más adelante lo conectamos con datos
        reales).
      </p>

      <ul className="mt-4 space-y-2 text-sm">
        <li className="rounded-xl bg-lgc-surfaceMuted p-3 dark:bg-lgc-darkSurface">
          Llamada · pendiente
        </li>
        <li className="rounded-xl bg-lgc-surfaceMuted p-3 dark:bg-lgc-darkSurface">
          Visita · completada
        </li>
      </ul>
    </div>
  );
};

export default SeguimientoSection;
