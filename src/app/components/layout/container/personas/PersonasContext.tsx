import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Persona } from "../../../../../domain/interfaces/lgc-interfaces";
import { personasMock } from "../../../../../domain/mock-data/lgc-mock";

type PersonasContextValue = {
  personas: Persona[];
  setPersonas: React.Dispatch<
    React.SetStateAction<Persona[]>
  >;
};

const PersonasContext =
  createContext<PersonasContextValue | null>(null);

export const PersonasProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [personas, setPersonas] =
    useState<Persona[]>(personasMock);

  const value = useMemo(
    () => ({ personas, setPersonas }),
    [personas]
  );

  return (
    <PersonasContext.Provider value={value}>
      {children}
    </PersonasContext.Provider>
  );
};

export const usePersonasContext = () => {
  const ctx = useContext(PersonasContext);
  if (!ctx) {
    throw new Error(
      "usePersonasContext must be used within PersonasProvider"
    );
  }
  return ctx;
};
