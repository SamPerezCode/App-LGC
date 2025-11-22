import type { FC } from "react";

const DashboardSection: FC = () => {
  return (
    <div
      className="
        mx-auto w-full
        rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
      "
    >
      <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
        Resumen general
      </h2>
      <p className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
        Aquí puedes ver un resumen del estado general de la iglesia y los módulos.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-lgc-border/60 bg-lgc-surfaceMuted p-3 text-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">Personas activas</p>
          <p className="mt-1 text-xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            128
          </p>
        </div>
        <div className="rounded-xl border border-lgc-border/60 bg-lgc-surfaceMuted p-3 text-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">Procesos de ruta</p>
          <p className="mt-1 text-xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">7</p>
        </div>
        <div className="rounded-xl border border-lgc-border/60 bg-lgc-surfaceMuted p-3 text-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
          <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Seguimientos activos
          </p>
          <p className="mt-1 text-xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            23
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
