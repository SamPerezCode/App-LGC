import type { RutaCrecimiento } from "../interfaces/lgc-interfaces";
import { apiFetch } from "./http";
import { API_PATHS } from "./endpoints";

export type RutaInput = Omit<
  RutaCrecimiento,
  "id" | "creadoEn" | "actualizadoEn"
>;

export const rutasApi = {
  list: () => apiFetch<RutaCrecimiento[]>(API_PATHS.rutas),
  create: (input: RutaInput) =>
    apiFetch<RutaCrecimiento>(API_PATHS.rutas, {
      method: "POST",
      body: JSON.stringify(input),
    }),
  update: (id: string, input: RutaInput) =>
    apiFetch<RutaCrecimiento>(API_PATHS.ruta(id), {
      method: "PUT",
      body: JSON.stringify(input),
    }),
  remove: (id: string) =>
    apiFetch<void>(API_PATHS.ruta(id), { method: "DELETE" }),
};
