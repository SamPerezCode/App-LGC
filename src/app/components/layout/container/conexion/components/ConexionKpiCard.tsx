import type { FC } from "react";

type ConexionKpiCardProps = {
  label: string;
  value: number | string;
  sublabel?: string;
  trend?: "up" | "down" | null;
  variant?: "default" | "accent" | "success";
};

const variantStyles = {
  default: {
    container:
      "border-lgc-border/50 bg-lgc-surface dark:border-lgc-darkBorder/50 dark:bg-lgc-darkSurface",
    value: "text-lgc-primary dark:text-lgc-darkPrimary",
    indicator: "bg-lgc-olive/20",
  },
  accent: {
    container:
      "border-lgc-accent/30 bg-lgc-accent/5 dark:border-lgc-darkAccent/30 dark:bg-lgc-darkAccent/10",
    value: "text-lgc-accent dark:text-lgc-darkAccent",
    indicator: "bg-lgc-accent/20",
  },
  success: {
    container:
      "border-lgc-olive/40 bg-lgc-olive/5 dark:border-lgc-olive/30 dark:bg-lgc-olive/10",
    value: "text-lgc-everdeep dark:text-lgc-olive",
    indicator: "bg-lgc-olive/30",
  },
};

const ConexionKpiCard: FC<ConexionKpiCardProps> = ({
  label,
  value,
  sublabel,
  trend,
  variant = "default",
}) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border p-4 transition-all
        hover:shadow-sm
        ${styles.container}
      `}
    >
      {/* Subtle indicator line at top */}
      <div className={`absolute inset-x-0 top-0 h-1 ${styles.indicator}`} />

      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wide text-lgc-textMuted dark:text-lgc-darkTextMuted">
          {label}
        </span>

        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-semibold ${styles.value}`}>
            {value}
          </span>
          {trend && (
            <span
              className={`text-xs font-medium ${
                trend === "up"
                  ? "text-lgc-olive"
                  : "text-lgc-clay"
              }`}
            >
              {trend === "up" ? "+" : "-"}
            </span>
          )}
        </div>

        {sublabel && (
          <span className="text-[11px] text-lgc-textMuted dark:text-lgc-darkTextMuted">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default ConexionKpiCard;
