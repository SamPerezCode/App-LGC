import { type FC } from "react";
import { Link } from "react-router-dom";
import Footer from "./components/layout/footer/Footer";

interface PublicRegistroIndexProps {
  isDark: boolean;
}

const PublicRegistroIndex: FC<PublicRegistroIndexProps> = ({
  isDark,
}) => {
  const logoSrc = isDark
    ? "/lgc-solo-manna.PNG"
    : "/lgc-solo-color.PNG";

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
                Registro de personas
              </h1>
              <p className="text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Elige el tipo de inscripcion que necesitas
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Link
              to="/registro-persona/nuevo"
              className="
                group rounded-2xl border border-lgc-border/60 bg-lgc-surface p-5 text-left shadow-sm
                hover:border-lgc-primary/40 hover:shadow-md transition
                dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface
              "
            >
              <h2 className="text-base font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                Nuevo creyente
              </h2>
              <p className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Registro inicial para nuevos asistentes
              </p>
            </Link>

            <Link
              to="/registro-persona/antiguo"
              className="
                group rounded-2xl border border-lgc-border/60 bg-lgc-surface p-5 text-left shadow-sm
                hover:border-lgc-primary/40 hover:shadow-md transition
                dark:border-lgc-darkBorder/70 dark:bg-lgc-darkSurface
              "
            >
              <h2 className="text-base font-semibold text-lgc-primary dark:text-lgc-darkPrimary">
                Miembro antiguo
              </h2>
              <p className="mt-1 text-sm text-lgc-textMuted dark:text-lgc-darkTextMuted">
                Actualiza o crea informacion de miembros existentes
              </p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicRegistroIndex;
