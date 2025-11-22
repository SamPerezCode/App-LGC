import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Usuario } from "../../domain/interfaces/lgc-interfaces";

const STORAGE_KEY = "lgc:user";

function getInitialUser(): Usuario | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as Usuario;
  } catch {
    // si está corrupto, lo limpiamos
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export const useAuth = () => {
  const navigate = useNavigate();

  // estado inicial viene del localStorage
  const [user, setUser] = useState<Usuario | null>(() => getInitialUser());
  const isAuthenticated = !!user;

  const login = (loggedUser: Usuario, redirectTo: string = "/") => {
    setUser(loggedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
    navigate(redirectTo);
  };

  const logout = (redirectTo: string = "/login") => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    navigate(redirectTo);
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};
