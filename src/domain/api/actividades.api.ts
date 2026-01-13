import type { ActividadRutaCrecimiento } from "../interfaces/lgc-interfaces";
import { apiFetch } from "./http";
import { API_PATHS } from "./endpoints";

export type ActividadInput = Omit<
  ActividadRutaCrecimiento,
  "id" | "creadoEn" | "actualizadoEn"
>;

export const actividadesApi = {
  list: () =>
    apiFetch<ActividadRutaCrecimiento[]>(API_PATHS.actividades),
  create: (input: ActividadInput) =>
    apiFetch<ActividadRutaCrecimiento>(API_PATHS.actividades, {
      method: "POST",
      body: JSON.stringify(input),
    }),
  update: (id: string, input: ActividadInput) =>
    apiFetch<ActividadRutaCrecimiento>(API_PATHS.actividad(id), {
      method: "PUT",
      body: JSON.stringify(input),
    }),
  remove: (id: string) =>
    apiFetch<void>(API_PATHS.actividad(id), { method: "DELETE" }),
};
