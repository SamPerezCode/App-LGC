import type { FC } from "react";
import type { AppSection } from "../../../types/layout";

import DashboardSection from "./dashboard/DashboardSection";
import PersonasSection from "./personas/PersonasSection";
import RutaSection from "./ruta/RutaSection";
import SeguimientoSection from "./seguimiento/SeguimientoSection";
import ConfigSection from "./config/ConfigSection";

interface ContainProps {
  activeSection: AppSection;
}

const Contain: FC<ContainProps> = ({ activeSection }) => {
  return (
    <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
      {activeSection === "dashboard" && <DashboardSection />}

      {activeSection === "personas" && <PersonasSection />}

      {activeSection === "ruta" && <RutaSection />}

      {activeSection === "seguimiento" && <SeguimientoSection />}

      {activeSection === "config" && <ConfigSection />}
    </main>
  );
};

export default Contain;
