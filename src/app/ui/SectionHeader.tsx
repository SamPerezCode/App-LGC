import type { FC, ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actions,
}) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2">{actions}</div>
      )}
    </div>
  );
};

export default SectionHeader;
