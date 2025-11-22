import type { FC } from "react";

const ConfigSection: FC = () => {
  return (
    <div
      className="
        mx-auto w-full
        rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
      "
    >
      <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
        Configuración
      </h2>
      <p className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
        Ajusta opciones generales de la aplicación, roles y preferencias.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-2 text-sm">
        <div className="rounded-xl bg-lgc-surfaceMuted p-3 dark:bg-lgc-darkSurface">
          <p className="font-medium">Datos de la iglesia</p>
          <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Nombre, dirección, horarios de reunión, etc.
          </p>
        </div>
        <div className="rounded-xl bg-lgc-surfaceMuted p-3 dark:bg-lgc-darkSurface">
          <p className="font-medium">Roles y permisos</p>
          <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Administra qué puede ver y hacer cada tipo de usuario.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfigSection;
