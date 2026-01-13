import { type FC, type ChangeEvent } from "react";
import type { Persona } from "../../../../../../domain/interfaces/lgc-interfaces";
import Pagination from "../../../../../ui/Pagination";
import PersonasListViewMobile from "./PersonasListViewMobile";
import PersonasListToolbar from "./PersonasListToolbar";
import PersonasListTable from "./PersonasListTable";

type PersonasListViewProps = {
  search: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCreate: () => void;
  pageItems: Persona[];
  filteredCount: number;
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onSeguimiento: (id: string) => void;
};

const PersonasListView: FC<PersonasListViewProps> = ({
  search,
  onSearchChange,
  onCreate,
  pageItems,
  filteredCount,
  page,
  totalPages,
  onPrev,
  onNext,
  onView,
  onEdit,
  onSeguimiento,
}) => {
  return (
    <>
      {/* Buscador + botón */}
      <PersonasListToolbar
        search={search}
        onSearchChange={onSearchChange}
        onCreate={onCreate}
      />

      {/* === TABLA (desktop) === */}
      <PersonasListTable
        pageItems={pageItems}
        onView={onView}
        onEdit={onEdit}
        onSeguimiento={onSeguimiento}
      />

      {/* === CARDS (mobile) === */}
      <PersonasListViewMobile
        pageItems={pageItems}
        onView={onView}
        onEdit={onEdit}
        onSeguimiento={onSeguimiento}
      />

      {/* Paginador */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        showingCount={pageItems.length}
        totalCount={filteredCount}
        itemLabel="personas"
        onPrev={onPrev}
        onNext={onNext}
      />
    </>
  );
};

export default PersonasListView;
