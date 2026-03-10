import { useState, type FC } from "react";
import type {
  Persona,
  RutaCrecimiento,
  ActividadRutaCrecimiento,
  SeguimientoActividadPersona,
} from "../../../../../domain/interfaces/lgc-interfaces";
import ConexionDashboard from "./components/ConexionDashboard";
import ConexionPersonasList from "./components/ConexionPersonasList";
import ConexionPersonaDetail from "./components/ConexionPersonaDetail";
import { useConexionMetrics } from "./hooks/useConexionMetrics";

type ConexionView = "dashboard" | "detail";

type ConexionSectionProps = {
  personas: Persona[];
  rutas: RutaCrecimiento[];
  actividades: ActividadRutaCrecimiento[];
  seguimientos: SeguimientoActividadPersona[];
  setSeguimientos: React.Dispatch<
    React.SetStateAction<SeguimientoActividadPersona[]>
  >;
};

const ConexionSection: FC<ConexionSectionProps> = ({
  personas,
  rutas,
  actividades,
  seguimientos,
  setSeguimientos,
}) => {
  const [view, setView] = useState<ConexionView>("dashboard");
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("all");

  const metrics = useConexionMetrics(personas, seguimientos, actividades);

  const selectedPersona = personas.find((p) => p.id === selectedPersonaId) ?? null;

  const handleSelectPersona = (id: string) => {
    setSelectedPersonaId(id);
    setView("detail");
  };

  const handleBackToDashboard = () => {
    setView("dashboard");
    setSelectedPersonaId(null);
  };

  if (view === "detail" && selectedPersona) {
    return (
      <ConexionPersonaDetail
        persona={selectedPersona}
        rutas={rutas}
        actividades={actividades}
        seguimientos={seguimientos}
        setSeguimientos={setSeguimientos}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-lgc-text dark:text-lgc-darkText">
            Conexion
          </h1>
          <p className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Seguimiento de nuevos creyentes en su camino de fe
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="
              inline-flex items-center gap-2 rounded-lg bg-lgc-primary px-4 py-2.5
              text-sm font-medium text-lgc-onPrimary shadow-sm
              transition-all hover:bg-lgc-primarySoft hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-lgc-primary/50 focus:ring-offset-2
              dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary
              dark:hover:bg-lgc-manna dark:focus:ring-lgc-darkPrimary/50
            "
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Persona
          </button>
        </div>
      </div>

      {/* Dashboard KPIs */}
      <ConexionDashboard metrics={metrics} />

      {/* Lista de Personas */}
      <ConexionPersonasList
        personas={personas}
        seguimientos={seguimientos}
        actividades={actividades}
        rutas={rutas}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterEstado={filterEstado}
        onFilterChange={setFilterEstado}
        onSelectPersona={handleSelectPersona}
      />
    </div>
  );
};

export default ConexionSection;
