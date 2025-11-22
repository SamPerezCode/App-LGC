import type { FC } from "react";

const RutaSection: FC = () => {
  return (
    <div
      className="
        mx-auto w-full
        rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
      "
    >
      <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
        Ruta de crecimiento
      </h2>
      <p className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
        Define y administra las etapas de discipulado, clases y procesos de formación.
      </p>

      <div className="mt-4 space-y-3 text-sm">
        <div className="rounded-xl bg-lgc-surfaceMuted p-3 dark:bg-lgc-darkSurface">
          <p className="font-medium">Etapa 1 · Nuevos creyentes</p>
          <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Introducción a la fe, fundamentos bíblicos básicos.
          </p>
        </div>
        <div className="rounded-xl bg-lgc-surfaceMuted p-3 dark:bg-lgc-darkSurface">
          <p className="font-medium">Etapa 2 · Discipulado</p>
          <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Acompañamiento y crecimiento en comunidad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RutaSection;
