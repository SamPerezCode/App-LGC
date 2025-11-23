// src/app/components/layout/container/personas/personas.types.ts
import type { Persona } from "../../../../../domain/interfaces/lgc-interfaces";

// Persona sin id ni timestamps: input del formulario
export type PersonaCreateInput = Omit<Persona, "id" | "creadoEn" | "actualizadoEn">;
