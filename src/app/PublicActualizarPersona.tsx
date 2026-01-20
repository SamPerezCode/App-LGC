import { useState, type FC } from "react";
import RegistrarPersonaForm from "./components/layout/container/personas/RegistrarPersonaForm";
import type { PersonaCreateInput } from "./components/layout/container/personas/personas.types";
import type { Persona } from "../domain/interfaces/lgc-interfaces";
import { usePersonasContext } from "./components/layout/container/personas/PersonasContext";
import SuccessModal from "./components/common/SuccessModal";
import Footer from "./components/layout/footer/Footer";

interface PublicActualizarPersonaPageProps {
  isDark: boolean;
}

const PublicActualizarPersonaPage: FC<
  PublicActualizarPersonaPageProps
> = ({ isDark }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const { setPersonas } = usePersonasContext();

  const logoSrc = isDark
    ? "/lgc-solo-manna.PNG"
    : "/lgc-solo-color.PNG";

  const handleSave = (data: PersonaCreateInput) => {
    const now = new Date().toISOString();
    const doc = data.numeroDocumento?.trim();
    const phone = data.telefono?.trim();
    const email = data.correo?.trim().toLowerCase();

    setPersonas((prev) => {
      const matchIndex = prev.findIndex((persona) => {
        if (doc && persona.numeroDocumento === doc) return true;
        if (phone && persona.telefono === phone) return true;
        if (email && persona.correo?.toLowerCase() === email)
          return true;
        return false;
      });

      if (matchIndex >= 0) {
        const updated: Persona = {
          ...prev[matchIndex],
          ...data,
          estado: data.estado ?? prev[matchIndex].estado ?? "MIEMBRO",
          actualizadoEn: now,
        };

        const next = [...prev];
        next[matchIndex] = updated;
        return next;
      }

      const nextId = `PER-${String(prev.length + 1).padStart(3, "0")}`;
      const newPersona = {
        ...data,
        id: nextId,
        estado: data.estado ?? "MIEMBRO",
        creadoEn: now,
        actualizadoEn: now,
      } as Persona;

      return [...prev, newPersona];
    });

    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setFormKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-lgc-bg dark:bg-lgc-darkBg">
      <main className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lgc-surface shadow-sm dark:bg-lgc-darkSurfaceMuted">
              <img
                src={logoSrc}
                alt="Logo LGC"
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                Actualizar miembro antiguo
              </h1>
            </div>
          </div>

          <div className="rounded-2xl border border-lgc-border/60 bg-lgc-surface p-4 md:p-6 shadow-sm dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface">
            <RegistrarPersonaForm
              key={formKey}
              onSave={handleSave}
              onCancel={() => setFormKey((prev) => prev + 1)}
              hideCancelUntilDirty
              submitLabel="Guardar cambios"
            />
          </div>
        </div>

        <SuccessModal
          open={showSuccess}
          title="Informacion guardada"
          message="Los datos quedaron actualizados. Si no existia, se creo el registro."
          onClose={handleCloseSuccess}
        />
      </main>

      <Footer />
    </div>
  );
};

export default PublicActualizarPersonaPage;
