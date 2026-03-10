import { useMemo, type FC, type ChangeEvent } from "react";
import type {
  Persona,
  SeguimientoActividadPersona,
  ActividadRutaCrecimiento,
  RutaCrecimiento,
} from "../../../../../../domain/interfaces/lgc-interfaces";
import ConexionPersonaCard from "./ConexionPersonaCard";

type ConexionPersonasListProps = {
  personas: Persona[];
  seguimientos: SeguimientoActividadPersona[];
  actividades: ActividadRutaCrecimiento[];
  rutas: RutaCrecimiento[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterEstado: string;
  onFilterChange: (value: string) => void;
  onSelectPersona: (id: string) => void;
};

const normalizeText = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const estadoLabels: Record<string, string> = {
  NUEVO: "Nuevo",
  ASISTENTE_REGULAR: "Asistente Regular",
  MIEMBRO: "Miembro",
};

const ConexionPersonasList: FC<ConexionPersonasListProps> = ({
  personas,
  seguimientos,
  actividades,
  rutas,
  searchTerm,
  onSearchChange,
  filterEstado,
  onFilterChange,
  onSelectPersona,
}) => {
  const filteredPersonas = useMemo(() => {
    let result = personas;

    if (filterEstado !== "all") {
      result = result.filter((p) => p.estado === filterEstado);
    }

    if (searchTerm.trim()) {
      const term = normalizeText(searchTerm);
      result = result.filter((p) => {
        const nombre = normalizeText(p.nombreCompleto);
        const telefono = normalizeText(p.telefono ?? "");
        return nombre.includes(term) || telefono.includes(term);
      });
    }

    return result.sort(
      (a, b) =>
        new Date(b.actualizadoEn).getTime() - new Date(a.actualizadoEn).getTime()
    );
  }, [personas, searchTerm, filterEstado]);

  const getPersonaProgress = (personaId: string, estado: string) => {
    const ruta = rutas.find((r) => r.activa && r.aplicaAEstado === estado);
    if (!ruta) return { completed: 0, total: 0, percent: 0 };

    const rutaActividades = actividades.filter((a) => a.rutaId === ruta.id);
    const completadas = seguimientos.filter(
      (s) =>
        s.personaId === personaId &&
        s.estado === "COMPLETADA" &&
        rutaActividades.some((a) => a.id === s.actividadRutaId)
    );

    const total = rutaActividades.length;
    const completed = completadas.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, total, percent };
  };

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleFilterSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  };

  const filterTabs = [
    { id: "all", label: "Todos" },
    { id: "NUEVO", label: "Nuevos" },
    { id: "ASISTENTE_REGULAR", label: "Asistentes" },
    { id: "MIEMBRO", label: "Miembros" },
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-lgc-text dark:text-lgc-darkText">
            Personas
          </h2>
          <p className="mt-0.5 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
            {filteredPersonas.length} {filteredPersonas.length === 1 ? "persona" : "personas"}{" "}
            {filterEstado !== "all" && `en estado "${estadoLabels[filterEstado]}"`}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-xs">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lgc-textMuted dark:text-lgc-darkTextMuted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar personas..."
            value={searchTerm}
            onChange={handleSearchInput}
            className="
              w-full rounded-lg border border-lgc-border/60 bg-white py-2 pl-10 pr-4
              text-sm text-lgc-text placeholder:text-lgc-textMuted/60
              transition-all duration-200
              focus:border-lgc-primary focus:outline-none focus:ring-2 focus:ring-lgc-primary/20
              dark:border-lgc-darkBorder/60 dark:bg-lgc-darkSurface dark:text-lgc-darkText
              dark:placeholder:text-lgc-darkTextMuted/60 dark:focus:border-lgc-darkPrimary
              dark:focus:ring-lgc-darkPrimary/20
            "
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 rounded-lg bg-lgc-surfaceMuted/50 p-1 dark:bg-lgc-darkSurfaceMuted/50">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onFilterChange(tab.id)}
            className={`
              flex-1 rounded-md px-3 py-2 text-xs font-medium transition-all duration-200
              ${
                filterEstado === tab.id
                  ? "bg-white text-lgc-primary shadow-sm dark:bg-lgc-darkSurface dark:text-lgc-darkPrimary"
                  : "text-lgc-textMuted hover:text-lgc-text dark:text-lgc-darkTextMuted dark:hover:text-lgc-darkText"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      {filteredPersonas.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPersonas.map((persona) => {
            const progress = getPersonaProgress(persona.id, persona.estado);
            return (
              <ConexionPersonaCard
                key={persona.id}
                persona={persona}
                progress={progress}
                onSelect={() => onSelectPersona(persona.id)}
              />
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-lgc-border/60 bg-lgc-surfaceMuted/20 py-16 dark:border-lgc-darkBorder/40 dark:bg-lgc-darkSurfaceMuted/20">
          <div className="mb-4 rounded-full bg-lgc-surfaceMuted p-4 dark:bg-lgc-darkSurfaceMuted">
            <svg
              className="h-8 w-8 text-lgc-textMuted/50 dark:text-lgc-darkTextMuted/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-lgc-text dark:text-lgc-darkText">
            No se encontraron personas
          </h3>
          <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
            Intenta ajustar los filtros o el termino de busqueda
          </p>
        </div>
      )}
    </div>
  );
};

export default ConexionPersonasList;
