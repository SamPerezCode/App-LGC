import type { FC } from "react";
import type { RutaCrecimiento } from "../../../../../domain/interfaces/lgc-interfaces";
import RutaActividadesMobileCards from "./RutaActividadesMobileCards";

import SectionHeader from "../../../../ui/SectionHeader";
import BackButton from "../../../../ui/BackButton";
import Button from "../../../../ui/Button";
import StatusToggle from "../../../../ui/StatusToggle";

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
      <BackButton onClick={onBack} />

      {ruta ? (
        <div
          className="
            rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
            dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
          "
        >
          <SectionHeader
            title={ruta.nombre}
            subtitle={ruta.descripcion}
            status={{
              label: ruta.activa ? "Activa" : "Inactiva",
              tone: ruta.activa ? "success" : "muted",
            }}
            actions={
              <Button variant="primary" onClick={onAddActividad}>
                Agregar actividad
              </Button>
            }
          />

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
                      <StatusToggle
                        checked={act.activa}
                        onClick={() => onToggleActividad(act.id)}
                        onLabel="Activa"
                        offLabel="Inactiva"
                      />
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="primary"
                          onClick={() => onEditActividad(act.id)}
                        >
                          {" "}
                          Editar
                        </Button>
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
