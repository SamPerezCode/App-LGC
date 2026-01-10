// src/app/components/layout/container/personas/usePersonasSection.ts
import { useMemo, useState, type ChangeEvent } from "react";
import type { Persona } from "../../../../../domain/interfaces/lgc-interfaces";
import { estadoLabel, normalizeText } from "./personas.utils";
import type { PersonaCreateInput } from "./personas.types";
import { usePersonasContext } from "./PersonasContext";

type ViewMode = "list" | "create" | "detail" | "edit" | "seguimiento";

const PAGE_SIZE = 5;

export const usePersonasSection = () => {
  const { personas, setPersonas } = usePersonasContext();
  const [view, setView] = useState<ViewMode>("list");
  const [viewHistory, setViewHistory] = useState<ViewMode[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [pageState, setPageState] = useState(1);

  const [successMessage, setSuccessMessage] = useState<string | null>(
    null
  );

  const navigateTo = (next: ViewMode) => {
    setViewHistory((prev) => [...prev, view]);
    setView(next);
  };

  const goBack = (fallback: ViewMode = "list") => {
    setViewHistory((prev) => {
      if (!prev.length) {
        setView(fallback);
        if (fallback === "list") setSelectedId(null);
        return prev;
      }

      const last = prev[prev.length - 1];
      setView(last);
      if (last === "list") setSelectedId(null);
      return prev.slice(0, -1);
    });
  };

  const selectedPersona = useMemo(
    () => personas.find((p) => p.id === selectedId) ?? null,
    [personas, selectedId]
  );

  const resetSelection = () => setSelectedId(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPageState(1);
  };

  const filtered = useMemo(() => {
    const term = normalizeText(search);
    if (!term) return personas;

    return personas.filter((persona) => {
      const nombre = normalizeText(persona.nombreCompleto);
      const telefono = normalizeText(persona.telefono ?? "");
      const estadoTexto = normalizeText(
        estadoLabel[persona.estado] ?? persona.estado
      );

      return (
        nombre.includes(term) ||
        telefono.includes(term) ||
        estadoTexto.includes(term)
      );
    });
  }, [personas, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );
  const page = Math.min(pageState, totalPages); // página “segura”
  const startIndex = (page - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const handlePrev = () =>
    setPageState((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setPageState((prev) => Math.min(prev + 1, totalPages));

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    window.setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleSavePersona = (data: PersonaCreateInput) => {
    const now = new Date().toISOString();

    const newPersona = {
      ...data,
      id: `PER-${String(personas.length + 1).padStart(3, "0")}`,
      creadoEn: now,
      actualizadoEn: now,
    } as Persona;

    setPersonas((prev) => [...prev, newPersona]);
    setView("list");
    setViewHistory([]);
    setSelectedId(null);
    setPageState(1);
    showSuccess("Persona registrada correctamente.");
  };

  const handleUpdatePersona = (data: PersonaCreateInput) => {
    if (!selectedId) return;

    const now = new Date().toISOString();

    setPersonas((prev) =>
      prev.map((persona) =>
        persona.id === selectedId
          ? ({
              ...persona,
              ...data,
              actualizadoEn: now,
            } as Persona)
          : persona
      )
    );

    goBack("detail");
    showSuccess("Datos de la persona actualizados correctamente.");
  };

  const handleViewPersona = (id: string) => {
    setSelectedId(id);
    navigateTo("detail");
  };

  const handleEditPersona = (id: string) => {
    setSelectedId(id);
    navigateTo("edit");
  };

  const handleSeguimientoPersona = (id: string) => {
    setSelectedId(id);
    navigateTo("seguimiento");
  };

  const closeSuccessMessage = () => setSuccessMessage(null);

  return {
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
    handleSeguimientoPersona,
    handleUpdatePersona,
    closeSuccessMessage,
  };
};

export type UsePersonasSectionReturn = ReturnType<
  typeof usePersonasSection
>;
