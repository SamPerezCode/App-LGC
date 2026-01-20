// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import type { Usuario } from "./domain/interfaces/lgc-interfaces";
import AppLgc from "./app/App-lgc";
import Login from "./app/Login";
import PublicRegistroPersona from "./app/PublicRegistroPersona";
import PublicRegistroIndex from "./app/PublicRegistroIndex";
import PublicActualizarPersona from "./app/PublicActualizarPersona";
import { ApiProvider } from "./app/context/ApiContext";
import { PersonasProvider } from "./app/components/layout/container/personas/PersonasContext";
import { useAuth } from "./app/hooks/useAuth";
import { useTheme } from "./app/hooks/useTheme";

const App: React.FC = () => {
  const { dark, toggleTheme } = useTheme();
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-lgc-bg text-lgc-text dark:bg-lgc-darkBg dark:text-lgc-darkText">
        <ApiProvider>
          <PersonasProvider>
            <Routes>
              {/* Ruta publica: selector de tipo de inscripcion */}
              <Route
                path="/registro-persona"
                element={<PublicRegistroIndex isDark={dark} />}
              />

              {/* Ruta publica: nuevo creyente */}
              <Route
                path="/registro-persona/nuevo"
                element={<PublicRegistroPersona isDark={dark} />}
              />

              {/* Ruta publica: miembro antiguo */}
              <Route
                path="/registro-persona/antiguo"
                element={<PublicActualizarPersona isDark={dark} />}
              />

              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Login onLoginSuccess={login} isDark={dark} />
                  )
                }
              />

              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <AppLgc
                      user={user as Usuario}
                      isDark={dark}
                      onToggleTheme={toggleTheme}
                      onLogout={() => logout()}
                    />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </PersonasProvider>
        </ApiProvider>
      </div>
    </div>
  );
};

export default App;
