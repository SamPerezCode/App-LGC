import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          w-full rounded-xl border border-lgc-border/70 bg-lgc-surfaceMuted/80
          px-3 py-2 text-xs md:text-sm text-lgc-text shadow-sm outline-none
          focus:border-transparent focus:ring-2 focus:ring-lgc-primary focus:ring-offset-1 focus:ring-offset-lgc-surface
          dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
          dark:focus:ring-lgc-darkPrimary dark:focus:ring-offset-lgc-darkSurface
          ${className}
        `}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
