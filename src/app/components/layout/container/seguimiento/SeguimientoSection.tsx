import type { FC } from "react";

const SeguimientoSection: FC = () => {
  return (
    <div
      className="
        mx-auto w-full
        rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
      "
    >
      <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
        Seguimiento
      </h2>
      <p className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
        Registra llamadas, visitas y acciones para cuidar a las personas.
      </p>

      <ul className="mt-4 space-y-2 text-sm">
        <li className="rounded-xl bg-lgc-surfaceMuted p-3 dark:bg-lgc-darkSurface">
          Llamada a Juan Pérez · pendiente
        </li>
        <li className="rounded-xl bg-lgc-surfaceMuted p-3 dark:bg-lgc-darkSurface">
          Visita a María Gómez · completada
        </li>
      </ul>
    </div>
  );
};

export default SeguimientoSection;
