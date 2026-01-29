import { useMemo, useState } from "react";
import { INITIAL_FORM } from "./actualizacion.constants";
import { calculateAge } from "./actualizacion.utils";
import type {
  AdultRelacion,
  Registrando,
  Step,
  UpdateField,
  UpdateForm,
  YesNo,
} from "./actualizacion.types";
import type { Persona } from "../../../../domain/interfaces/lgc-interfaces";
import { personasMock } from "../../../../domain/mock-data/lgc-mock";

const PERSONAS_STORAGE_KEY = "lgc:personas";

const getStoredPersonas = (): Persona[] => {
  if (typeof window === "undefined") return personasMock;
  const raw = localStorage.getItem(PERSONAS_STORAGE_KEY);
  if (!raw) return personasMock;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? (parsed as Persona[])
      : personasMock;
  } catch {
    return personasMock;
  }
};

export const useActualizacionForm = () => {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<UpdateForm>(INITIAL_FORM);
  const [error, setError] = useState<string | null>(null);
  const [showFinalError, setShowFinalError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [adultoResponsable, setAdultoResponsable] =
    useState<Persona | null>(null);

  const age = useMemo(
    () => calculateAge(form.fechaNacimiento),
    [form.fechaNacimiento]
  );

  const isMinor = form.registrando === "other";

  const updateField: UpdateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // LIMPIA ERROR AL EDITAR
    if (error) setError(null);
    if (showFinalError) setShowFinalError(false);

    if (
      field === "adultoTipoDocumento" ||
      field === "adultoNumeroDocumento"
    ) {
      setAdultoResponsable(null);
    }
  };

  const setRegistrando = (value: Registrando) => {
    setForm((prev) => ({
      ...prev,
      registrando: value,
      adultoTipoDocumento: "",
      adultoNumeroDocumento: "",
      adultoRelacion: "",
      adultoRelacionOtro: "",
    }));
    setAdultoResponsable(null);
    setError(null);
  };

  const setAdultoRelacion = (value: AdultRelacion) => {
    setForm((prev) => ({
      ...prev,
      adultoRelacion: value,
      adultoRelacionOtro:
        value === "OTRO" ? prev.adultoRelacionOtro : "",
    }));
  };

  const setBautizado = (value: YesNo) => {
    setForm((prev) => ({
      ...prev,
      bautizado: value,
      anoBautismo: value === "yes" ? prev.anoBautismo : "",
      deseaBautizarse: value === "no" ? prev.deseaBautizarse : "",
    }));
  };

  const setVinculadoMinisterio = (value: YesNo) => {
    setForm((prev) => ({
      ...prev,
      vinculadoMinisterio: value,
      ministerios: value === "yes" ? prev.ministerios : [],
    }));
  };

  const toggleMinisterio = (value: string) => {
    setForm((prev) => {
      const has = prev.ministerios.includes(value);
      return {
        ...prev,
        ministerios: has
          ? prev.ministerios.filter((item) => item !== value)
          : [...prev.ministerios, value],
      };
    });
  };

  const buscarAdultoResponsable = () => {
    const normalizeDoc = (value: string) =>
      value.replace(/\s+/g, "").trim();

    const tipo = form.adultoTipoDocumento.trim();
    const numero = normalizeDoc(form.adultoNumeroDocumento);

    if (!tipo || !numero) {
      setAdultoResponsable(null);
      setError("Completa el tipo y numero del documento.");
      return;
    }

    const personas = getStoredPersonas();
    const found = personas.find(
      (p) =>
        (p.tipoDocumento ?? "").trim() === tipo &&
        normalizeDoc(p.numeroDocumento ?? "") === numero
    );

    if (!found) {
      setAdultoResponsable(null);
      setError(
        "No encontramos el adulto responsable. Debe estar registrado previamente."
      );
      return;
    }

    setAdultoResponsable(found);
    setError(null);
  };

  const validateStep = (current: Step): string | null => {
    const required = (value: string) => value.trim().length > 0;

    if (current === 1) {
      return null;
    }

    if (current === 2) {
      if (isMinor) {
        if (
          !required(form.adultoTipoDocumento) ||
          !required(form.adultoNumeroDocumento)
        ) {
          return "Completa el documento del adulto responsable.";
        }
        if (!adultoResponsable) {
          return "No encontramos el adulto responsable. Debe estar registrado previamente.";
        }
        return null;
      }

      // Adulto (auto-registro)
      if (
        !required(form.nombreCompleto) ||
        !required(form.fechaNacimiento) ||
        !required(form.tipoDocumento) ||
        !required(form.numeroDocumento) ||
        !required(form.genero)
      ) {
        return "Completa los campos requeridos.";
      }

      if (age !== null && age < 14) {
        return "Si es menor de 14 anos, usa la opcion A otra persona.";
      }
      if (!required(form.estadoCivil) || !required(form.correo)) {
        return "Completa los campos requeridos.";
      }

      return null;
    }

    if (current === 3) {
      if (isMinor) {
        if (!required(form.adultoRelacion)) {
          return "Selecciona el vinculo con el menor.";
        }
        if (
          form.adultoRelacion === "OTRO" &&
          !required(form.adultoRelacionOtro)
        ) {
          return "Indica el otro tipo de relacion.";
        }

        if (
          !required(form.nombreCompleto) ||
          !required(form.fechaNacimiento) ||
          !required(form.tipoDocumento) ||
          !required(form.numeroDocumento) ||
          !required(form.genero)
        ) {
          return "Completa los campos requeridos.";
        }
        return null;
      }

      // Adulto: contacto
      if (
        !required(form.telefono) ||
        !required(form.direccion) ||
        !required(form.barrio) ||
        !required(form.tiempoAsiste) ||
        !required(form.vinculadoMinisterio)
      ) {
        return "Completa los campos requeridos.";
      }
      if (
        form.vinculadoMinisterio === "yes" &&
        form.ministerios.length === 0
      ) {
        return "Selecciona al menos un ministerio.";
      }

      return null;
    }

    if (current === 4) {
      if (isMinor) {
        if (
          !required(form.tiempoAsiste) ||
          !required(form.vinculadoMinisterio)
        ) {
          return "Completa los campos requeridos.";
        }
        if (
          form.vinculadoMinisterio === "yes" &&
          form.ministerios.length === 0
        ) {
          return "Selecciona al menos un ministerio.";
        }
      }

      if (!required(form.bautizado)) {
        return "Completa los campos requeridos.";
      }
      if (form.bautizado === "yes" && !required(form.anoBautismo)) {
        return "Indica el ano de bautismo.";
      }
      if (
        !isMinor &&
        form.bautizado === "no" &&
        !required(form.deseaBautizarse)
      ) {
        return "Indica si deseas bautizarte.";
      }
      if (!form.aceptaPolitica || !form.autorizaImagen) {
        return "Debes aceptar las politicas y autorizaciones.";
      }

      return null;
    }

    return null;
  };

  const persistPersonaFromForm = () => {
    const personas = getStoredPersonas();
    const now = new Date().toISOString();
    const nextId = `PER-${String(personas.length + 1).padStart(3, "0")}`;

    const normalizeDoc = (value: string) =>
      value.replace(/\s+/g, "").trim();

    const tipo = form.tipoDocumento.trim();
    const numero = normalizeDoc(form.numeroDocumento);

    const exists = personas.some(
      (p) =>
        (p.tipoDocumento ?? "").trim() === tipo &&
        normalizeDoc(p.numeroDocumento ?? "") === numero
    );

    if (exists) return;

    const telefono =
      form.telefono.trim() || adultoResponsable?.telefono || "";

    const correo =
      form.correo.trim() || adultoResponsable?.correo || undefined;

    const direccion =
      form.direccion.trim() ||
      adultoResponsable?.direccion ||
      undefined;

    const nuevaPersona: Persona = {
      id: nextId,
      nombreCompleto: form.nombreCompleto.trim(),
      telefono,
      correo,
      direccion,
      genero: form.genero as Persona["genero"],
      fechaNacimiento: form.fechaNacimiento || undefined,
      tipoDocumento: form.tipoDocumento as Persona["tipoDocumento"],
      numeroDocumento: numero,
      estadoCivil: form.estadoCivil as Persona["estadoCivil"],
      estado: "MIEMBRO",
      creadoEn: now,
      actualizadoEn: now,
    };

    const updated = [...personas, nuevaPersona];
    localStorage.setItem(
      PERSONAS_STORAGE_KEY,
      JSON.stringify(updated)
    );
  };

  const clearAdultoBusqueda = () => {
    setForm((prev) => ({
      ...prev,
      adultoTipoDocumento: "",
      adultoNumeroDocumento: "",
    }));
    setAdultoResponsable(null);
    setError(null);
  };

  const nextStep = () => {
    const message = validateStep(step);
    if (message) {
      setError(message);
      return;
    }
    setError(null);
    setShowFinalError(false);
    setStep((prev) => (prev + 1) as Step);
  };

  const prevStep = () => {
    if (step === 2 && isMinor) {
      clearAdultoBusqueda();
    }
    setError(null);
    setShowFinalError(false);
    setStep((prev) => (prev - 1) as Step);
  };

  const submitForm = () => {
    setShowFinalError(true);
    const message = validateStep(4);
    if (message) {
      setError(message);
      return;
    }
    setError(null);

    persistPersonaFromForm();

    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    setForm(INITIAL_FORM);
    setStep(1);
    setError(null);
    setShowFinalError(false);
    setAdultoResponsable(null);
  };

  return {
    step,
    form,
    age,
    isMinor,
    error,
    showFinalError,
    showSuccess,
    adultoResponsable,
    buscarAdultoResponsable,
    updateField,
    setRegistrando,
    setAdultoRelacion,
    setBautizado,
    setVinculadoMinisterio,
    toggleMinisterio,
    nextStep,
    prevStep,
    submitForm,
    closeSuccess,
  };
};
