import type { FC, ReactNode } from "react";

type StatusTone = "success" | "muted" | "warning" | "danger";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  status?: { label: string; tone?: StatusTone };
  actions?: ReactNode;
  meta?: ReactNode;
  size?: "md" | "lg";
  className?: string;
};

const STATUS_STYLES: Record<StatusTone, string> = {
  success:
    "bg-lgc-surfaceMuted text-lgc-text dark:bg-lgc-darkSurface dark:text-lgc-darkText",
  muted:
    "bg-lgc-surfaceMuted/60 text-lgc-textMuted dark:bg-lgc-darkSurface dark:text-lgc-darkTextMuted",
  warning:
    "bg-lgc-manna/50 text-lgc-text dark:bg-lgc-darkSurface dark:text-lgc-darkText",
  danger:
    "bg-lgc-danger/10 text-lgc-danger dark:bg-lgc-darkSurface dark:text-lgc-darkAccent",
};

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  subtitle,
  status,
  actions,
  meta,
  size = "md",
  className,
}) => {
  const titleClass =
    size === "lg" ? "text-lg md:text-xl" : "text-base md:text-lg";

  const statusClass = STATUS_STYLES[status?.tone ?? "muted"];

  return (
    <div
      className={[
        "flex flex-col gap-3 md:flex-row md:items-start md:justify-between",
        className ?? "",
      ].join(" ")}
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2
            className={`${titleClass} font-semibold text-lgc-primary dark:text-lgc-darkPrimary`}
          >
            {title}
          </h2>
          {status && (
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium ${statusClass}`}
            >
              {status.label}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
            {subtitle}
          </p>
        )}
      </div>

      {(meta || actions) && (
        <div className="flex flex-wrap items-center gap-2">
          {meta}
          {actions}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
