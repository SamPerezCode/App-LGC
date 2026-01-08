import type { FC } from "react";
import type { KpiData } from "./useDashboardMetrics";

type KpiCardProps = {
  data: KpiData;
};

const KpiCard: FC<KpiCardProps> = ({ data }) => {
  const progress =
    typeof data.progress === "number"
      ? Math.min(100, Math.max(0, data.progress))
      : null;

  return (
    <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-lgc-textMuted dark:text-lgc-darkTextMuted">
            {data.title}
          </p>
          <p className="mt-2 text-2xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            {data.value}
          </p>
          {data.subtitle && (
            <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
              {data.subtitle}
            </p>
          )}
        </div>
        <div
          className={[
            "flex h-11 w-11 items-center justify-center rounded-2xl",
            data.iconBgClass ??
              "bg-lgc-surfaceMuted dark:bg-lgc-darkSurfaceMuted",
          ].join(" ")}
        >
          <img
            src={data.icon}
            alt={data.title}
            className="h-5 w-5 opacity-80"
          />
        </div>
      </div>

      {data.hint && (
        <p className="mt-3 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
          {data.hint}
        </p>
      )}

      {progress !== null && (
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-lgc-border/40 dark:bg-lgc-darkBorder/40">
          <div
            className={[
              "h-full rounded-full",
              data.progressClass ??
                "bg-lgc-primary dark:bg-lgc-darkPrimary",
            ].join(" ")}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default KpiCard;
