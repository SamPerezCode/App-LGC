// src/app/components/common/SuccessModal.tsx
import type { FC, ReactNode } from "react";

interface SuccessModalProps {
  open: boolean;
  title?: string;
  message: ReactNode;
  onClose: () => void;
}

const SuccessModal: FC<SuccessModalProps> = ({
  open,
  title = "Operación exitosa",
  message,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div
        className="
          mx-4 max-w-sm rounded-2xl border border-lgc-border/70
          bg-lgc-surface px-5 py-4 text-center shadow-lg
          dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface
        "
      >
        <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-manna">
          {title}
        </h2>
        <div className="mt-2 text-xs md:text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
          {message}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="
            mt-4 inline-flex items-center justify-center rounded-xl
            bg-lgc-primary px-4 py-2 text-xs md:text-sm font-semibold text-lgc-onPrimary
            shadow-sm hover:bg-lgc-primarySoft
            dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary dark:hover:bg-lgc-manna
            transition-colors
          "
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
