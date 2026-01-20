import type { FC } from "react";
import type { Step } from "./actualizacion.types";

type ProgressBarProps = {
  current: Step;
};

const ProgressBar: FC<ProgressBarProps> = ({ current }) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4].map((index) => (
        <span
          key={index}
          className={`h-2 flex-1 rounded-full ${
            index <= current
              ? "bg-lgc-primary dark:bg-lgc-darkPrimary"
              : "bg-lgc-border/70 dark:bg-lgc-darkBorder/70"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
