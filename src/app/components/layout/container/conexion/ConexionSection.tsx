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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
          Conexion
        </h1>
        <p className="text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
          Seguimiento y acompanamiento de nuevos creyentes
        </p>
      </header>

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
