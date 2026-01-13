import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { personasApi } from "../../domain/api/personas.api";
import { rutasApi } from "../../domain/api/rutas.api";
import { actividadesApi } from "../../domain/api/actividades.api";

type ApiContextValue = {
  personas: typeof personasApi;
  rutas: typeof rutasApi;
  actividades: typeof actividadesApi;
};

const ApiContext = createContext<ApiContextValue | null>(null);

export const ApiProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useMemo(
    () => ({
      personas: personasApi,
      rutas: rutasApi,
      actividades: actividadesApi,
    }),
    []
  );

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const ctx = useContext(ApiContext);
  if (!ctx) {
    throw new Error("useApi must be used within ApiProvider");
  }
  return ctx;
};
