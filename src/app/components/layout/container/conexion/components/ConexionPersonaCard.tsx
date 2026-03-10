import type { FC } from "react";
import type { Persona } from "../../../../../../domain/interfaces/lgc-interfaces";

type Progress = {
  completed: number;
  total: number;
  percent: number;
};

type ConexionPersonaCardProps = {
  persona: Persona;
  progress: Progress;
  onSelect: () => void;
};

const estadoConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  NUEVO: {
    label: "Nuevo",
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
  ASISTENTE_REGULAR: {
    label: "Asistente",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  MIEMBRO: {
    label: "Miembro",
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
};

const formatDate = (iso: string): string => {
  const date = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} dias`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} sem`;
  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
  });
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const ConexionPersonaCard: FC<ConexionPersonaCardProps> = ({
  persona,
  progress,
  onSelect,
}) => {
  const estado = estadoConfig[persona.estado] ?? estadoConfig.NUEVO;
  const initials = getInitials(persona.nombreCompleto);

  return (
    <button
      type="button"
      onClick={onSelect}
      className="
        group relative flex w-full flex-col rounded-xl border border-lgc-border/40
        bg-white p-5 text-left transition-all duration-200
        hover:border-lgc-primary/30 hover:shadow-lg hover:shadow-lgc-primary/5
        focus:outline-none focus:ring-2 focus:ring-lgc-primary/20
        dark:border-lgc-darkBorder/40 dark:bg-lgc-darkSurface
        dark:hover:border-lgc-darkPrimary/30 dark:hover:shadow-lgc-darkPrimary/5
      "
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className="
            flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full
            bg-gradient-to-br from-lgc-olive/20 to-lgc-olive/30
            text-sm font-semibold text-lgc-everdeep
            dark:from-lgc-olive/30 dark:to-lgc-olive/40 dark:text-lgc-manna
          "
        >
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className="
              truncate text-sm font-semibold text-lgc-text transition-colors
              group-hover:text-lgc-primary
              dark:text-lgc-darkText dark:group-hover:text-lgc-darkPrimary
            "
          >
            {persona.nombreCompleto}
          </h3>
          <p className="mt-0.5 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            {persona.telefono}
          </p>
          <span
            className={`
              mt-2 inline-flex items-center rounded-full px-2 py-0.5
              text-[10px] font-medium ${estado.bgColor} ${estado.color}
            `}
          >
            {estado.label}
          </span>
        </div>
      </div>

      {/* Progress */}
      {progress.total > 0 && (
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Progreso
            </span>
            <span className="text-xs font-medium text-lgc-text dark:text-lgc-darkText">
              {progress.percent}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-lgc-surfaceMuted dark:bg-lgc-darkSurfaceMuted">
            <div
              className={`
                h-full rounded-full transition-all duration-500
                ${progress.percent === 100 ? "bg-emerald-500" : "bg-lgc-accent"}
              `}
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-lgc-border/30 pt-4 dark:border-lgc-darkBorder/30">
        <span className="text-[11px] text-lgc-textMuted dark:text-lgc-darkTextMuted">
          {formatDate(persona.actualizadoEn)}
        </span>
        <span className="flex items-center gap-1 text-[11px] font-medium text-lgc-primary opacity-0 transition-opacity group-hover:opacity-100 dark:text-lgc-darkPrimary">
          Ver detalle
          <svg
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </button>
  );
};

export default ConexionPersonaCard;
