import type { FC } from "react";
import Button from "./Button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  showingCount: number;
  totalCount: number;
  itemLabel?: string;
  onPrev: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel?: string;
  pageLabel?: string;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  showingCount,
  totalCount,
  itemLabel = "items",
  onPrev,
  onNext,
  prevLabel = "Anterior",
  nextLabel = "Siguiente",
  pageLabel = "Pagina",
}) => {
  return (
    <div
      className="
        flex flex-col items-center gap-3 pt-4
        text-xs md:flex-row md:justify-center md:gap-6 md:text-sm
      "
    >
      <span className="text-lgc-textMuted dark:text-lgc-darkTextMuted text-center">
        Mostrando{" "}
        <span className="font-semibold">{showingCount}</span> de{" "}
        <span className="font-semibold">{totalCount}</span>{" "}
        {itemLabel}
      </span>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="md"
          onClick={onPrev}
          disabled={currentPage === 1}
        >
          {prevLabel}
        </Button>

        <span className="text-lgc-textMuted dark:text-lgc-darkTextMuted">
          {pageLabel}{" "}
          <span className="font-semibold">{currentPage}</span> de{" "}
          <span className="font-semibold">{totalPages}</span>
        </span>

        <Button
          variant="outline"
          size="md"
          onClick={onNext}
          disabled={currentPage === totalPages}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
