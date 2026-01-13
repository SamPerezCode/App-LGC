import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Persona } from "../../../../../domain/interfaces/lgc-interfaces";
import { personasMock } from "../../../../../domain/mock-data/lgc-mock";

type PersonasContextValue = {
  personas: Persona[];
  setPersonas: React.Dispatch<React.SetStateAction<Persona[]>>;
};

const PersonasContext = createContext<PersonasContextValue | null>(
  null
);

const STORAGE_KEY = "lgc:personas";

const getInitialPersonas = (): Persona[] => {
  if (typeof window === "undefined") return personasMock;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return personasMock;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? (parsed as Persona[])
      : personasMock;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return personasMock;
  }
};

export const PersonasProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [personas, setPersonas] = useState<Persona[]>(
    getInitialPersonas
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(personas));
  }, [personas]);

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
