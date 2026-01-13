import type { Persona } from "../interfaces/lgc-interfaces";
import type { PersonaCreateInput } from "../../app/components/layout/container/personas/personas.types";
import { apiFetch } from "./http";
import { API_PATHS } from "./endpoints";

export const personasApi = {
  list: () => apiFetch<Persona[]>(API_PATHS.personas),
  create: (input: PersonaCreateInput) =>
    apiFetch<Persona>(API_PATHS.personas, {
      method: "POST",
      body: JSON.stringify(input),
    }),
  update: (id: string, input: PersonaCreateInput) =>
    apiFetch<Persona>(API_PATHS.persona(id), {
      method: "PUT",
      body: JSON.stringify(input),
    }),
  remove: (id: string) =>
    apiFetch<void>(API_PATHS.persona(id), { method: "DELETE" }),
};
