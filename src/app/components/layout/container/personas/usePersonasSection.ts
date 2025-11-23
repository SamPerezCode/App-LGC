import { useState, useEffect, useMemo, type ChangeEvent } from "react";
import type { Persona } from "../../../../../domain/interfaces/lgc-interfaces";
import { personasMock } from "../../../../../domain/mock-data/lgc-mock";

import type { PersonaCreateInput } from "./personas.types";
import { estadoLabel, normalizeText } from "./personas.utils";

const PAGE_SIZE = 5;

export const usePersonasSection = () => {
  const [personas, setPersonas] = useState<Persona[]>(personasMock);

  const [view, setView] = useState<"list" | "create">("list");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // cerrar mensaje de éxito después de 3 segundos
  useEffect(() => {
    if (!successMessage) return;

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // personas filtradas
  const filtered = useMemo(() => {
    const term = normalizeText(search);
    if (!term) return personas;

    return personas.filter((persona) => {
      const nombre = normalizeText(persona.nombreCompleto);
      const telefono = normalizeText(persona.telefono ?? "");
      const estadoTexto = normalizeText(estadoLabel[persona.estado] ?? persona.estado);

      return nombre.includes(term) || telefono.includes(term) || estadoTexto.includes(term);
    });
  }, [personas, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return filtered.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filtered, page]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const handleSavePersona = (data: PersonaCreateInput) => {
    const now = new Date().toISOString();

    const newPersona: Persona = {
      ...data,
      id: `PER-${String(personas.length + 1).padStart(3, "0")}`,
      creadoEn: now,
      actualizadoEn: now,
    };

    setPersonas((prev) => [...prev, newPersona]);
    setView("list");
    setPage(1);
    setSuccessMessage("Persona registrada correctamente.");
  };

  const closeSuccessMessage = () => setSuccessMessage(null);

  return {
    // estado “público”
    view,
    setView,
    search,
    page,
    successMessage,
    filtered,
    pageItems,
    totalPages,
    // handlers
    handleSearchChange,
    handlePrev,
    handleNext,
    handleSavePersona,
    closeSuccessMessage,
  };
};
