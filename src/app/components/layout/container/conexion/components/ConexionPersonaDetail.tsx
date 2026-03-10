import { useMemo, useState, type FC } from "react";
import type {
  Persona,
  RutaCrecimiento,
  ActividadRutaCrecimiento,
  SeguimientoActividadPersona,
} from "../../../../../../domain/interfaces/lgc-interfaces";
import ConexionTimeline from "./ConexionTimeline";
import ConexionRegistroModal from "./ConexionRegistroModal";
import Button from "../../../../../ui/Button";

type ConexionPersonaDetailProps = {
  persona: Persona;
  rutas: RutaCrecimiento[];
  actividades: ActividadRutaCrecimiento[];
  seguimientos: SeguimientoActividadPersona[];
  setSeguimientos: React.Dispatch<
    React.SetStateAction<SeguimientoActividadPersona[]>
  >;
  onBack: () => void;
};

const estadoConfig: Record<
  string,
  { label: string; description: string; color: string }
> = {
  NUEVO: {
    label: "Nuevo Creyente",
    description: "Persona recien registrada que necesita acompanamiento inicial",
    color: "bg-lgc-accent/15 text-lgc-accent border-lgc-accent/30",
  },
  ASISTENTE_REGULAR: {
    label: "Asistente Regular",
    description: "Asiste regularmente y esta en proceso de integracion",
    color: "bg-lgc-olive/15 text-lgc-everdeep border-lgc-olive/30",
  },
  MIEMBRO: {
    label: "Miembro",
    description: "Completamente integrado a la comunidad de la iglesia",
    color: "bg-lgc-primary/10 text-lgc-primary border-lgc-primary/20",
  },
};

