import type { FC } from "react";

const MiembrosAntiguosSection: FC = () => {
  return (
    <div
      className="
        w-full rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
      "
    >
      <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
        Miembros antiguos
      </h2>
      <p className="mt-2 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
        Seccion en construccion. Por ahora puedes usar Personas para
        registrar o actualizar.
      </p>
    </div>
  );
};

export default MiembrosAntiguosSection;
