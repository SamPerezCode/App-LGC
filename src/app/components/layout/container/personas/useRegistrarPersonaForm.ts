// src/app/components/layout/container/personas/useRegistrarPersonaForm.ts
import { useState, type FormEvent } from "react";
import type { Persona } from "../../../../../domain/interfaces/lgc-interfaces";

// Igual que antes, el input del formulario
export type PersonaCreateInput = Omit<Persona, "id" | "creadoEn" | "actualizadoEn">;

const DEFAULT_VALUES: PersonaCreateInput = {
  nombreCompleto: "",
  telefono: "",
  whatsapp: "",
  correo: "",
  direccion: "",
  genero: "MASCULINO",
  estadoCivil: "SOLTERO",
  fechaNacimiento: "",
  estado: "NUEVO",
};

export const useRegistrarPersonaForm = (onSave: (data: PersonaCreateInput) => void) => {
  const [form, setForm] = useState<PersonaCreateInput>(DEFAULT_VALUES);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: keyof PersonaCreateInput, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (!isDirty) setIsDirty(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!form.nombreCompleto.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    setError(null);
    onSave(form);
    setIsDirty(false);
  };

  const resetForm = () => {
    setForm(DEFAULT_VALUES);
    setError(null);
    setIsDirty(false);
  };

  return {
    form,
    error,
    isDirty,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
