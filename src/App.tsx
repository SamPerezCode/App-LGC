// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import type { Usuario } from "./domain/interfaces/lgc-interfaces";
import AppLgc from "./app/App-lgc";
import Login from "./app/Login";
import PublicRegistroPersona from "./app/PublicRegistroPersona"; // 👈 nuevo
import { useAuth } from "./app/hooks/useAuth";
import { useTheme } from "./app/hooks/useTheme";

const App: React.FC = () => {
  const { dark, toggleTheme } = useTheme();
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-lgc-bg text-lgc-text dark:bg-lgc-darkBg dark:text-lgc-darkText">
        <Routes>
          {/* 🔹 Ruta pública para el registro de personas */}
          <Route path="/registro-persona" element={<PublicRegistroPersona isDark={dark} />} />

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
      </div>
    </div>
  );
};

export default App;
