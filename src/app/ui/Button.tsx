import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: ReactNode;
};

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: `
    bg-lgc-primary text-lgc-onPrimary font-semibold shadow-sm
    hover:bg-lgc-primarySoft
    dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
  `,
  outline: `
    border border-lgc-border/70 bg-lgc-surfaceMuted text-lgc-text font-medium
    hover:bg-lgc-surface
    dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted dark:text-lgc-darkText dark:hover:bg-lgc-darkSurface
  `,
  ghost: `
    text-lgc-text font-medium hover:bg-lgc-surfaceMuted
    dark:text-lgc-darkText dark:hover:bg-lgc-darkSurfaceMuted
  `,
  danger: `
    bg-lgc-danger text-white font-semibold shadow-sm
    hover:opacity-90
    dark:bg-lgc-darkAccent dark:text-white
  `,
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "rounded-full px-3 py-1 text-[11px]",
  md: "rounded-xl px-4 py-2 text-xs md:text-sm",
};

const Button: FC<ButtonProps> = ({
  variant = "outline",
  size = "md",
  startIcon,
  className,
  disabled,
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2 transition-colors",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        disabled ? "opacity-60 cursor-not-allowed" : "",
        className ?? "",
      ].join(" ")}
      {...rest}
    >
      {startIcon}
      {children}
    </button>
  );
};

export default Button;