const formatDate = (iso: string): string => {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const getCurrentUserName = () => {
  try {
    const raw = localStorage.getItem("lgc:user");
    if (!raw) return "Administrador";
    const parsed = JSON.parse(raw);
    return parsed?.nombre ?? "Administrador";
  } catch {
    return "Administrador";
  }
};

const ConexionPersonaDetail: FC<ConexionPersonaDetailProps> = ({
  persona,
  rutas,
  actividades,
  seguimientos,
  setSeguimientos,
  onBack,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const estado = estadoConfig[persona.estado] ?? estadoConfig.NUEVO;
  const initials = getInitials(persona.nombreCompleto);

  // Find applicable route for current estado
  const rutaAplicable = useMemo(() => {
    return rutas.find((r) => r.activa && r.aplicaAEstado === persona.estado) ?? null;
  }, [rutas, persona.estado]);

  // Get activities for the route
  const actividadesDeRuta = useMemo(() => {
    if (!rutaAplicable) return [];
    return actividades
      .filter((a) => a.rutaId === rutaAplicable.id)
      .sort((a, b) => a.orden - b.orden);
  }, [actividades, rutaAplicable]);

  // Get seguimientos for this persona
  const seguimientosPersona = useMemo(
    () => seguimientos.filter((s) => s.personaId === persona.id),
    [seguimientos, persona.id]
  );

  const seguimientosCompletados = useMemo(
    () => seguimientosPersona.filter((s) => s.estado === "COMPLETADA"),
    [seguimientosPersona]
  );

  const actividadCompletadaIds = useMemo(
    () => new Set(seguimientosCompletados.map((s) => s.actividadRutaId)),
    [seguimientosCompletados]
  );

  const actividadesDisponibles = useMemo(
    () => actividadesDeRuta.filter((a) => !actividadCompletadaIds.has(a.id)),
    [actividadesDeRuta, actividadCompletadaIds]
  );

  // Calculate progress
  const progress = {
    completed: seguimientosCompletados.length,
    total: actividadesDeRuta.length,
    percent:
      actividadesDeRuta.length > 0
        ? Math.round((seguimientosCompletados.length / actividadesDeRuta.length) * 100)
        : 0,
  };

  const handleSaveActividad = (data: {
    actividadId: string;
    fecha: string;
    observaciones: string;
  }) => {
    const newEntry: SeguimientoActividadPersona = {
      id: `SEG-${Date.now()}`,
      personaId: persona.id,
      actividadRutaId: data.actividadId,
      estado: "COMPLETADA",
      fechaAsignacion: new Date().toISOString(),
      fechaCumplimiento: new Date(data.fecha).toISOString(),
      observaciones: data.observaciones?.trim() || undefined,
      registradoPorUsuarioId: getCurrentUserName(),
    };

    setSeguimientos((prev) => [...prev, newEntry]);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="
          flex w-fit items-center gap-2 text-sm text-lgc-textMuted transition-colors
          hover:text-lgc-primary
          dark:text-lgc-darkTextMuted dark:hover:text-lgc-darkPrimary
        "
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Volver a la lista
      </button>

      {/* Profile Card */}
      <div
        className="
          rounded-2xl border border-lgc-border/50 bg-lgc-surface p-6
          dark:border-lgc-darkBorder/50 dark:bg-lgc-darkSurface
        "
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Left: Avatar + Info */}
          <div className="flex items-start gap-4">
            <div
              className="
                flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl
                bg-lgc-olive/20 text-xl font-semibold text-lgc-everdeep
                dark:bg-lgc-olive/30 dark:text-lgc-manna
              "
            >
              {initials}
            </div>

            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                {persona.nombreCompleto}
              </h1>
              <span
                className={`w-fit rounded-full border px-3 py-1 text-xs font-medium ${estado.color}`}
              >
                {estado.label}
              </span>
              <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                {estado.description}
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              disabled={actividadesDisponibles.length === 0}
            >
              Registrar actividad
            </Button>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mt-6 grid gap-4 border-t border-lgc-border/30 pt-6 sm:grid-cols-2 lg:grid-cols-4 dark:border-lgc-darkBorder/30">
          <div>
            <span className="text-[11px] uppercase tracking-wide text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Telefono
            </span>
            <p className="mt-1 text-sm font-medium text-lgc-text dark:text-lgc-darkText">
              {persona.telefono}
            </p>
          </div>
          {persona.correo && (
            <div>
              <span className="text-[11px] uppercase tracking-wide text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Correo
              </span>
              <p className="mt-1 text-sm font-medium text-lgc-text dark:text-lgc-darkText">
                {persona.correo}
              </p>
            </div>
          )}
          <div>
            <span className="text-[11px] uppercase tracking-wide text-lgc-textMuted dark:text-lgc-darkTextMuted">
              Registro
            </span>
            <p className="mt-1 text-sm font-medium text-lgc-text dark:text-lgc-darkText">
              {formatDate(persona.creadoEn)}
            </p>
          </div>
          {persona.direccion && (
            <div>
              <span className="text-[11px] uppercase tracking-wide text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Direccion
              </span>
              <p className="mt-1 text-sm font-medium text-lgc-text dark:text-lgc-darkText">
                {persona.direccion}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Section */}
      {rutaAplicable && (
        <div
          className="
            rounded-2xl border border-lgc-border/50 bg-lgc-surface p-6
            dark:border-lgc-darkBorder/50 dark:bg-lgc-darkSurface
          "
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                Ruta de Crecimiento
              </h2>
              <p className="mt-1 text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                {rutaAplicable.nombre}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                  {progress.percent}%
                </p>
                <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  {progress.completed} de {progress.total} completadas
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-lgc-border/30 dark:bg-lgc-darkBorder/30">
            <div
              className={`h-full rounded-full transition-all ${
                progress.percent === 100 ? "bg-lgc-olive" : "bg-lgc-accent"
              }`}
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
      )}

      {/* Timeline */}
      <div
        className="
          rounded-2xl border border-lgc-border/50 bg-lgc-surface p-6
          dark:border-lgc-darkBorder/50 dark:bg-lgc-darkSurface
        "
      >
        <h2 className="mb-4 text-sm font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
          Historial de Actividades
        </h2>

        <ConexionTimeline
          seguimientos={seguimientosPersona}
          actividades={actividadesDeRuta}
        />
      </div>

      {/* Modal */}
      <ConexionRegistroModal
        isOpen={isModalOpen}
        actividades={actividadesDisponibles}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveActividad}
      />
    </div>
  );
};

export default ConexionPersonaDetail;
