import type { FC } from "react";
import type { RangeOption } from "./useDashboardMetrics";

type RangeSelectorProps = {
  options: RangeOption[];
  value: RangeOption;
  onChange: (value: RangeOption) => void;
};

const RangeSelector: FC<RangeSelectorProps> = ({
  options,
  value,
  onChange,
}) => (
  <div className="inline-flex items-center gap-1 rounded-2xl border border-lgc-border/60 bg-lgc-surface p-1 text-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
    {options.map((option) => (
      <button
        key={option.label}
        type="button"
        onClick={() => onChange(option)}
        className={[
          "rounded-xl px-3 py-1.5 font-medium transition-colors",
          value.label === option.label
            ? "bg-lgc-primary text-lgc-onPrimary dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary"
            : "text-lgc-textMuted hover:bg-lgc-surfaceMuted dark:text-lgc-darkTextMuted dark:hover:bg-lgc-darkSurfaceMuted",
        ].join(" ")}
      >
        {option.label}
      </button>
    ))}
  </div>
);

export default RangeSelector;
