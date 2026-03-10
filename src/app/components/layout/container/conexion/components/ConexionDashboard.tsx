import type { FC } from "react";
import type { ConexionMetrics } from "../hooks/useConexionMetrics";
import ConexionKpiCard from "./ConexionKpiCard";

type ConexionDashboardProps = {
  metrics: ConexionMetrics;
};

const ConexionDashboard: FC<ConexionDashboardProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <ConexionKpiCard
        label="Total Personas"
        value={metrics.totalPersonas}
        trend={null}
        variant="default"
      />
      <ConexionKpiCard
        label="Nuevos Creyentes"
        value={metrics.nuevos}
        sublabel="Requieren seguimiento"
        variant="accent"
      />
      <ConexionKpiCard
        label="Asistentes Regulares"
        value={metrics.asistentesRegulares}
        sublabel="En proceso de integracion"
        variant="default"
      />
      <ConexionKpiCard
        label="Miembros"
        value={metrics.miembros}
        sublabel="Integrados a la iglesia"
        variant="success"
      />
    </div>
  );
};

export default ConexionDashboard;
