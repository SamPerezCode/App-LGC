import { useMemo, useState, type FC } from "react";
import type {
  Persona,
  RutaCrecimiento,
  ActividadRutaCrecimiento,
  SeguimientoActividadPersona,
} from "../../../../../../domain/interfaces/lgc-interfaces";
import ConexionTimeline from "./ConexionTimeline";
import ConexionRegistroModal from "./ConexionRegistroModal";

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
  { label: string; description: string; color: string; bgColor: string }
> = {
  NUEVO: {
    label: "Nuevo Creyente",
    description: "Persona recien registrada que necesita acompanamiento inicial",
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
  ASISTENTE_REGULAR: {
    label: "Asistente Regular",
    description: "Asiste regularmente y esta en proceso de integracion",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  MIEMBRO: {
    label: "Miembro",
    description: "Completamente integrado a la comunidad de la iglesia",
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
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

  const rutaAplicable = useMemo(() => {
    return rutas.find((r) => r.activa && r.aplicaAEstado === persona.estado) ?? null;
  }, [rutas, persona.estado]);

  const actividadesDeRuta = useMemo(() => {
    if (!rutaAplicable) return [];
    return actividades
      .filter((a) => a.rutaId === rutaAplicable.id)
      .sort((a, b) => a.orden - b.orden);
  }, [actividades, rutaAplicable]);

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
    <div className="space-y-6">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="
          inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium
          text-lgc-textMuted transition-all
          hover:bg-lgc-surfaceMuted hover:text-lgc-text
          dark:text-lgc-darkTextMuted dark:hover:bg-lgc-darkSurfaceMuted dark:hover:text-lgc-darkText
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
        Volver
      </button>

      {/* Profile Card */}
      <div
        className="
          overflow-hidden rounded-xl border border-lgc-border/40 bg-white
          dark:border-lgc-darkBorder/40 dark:bg-lgc-darkSurface
        "
      >
        {/* Header with gradient */}
        <div className="relative h-24 bg-gradient-to-r from-lgc-primary via-lgc-primarySoft to-lgc-olive dark:from-lgc-darkBgAlt dark:via-lgc-darkSurface dark:to-lgc-olive/30">
          <div className="absolute -bottom-10 left-6">
            <div
              className="
                flex h-20 w-20 items-center justify-center rounded-2xl
                border-4 border-white bg-gradient-to-br from-lgc-olive/80 to-lgc-everdeep
                text-2xl font-bold text-white shadow-lg
                dark:border-lgc-darkSurface
              "
            >
              {initials}
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-lgc-text dark:text-lgc-darkText">
                {persona.nombreCompleto}
              </h1>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${estado.bgColor} ${estado.color}`}
              >
                {estado.label}
              </span>
              <p className="max-w-md text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
                {estado.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              disabled={actividadesDisponibles.length === 0}
              className="
                inline-flex items-center gap-2 rounded-lg bg-lgc-primary px-4 py-2.5
                text-sm font-medium text-lgc-onPrimary shadow-sm
                transition-all hover:bg-lgc-primarySoft hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-lgc-primary/50 focus:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-50
                dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary
                dark:hover:bg-lgc-manna dark:focus:ring-lgc-darkPrimary/50
              "
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Registrar actividad
            </button>
          </div>

          {/* Contact Grid */}
          <div className="mt-8 grid gap-4 border-t border-lgc-border/30 pt-6 sm:grid-cols-2 lg:grid-cols-4 dark:border-lgc-darkBorder/30">
            <div className="space-y-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Telefono
              </span>
              <p className="text-sm font-medium text-lgc-text dark:text-lgc-darkText">
                {persona.telefono}
              </p>
            </div>
            {persona.correo && (
              <div className="space-y-1">
                <span className="text-[11px] font-medium uppercase tracking-wider text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  Correo
                </span>
                <p className="text-sm font-medium text-lgc-text dark:text-lgc-darkText">
                  {persona.correo}
                </p>
              </div>
            )}
            <div className="space-y-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Fecha de registro
              </span>
              <p className="text-sm font-medium text-lgc-text dark:text-lgc-darkText">
                {formatDate(persona.creadoEn)}
              </p>
            </div>
            {persona.direccion && (
              <div className="space-y-1">
                <span className="text-[11px] font-medium uppercase tracking-wider text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  Direccion
                </span>
                <p className="text-sm font-medium text-lgc-text dark:text-lgc-darkText">
                  {persona.direccion}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Card */}
      {rutaAplicable && (
        <div
          className="
            rounded-xl border border-lgc-border/40 bg-white p-6
            dark:border-lgc-darkBorder/40 dark:bg-lgc-darkSurface
          "
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-lgc-text dark:text-lgc-darkText">
                Ruta de Crecimiento
              </h2>
              <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                {rutaAplicable.nombre}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-lgc-primary dark:text-lgc-darkPrimary">
                  {progress.percent}%
                </p>
                <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  Completado
                </p>
              </div>
              <div className="h-12 w-px bg-lgc-border/30 dark:bg-lgc-darkBorder/30" />
              <div className="text-center">
                <p className="text-3xl font-bold text-lgc-text dark:text-lgc-darkText">
                  {progress.completed}
                </p>
                <p className="text-xs text-lgc-textMuted dark:text-lgc-darkTextMuted">
                  de {progress.total} actividades
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-lgc-surfaceMuted dark:bg-lgc-darkSurfaceMuted">
            <div
              className={`
                h-full rounded-full transition-all duration-500
                ${progress.percent === 100 ? "bg-emerald-500" : "bg-gradient-to-r from-lgc-accent to-lgc-desert"}
              `}
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        </div>
      )}

      {/* Timeline Card */}
      <div
        className="
          rounded-xl border border-lgc-border/40 bg-white p-6
          dark:border-lgc-darkBorder/40 dark:bg-lgc-darkSurface
        "
      >
        <h2 className="mb-6 text-sm font-semibold text-lgc-text dark:text-lgc-darkText">
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
