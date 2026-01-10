import type { ButtonHTMLAttributes, FC } from "react";

type StatusToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  checked: boolean;
  onLabel?: string;
  offLabel?: string;
  widthClass?: string;
};

const StatusToggle: FC<StatusToggleProps> = ({
  checked,
  onLabel = "Activa",
  offLabel = "Inactiva",
  widthClass = "w-28",
  className,
  disabled,
  ...rest
}) => {
  return (
    <button
      type="button"
      aria-pressed={checked}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-between px-3 py-1 rounded-full",
        "border border-lgc-border/70 bg-lgc-surfaceMuted text-[11px] font-medium text-lgc-text",
        "hover:bg-lgc-surface transition-colors",
        "dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText",
        widthClass,
        disabled ? "opacity-60 cursor-not-allowed" : "",
        className ?? "",
      ].join(" ")}
      {...rest}
    >
      <span className="min-w-[52px] text-left">
        {checked ? onLabel : offLabel}
      </span>

      <span
        className={[
          "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
          checked
            ? "bg-lgc-primary"
            : "bg-lgc-border/60 dark:bg-lgc-darkBorder/60",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-4 w-4 rounded-full bg-white transition-transform",
            checked ? "translate-x-4" : "translate-x-1",
          ].join(" ")}
        />
      </span>
    </button>
  );
};

export default StatusToggle;
