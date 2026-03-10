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

const estadoConfig: Record<
  string,
  { label: string; badgeClass: string }
> = {
  NUEVO: {
    label: "Nuevo",
    badgeClass:
      "bg-lgc-accent/15 text-lgc-accent dark:bg-lgc-darkAccent/20 dark:text-lgc-darkAccent",
  },
  ASISTENTE_REGULAR: {
    label: "Asistente",
    badgeClass:
      "bg-lgc-olive/15 text-lgc-everdeep dark:bg-lgc-olive/20 dark:text-lgc-olive",
  },
  MIEMBRO: {
    label: "Miembro",
    badgeClass:
      "bg-lgc-primary/10 text-lgc-primary dark:bg-lgc-darkPrimary/15 dark:text-lgc-darkPrimary",
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
        group flex w-full flex-col gap-3 rounded-2xl border border-lgc-border/50 bg-lgc-surface p-4
        text-left transition-all
        hover:border-lgc-primary/30 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-lgc-primary/20
        dark:border-lgc-darkBorder/50 dark:bg-lgc-darkSurface
        dark:hover:border-lgc-darkPrimary/30
      "
    >
      {/* Header: Avatar + Name + Badge */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="
            flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full
            bg-lgc-olive/20 text-sm font-semibold text-lgc-everdeep
            dark:bg-lgc-olive/30 dark:text-lgc-manna
          "
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className="
                flex-1 truncate text-sm font-medium text-lgc-text
                group-hover:text-lgc-primary
                dark:text-lgc-darkText dark:group-hover:text-lgc-darkPrimary
              "
            >
              {persona.nombreCompleto}
            </h3>
            <span
              className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${estado.badgeClass}`}
            >
              {estado.label}
            </span>
          </div>

          {/* Contact info */}
          <p className="mt-0.5 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            {persona.telefono}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      {progress.total > 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Progreso en ruta
            </span>
            <span className="text-[11px] font-medium text-lgc-text dark:text-lgc-darkText">
              {progress.completed}/{progress.total}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-lgc-border/30 dark:bg-lgc-darkBorder/30">
            <div
              className={`h-full rounded-full transition-all ${
                progress.percent === 100
                  ? "bg-lgc-olive"
                  : "bg-lgc-accent"
              }`}
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[11px] text-lgc-textMuted dark:text-lgc-darkTextMuted">
          Actualizado: {formatDate(persona.actualizadoEn)}
        </span>
        <svg
          className="h-4 w-4 text-lgc-textMuted/50 transition-transform group-hover:translate-x-0.5 group-hover:text-lgc-primary dark:text-lgc-darkTextMuted/50 dark:group-hover:text-lgc-darkPrimary"
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
      </div>
    </button>
  );
};

export default ConexionPersonaCard;
