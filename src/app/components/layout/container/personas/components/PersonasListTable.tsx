import type { FC } from "react";
import type { Persona } from "../../../../../../domain/interfaces/lgc-interfaces";
import { estadoLabel, formatFecha } from "../personas.utils";
import Button from "../../../../../ui/Button";

type PersonasListTableProps = {
  pageItems: Persona[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onSeguimiento: (id: string) => void;
};

const PersonasListTable: FC<PersonasListTableProps> = ({
  pageItems,
  onView,
  onEdit,
  onSeguimiento,
}) => {
  return (
    <div className="hidden md:block">
      <div className="overflow-x-auto rounded-xl border border-lgc-border/60 dark:border-lgc-darkBorder/70">
        <table className="min-w-full text-left text-xs md:text-sm">
          <thead className="bg-lgc-surfaceMuted dark:bg-lgc-darkSurface">
            <tr>
              <th className="px-4 py-2 font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Nombre
              </th>
              <th className="px-4 py-2 font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Teléfono
              </th>
              <th className="px-4 py-2 font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Estado
              </th>
              <th className="px-4 py-2 font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Ultima actualización
              </th>
              <th className="px-4 py-2 font-medium text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((persona) => (
              <tr
                key={persona.id}
                className="border-t border-lgc-border/40 dark:border-lgc-darkBorder/40"
              >
                <td className="px-4 py-2">
                  {persona.nombreCompleto}
                </td>
                <td className="px-4 py-2">
                  {persona.telefono ?? "-"}
                </td>
                <td className="px-4 py-2">
                  {estadoLabel[persona.estado]}
                </td>
                <td className="px-4 py-2">
                  {formatFecha(persona.actualizadoEn)}
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => onView(persona.id)}
                      size="sm"
                    >
                      Ver
                    </Button>

                    <Button
                      onClick={() => onEdit(persona.id)}
                      variant="primary"
                      size="sm"
                    >
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="accentSoft"
                      onClick={() => onSeguimiento(persona.id)}
                    >
                      Seguimiento
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {pageItems.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-4 text-center text-xs md:text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted"
                >
                  No se encontraron personas con ese criterio.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonasListTable;
