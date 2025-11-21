// src/App.tsx
import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import type { Usuario } from "./domain/interfaces/lgc-interfaces";
import AppLgc from "./app/App-lgc";
import Login from "./app/Login";

const App: React.FC = () => {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-lgc-bg text-lgc-text dark:bg-lgc-darkBg dark:text-lgc-darkText">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLoginSuccess={setUser} isDark={dark} />
              )
            }
          />

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <AppLgc
                  user={user!}
                  isDark={dark}
                  onToggleTheme={() => setDark((prev) => !prev)}
                  onLogout={handleLogout}
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
