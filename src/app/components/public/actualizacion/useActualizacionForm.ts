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

export const useActualizacionForm = () => {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<UpdateForm>(INITIAL_FORM);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const age = useMemo(
    () => calculateAge(form.fechaNacimiento),
    [form.fechaNacimiento]
  );

  const isMinor = form.registrando === "other";

  const updateField: UpdateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const setRegistrando = (value: Registrando) => {
    setForm((prev) => ({
      ...prev,
      registrando: value,
      ...(value === "self"
        ? {
            adultoNombre: "",
            adultoRelacion: "",
            adultoRelacionOtro: "",
            adultoContacto: "",
          }
        : {}),
    }));
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

  const validateStep = (current: Step): string | null => {
    const required = (value: string) => value.trim().length > 0;

    if (current === 1) {
      if (form.registrando === "other") {
        if (
          !required(form.adultoNombre) ||
          !required(form.adultoRelacion) ||
          !required(form.adultoContacto)
        ) {
          return "Completa los datos del adulto responsable.";
        }
        if (
          form.adultoRelacion === "OTRO" &&
          !required(form.adultoRelacionOtro)
        ) {
          return "Indica el otro tipo de relacion.";
        }
      }
      return null;
    }

    if (current === 2) {
      if (
        !required(form.nombreCompleto) ||
        !required(form.fechaNacimiento) ||
        !required(form.tipoDocumento) ||
        !required(form.numeroDocumento) ||
        !required(form.genero)
      ) {
        return "Completa los campos requeridos.";
      }

      if (isMinor) {
        if (age !== null && age >= 14) {
          return "Si tiene 14 anos o mas, usa la opcion A mi.";
        }
      } else {
        if (age !== null && age < 14) {
          return "Si es menor de 14 anos, usa la opcion A otra persona.";
        }
        if (!required(form.estadoCivil) || !required(form.correo)) {
          return "Completa los campos requeridos.";
        }
      }

      return null;
    }

    if (current === 3) {
      if (
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
      if (!required(form.bautizado)) {
        return "Completa los campos requeridos.";
      }
      if (form.bautizado === "yes" && !required(form.anoBautismo)) {
        return "Indica el ano de bautismo.";
      }
      if (
        form.bautizado === "no" &&
        !required(form.deseaBautizarse)
      ) {
        return "Indica si deseas bautizarte.";
      }
      if (!form.aceptaPolitica) {
        return "Debes aceptar la politica de tratamiento de datos.";
      }
      return null;
    }

    return null;
  };

  const nextStep = () => {
    const message = validateStep(step);
    if (message) {
      setError(message);
      return;
    }
    setError(null);
    setStep((prev) => (prev + 1) as Step);
  };

  const prevStep = () => {
    setError(null);
    setStep((prev) => (prev - 1) as Step);
  };

  const submitForm = () => {
    const message = validateStep(4);
    if (message) {
      setError(message);
      return;
    }
    setError(null);
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    setForm(INITIAL_FORM);
    setStep(1);
    setError(null);
  };

  return {
    step,
    form,
    age,
    isMinor,
    error,
    showSuccess,
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
