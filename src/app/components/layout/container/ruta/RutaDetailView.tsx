import type { FC } from "react";
import type { RutaCrecimiento } from "../../../../../domain/interfaces/lgc-interfaces";
import RutaActividadesMobileCards from "./RutaActividadesMobileCards";

interface RutaDetailViewProps {
  ruta: RutaCrecimiento | null;
  actividades: Array<{
    id: string;
    orden: number;
    nombre: string;
    tipo: string;
    activa: boolean;
  }>;
  onBack: () => void;
  onAddActividad: () => void;
  onEditActividad: (id: string) => void;
  onToggleActividad: (id: string) => void;
}

const RutaDetailView: FC<RutaDetailViewProps> = ({
  ruta,
  actividades,
  onBack,
  onAddActividad,
  onEditActividad,
  onToggleActividad,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="
            inline-flex items-center gap-2 rounded-xl border border-lgc-border/70
            bg-lgc-surfaceMuted px-4 py-2 text-xs md:text-sm font-medium text-lgc-text
            hover:bg-lgc-surface
            dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
            dark:hover:bg-lgc-darkSurface
          "
        >
          <span className="text-base leading-none">←</span>
          Volver
        </button>

        <button
          type="button"
          onClick={onAddActividad}
          className="
            rounded-xl bg-lgc-primary px-4 py-2 text-xs md:text-sm font-semibold text-lgc-onPrimary
            shadow-sm hover:bg-lgc-primarySoft
            dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
            transition-colors
          "
        >
          Agregar actividad
        </button>
      </div>

      {ruta ? (
        <div
          className="
            rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
            dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
          "
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                {ruta.nombre}
              </h3>

              {ruta.descripcion && (
                <p className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  {ruta.descripcion}
                </p>
              )}
            </div>

            <span
              className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium
                ${
                  ruta.activa
                    ? "bg-lgc-surfaceMuted text-lgc-text dark:bg-lgc-darkSurface dark:text-lgc-darkText"
                    : "bg-lgc-surfaceMuted/60 text-lgc-textMuted dark:bg-lgc-darkSurface dark:text-lgc-darkTextMuted"
                }`}
            >
              {ruta.activa ? "Activa" : "Inactiva"}
            </span>
          </div>

          {/* =========================
    ACTIVIDADES: MOBILE + DESKTOP
    ========================= */}

          {/* MOBILE (cards) */}
          <div className="mt-4 md:hidden">
            <RutaActividadesMobileCards
              actividades={actividades}
              onEdit={onEditActividad}
              onToggleActiva={onToggleActividad}
            />
          </div>

          {/* DESKTOP (tabla) */}
          <div className="mt-4 hidden md:block overflow-hidden rounded-2xl border border-lgc-border/50 dark:border-lgc-darkBorder/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-lgc-surfaceMuted/70 dark:bg-lgc-darkSurface">
                <tr className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  <th className="px-4 py-3 font-medium">Actividad</th>
                  <th className="px-4 py-3 font-medium">Nombre</th>
                  <th className="px-4 py-3 font-medium">Tipo</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {actividades.map((act) => (
                  <tr
                    key={act.id}
                    className="border-t border-lgc-border/40 dark:border-lgc-darkBorder/40"
                  >
                    <td className="px-4 py-3 text-lgc-text dark:text-lgc-darkText">
                      {act.orden}
                    </td>
                    <td className="px-4 py-3 text-lgc-text dark:text-lgc-darkText">
                      {act.nombre}
                    </td>
                    <td className="px-4 py-3 text-lgc-text dark:text-lgc-darkText">
                      {act.tipo}
                    </td>

                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => onToggleActividad(act.id)}
                        className="
                    inline-flex items-center justify-between
                    w-28 px-3 py-1
                    rounded-full border border-lgc-border/70
                    bg-lgc-surfaceMuted
                    text-[11px] font-medium text-lgc-text
                    hover:bg-lgc-surface
                    dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
                    transition-colors
                  "
                        aria-pressed={act.activa}
                      >
                        <span className="min-w-[52px] text-left">
                          {act.activa ? "Activa" : "Inactiva"}
                        </span>

                        <span
                          className={`
                      relative inline-flex h-5 w-9 items-center rounded-full transition-colors
                      ${
                        act.activa
                          ? "bg-lgc-primary"
                          : "bg-lgc-border/60 dark:bg-lgc-darkBorder/60"
                      }
                    `}
                        >
                          <span
                            className={`
          inline-block h-4 w-4 rounded-full bg-white transition-transform
          ${act.activa ? "translate-x-4" : "translate-x-1"}
        `}
                          />
                        </span>
                      </button>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => onEditActividad(act.id)}
                          className="
                              rounded-full bg-lgc-primary px-3 py-1 text-[11px] font-semibold text-lgc-onPrimary
                              shadow-sm hover:bg-lgc-primarySoft
                              dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
                            "
                        >
                          Editar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {actividades.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted"
                    >
                      Esta ruta aún no tiene actividades.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-lgc-border/60 bg-lgc-surface p-4 text-xs text-lgc-textMuted shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkTextMuted">
          No se encontró la ruta seleccionada.
        </div>
      )}
    </div>
  );
};

export default RutaDetailView;
