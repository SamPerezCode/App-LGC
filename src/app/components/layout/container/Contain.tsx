import { useState, type FC } from "react";
import type { AppSection } from "../../../types/layout";

import DashboardSection from "./dashboard/DashboardSection";
import PersonasSection from "./personas/PersonasSection";
import ConfigSection from "./config/ConfigSection";
import RutaCrecimientoSection from "./ruta/RutaCrecimientoSection";

import type {
  RutaCrecimiento,
  ActividadRutaCrecimiento,
  SeguimientoActividadPersona,
} from "../../../../domain/interfaces/lgc-interfaces";

import {
  rutasMock,
  actividadesRutaMock,
  seguimientosMock,
} from "../../../../domain/mock-data/lgc-mock";

interface ContainProps {
  activeSection: AppSection;
}

const Contain: FC<ContainProps> = ({ activeSection }) => {
  const [rutas, setRutas] = useState<RutaCrecimiento[]>(rutasMock);
  const [actividades, setActividades] = useState<
    ActividadRutaCrecimiento[]
  >(actividadesRutaMock);

  const [seguimientos, setSeguimientos] =
    useState<SeguimientoActividadPersona[]>(seguimientosMock);

  return (
    <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
      {activeSection === "dashboard" && (
        <DashboardSection
          actividades={actividades}
          seguimientos={seguimientos}
        />
      )}

      {activeSection === "personas" && (
        <PersonasSection
          rutas={rutas}
          actividades={actividades}
          seguimientos={seguimientos}
          setSeguimientos={setSeguimientos}
        />
      )}

      {activeSection === "ruta" && (
        <RutaCrecimientoSection
          rutas={rutas}
          setRutas={setRutas}
          actividades={actividades}
          setActividades={setActividades}
        />
      )}

      {activeSection === "config" && <ConfigSection />}
    </main>
  );
};

export default Contain;
