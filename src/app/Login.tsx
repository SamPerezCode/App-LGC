import { type FC, type FormEvent, useState } from "react";
import { loginMock } from "../domain/services/auth.service";
import type { Usuario } from "../domain/interfaces/lgc-interfaces";

interface LoginProps {
  onLoginSuccess: (user: Usuario) => void;
  isDark: boolean;
}

const Login: FC<LoginProps> = ({ onLoginSuccess, isDark }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const user = await loginMock({ email, password });

    setLoading(false);

    if (!user) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    onLoginSuccess(user);
  };

  const logoSrc = isDark ? "/lgc-solo-manna.PNG" : "/lgc-solo-color.PNG";

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div
          className="
            rounded-3xl border border-lgc-border/80 bg-lgc-surface p-8 shadow-xl
            sm:p-10
            dark:bg-lgc-darkSurface dark:border-lgc-darkBorder/80 dark:shadow-black/30
          "
        >
          {/* Header del card */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="
                flex h-20 w-20 items-center justify-center rounded-2xl
                bg-lgc-surfaceMuted shadow-sm
                dark:bg-lgc-darkSurfaceMuted
              "
            >
              <img
                src={logoSrc}
                alt="Logo Iglesia La Gran Comisión"
                className="h-14 w-14 object-contain"
              />
            </div>

            <div className="space-y-1 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-lgc-primary dark:text-lgc-darkPrimary">
                Iniciar sesión
              </h1>
            </div>
          </div>

          {/* Formulario */}
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-lgc-text dark:text-lgc-darkText">
                Correo electrónico
              </label>
              <input
                type="email"
                className="
                  mt-0 w-full rounded-xl border border-lgc-border/80
                  bg-lgc-surfaceMuted/80 px-3 py-2.5 text-sm text-lgc-text
                  shadow-sm outline-none
                  focus:border-transparent focus:ring-2 focus:ring-lgc-primary focus:ring-offset-1 focus:ring-offset-lgc-surface
                  dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
                  dark:focus:ring-lgc-darkPrimary dark:focus:ring-offset-lgc-darkSurface
                "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-lgc-text dark:text-lgc-darkText">
                Contraseña
              </label>
              <input
                type="password"
                className="
                  mt-0 w-full rounded-xl border border-lgc-border/80
                  bg-lgc-surfaceMuted/80 px-3 py-2.5 text-sm text-lgc-text
                  shadow-sm outline-none
                  focus:border-transparent focus:ring-2 focus:ring-lgc-primary focus:ring-offset-1 focus:ring-offset-lgc-surface
                  dark:bg-lgc-darkSurfaceMuted dark:border-lgc-darkBorder/80 dark:text-lgc-darkText
                  dark:focus:ring-lgc-darkPrimary dark:focus:ring-offset-lgc-darkSurface
                "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && <p className="text-sm text-lgc-danger dark:text-lgc-darkAccent">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-2 inline-flex w-full items-center justify-center
                rounded-xl px-4 py-2.5 text-sm font-semibold
                bg-lgc-primary text-lgc-onPrimary shadow-sm
                hover:bg-lgc-primarySoft
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lgc-primary
                focus-visible:ring-offset-2 focus-visible:ring-offset-lgc-surface
                disabled:cursor-not-allowed disabled:opacity-60
                dark:bg-lgc-darkPrimary dark:text-lgc-darkOnPrimary
                dark:hover:bg-lgc-manna dark:focus-visible:ring-lgc-darkPrimary
                dark:focus-visible:ring-offset-lgc-darkSurface
                transition-colors
              "
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
