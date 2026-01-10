// src/app/components/layout/container/personas/PersonasSection.tsx
import type { FC } from "react";
import RegistrarPersonaForm from "./RegistrarPersonaForm";
import { usePersonasSection } from "./usePersonasSection";
import SuccessModal from "../../../common/SuccessModal";
import SeguimientoSection from "../seguimiento/SeguimientoSection";
import PersonasListView from "./components/PersonasListView";
import PersonasDetailView from "./components/PersonasDetailView";
import PersonasEditView from "./components/PersonasEditView";
import type {
  RutaCrecimiento,
  ActividadRutaCrecimiento,
  SeguimientoActividadPersona,
} from "../../../../../domain/interfaces/lgc-interfaces";

type PersonasSectionProps = {
  rutas: RutaCrecimiento[];
  actividades: ActividadRutaCrecimiento[];
  seguimientos: SeguimientoActividadPersona[];
  setSeguimientos: React.Dispatch<
    React.SetStateAction<SeguimientoActividadPersona[]>
  >;
};

const PersonasSection: FC<PersonasSectionProps> = ({
  rutas,
  actividades,
  seguimientos,
  setSeguimientos,
}) => {
  const {
    view,
    navigateTo,
    goBack,
    selectedPersona,
    search,
    page,
    successMessage,
    filtered,
    pageItems,
    totalPages,
    handleSearchChange,
    handlePrev,
    handleNext,
    handleSavePersona,
    handleViewPersona,
    handleEditPersona,
    handleUpdatePersona,
    closeSuccessMessage,
    handleSeguimientoPersona,
  } = usePersonasSection();

  // const handleBackToList = () => {
  //   setView("list");
  //   resetSelection();
  // };

  return (
    <div
      className="
        relative
        w-full
        rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm
        dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurfaceMuted
      "
    >
      {/* Modal de exito reutilizable */}
      <SuccessModal
        open={!!successMessage}
        title="AcciÇün exitosa"
        message={
          successMessage ?? "La operación se completó correctamente."
        }
        onClose={closeSuccessMessage}
      />

      <div className="space-y-4 md:space-y-6">
        {/* TÇðtulo */}
        <div>
          <h2 className="text-base md:text-lg font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
            Personas de la iglesia
          </h2>
        </div>

        {view === "list" && (
          <PersonasListView
            search={search}
            onSearchChange={handleSearchChange}
            onCreate={() => navigateTo("create")}
            pageItems={pageItems}
            filteredCount={filtered.length}
            page={page}
            totalPages={totalPages}
            onPrev={handlePrev}
            onNext={handleNext}
            onView={handleViewPersona}
            onEdit={handleEditPersona}
            onSeguimiento={handleSeguimientoPersona}
          />
        )}

        {view === "create" && (
          <RegistrarPersonaForm
            onCancel={goBack}
            onSave={handleSavePersona}
          />
        )}

        {view === "detail" && (
          <PersonasDetailView
            persona={selectedPersona}
            onBack={goBack}
            onEdit={() =>
              selectedPersona && handleEditPersona(selectedPersona.id)
            }
          />
        )}

        {view === "edit" && (
          <PersonasEditView
            persona={selectedPersona}
            onBack={goBack}
            onSave={handleUpdatePersona}
            onCancel={goBack}
          />
        )}

        {view === "seguimiento" && selectedPersona && (
          <SeguimientoSection
            persona={selectedPersona}
            rutas={rutas}
            actividades={actividades}
            seguimientos={seguimientos}
            setSeguimientos={setSeguimientos}
            onBack={goBack}
          />
        )}

        {view === "seguimiento" && !selectedPersona && (
          <p className="text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
            No hay persona seleccionada.
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonasSection;
