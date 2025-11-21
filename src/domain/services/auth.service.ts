import type { Usuario } from "../interfaces/lgc-interfaces";
import { usuariosMock } from "../mock-data/lgc-mock";

export interface LoginInput {
  email: string;
  password: string;
}

// Simula un login contra la "BD" en memoria (usuariosMock)

export const loginMock = ({ email, password }: LoginInput): Promise<Usuario | null> => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = usuariosMock.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password && u.activo
  );

  // delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(user ?? null), 500);
  });
};
