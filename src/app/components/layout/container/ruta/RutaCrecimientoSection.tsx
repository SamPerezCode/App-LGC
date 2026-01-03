import { useMemo, useState, type FC } from "react";
import type { RutaCrecimiento } from "../../../../../domain/interfaces/lgc-interfaces";
import { rutasMock, actividadesRutaMock } from "../../../../../domain/mock-data/lgc-mock";

const RutaCrecimientoSection: FC = () => {
  const [rutas, setRutas] = useState<RutaCrecimiento[]>(rutasMock);

  // Para contar actividades por ruta (solo UI)
  const actividadesPorRuta = useMemo(() => {
    const map = new Map<string, number>();
    for (const act of actividadesRutaMock) {
      map.set(act.rutaId, (map.get(act.rutaId) ?? 0) + 1);
    }
    return map;
  }, []);

  const handleAgregarRuta = () => {
    // ✅ luego aquí abrimos modal
    console.log("Abrir modal de crear ruta");
  };

  const handleVer = (id: string) => {
    console.log("Ver ruta", id);
  };

  const handleEditar = (id: string) => {
    console.log("Editar ruta", id);
  };

  const handleEliminar = (id: string) => {
    // por ahora solo simulación
    setRutas((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div
      className="
        relative w-full
        rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
      "
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Ruta de crecimiento
          </h2>
          <p className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Administra rutas y sus actividades.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAgregarRuta}
          className="
            inline-flex items-center justify-center rounded-xl
            bg-lgc-primary px-4 py-2 text-xs md:text-sm font-semibold text-lgc-onPrimary
            shadow-sm hover:bg-lgc-primarySoft
            dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
            transition-colors
          "
        >
          Agregar ruta
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-lgc-border/50 dark:border-lgc-darkBorder/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-lgc-surfaceMuted/70 dark:bg-lgc-darkSurface">
            <tr className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Activa</th>
              <th className="px-4 py-3 font-medium">Actividades</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {rutas.map((ruta) => (
              <tr
                key={ruta.id}
                className="border-t border-lgc-border/40 dark:border-lgc-darkBorder/40"
              >
                <td className="px-4 py-3 text-lgc-text dark:text-lgc-darkText">{ruta.nombre}</td>

                <td className="px-4 py-3">
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
                </td>

                <td className="px-4 py-3 text-lgc-text dark:text-lgc-darkText">
                  {actividadesPorRuta.get(ruta.id) ?? 0}
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleVer(ruta.id)}
                      className="
                        rounded-full border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-1
                        text-[11px] font-medium text-lgc-text hover:bg-lgc-surface
                        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
                        dark:hover:bg-lgc-darkSurface
                      "
                    >
                      Ver
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEditar(ruta.id)}
                      className="
                        rounded-full bg-lgc-primary px-3 py-1 text-[11px] font-semibold text-lgc-onPrimary
                        shadow-sm hover:bg-lgc-primarySoft
                        dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
                      "
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEliminar(ruta.id)}
                      className="
                        rounded-full border border-lgc-border/70 bg-lgc-surfaceMuted px-3 py-1
                        text-[11px] font-medium text-lgc-text hover:bg-lgc-surface
                        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText
                        dark:hover:bg-lgc-darkSurface
                      "
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {rutas.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted"
                >
                  No hay rutas creadas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal lo dejamos para el último paso */}
    </div>
  );
};

export default RutaCrecimientoSection;
