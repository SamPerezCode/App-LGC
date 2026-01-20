import type { UpdateForm } from "./actualizacion.types";

export const INITIAL_FORM: UpdateForm = {
  registrando: "self",

  adultoNombre: "",
  adultoRelacion: "",
  adultoRelacionOtro: "",
  adultoContacto: "",

  nombreCompleto: "",
  fechaNacimiento: "",
  tipoDocumento: "",
  numeroDocumento: "",
  genero: "",
  estadoCivil: "",
  correo: "",

  direccion: "",
  barrio: "",
  tiempoAsiste: "",
  vinculadoMinisterio: "",
  ministerios: [],

  bautizado: "",
  anoBautismo: "",
  deseaBautizarse: "",
  aceptaPolitica: false,
};

export const DOCUMENTOS = [
  { value: "", label: "Selecciona..." },
  { value: "CC", label: "Cedula de ciudadania" },
  { value: "CE", label: "Cedula de extranjeria" },
  { value: "PASAPORTE", label: "Pasaporte" },
  { value: "TI", label: "Tarjeta de identidad" },
];

export const ESTADO_CIVIL = [
  { value: "", label: "Selecciona..." },
  { value: "SOLTERO", label: "Soltero" },
  { value: "CASADO", label: "Casado" },
  { value: "UNION_LIBRE", label: "Union libre" },
  { value: "DIVORCIADO", label: "Divorciado" },
  { value: "SEPARADO", label: "Separado" },
  { value: "VIUDO", label: "Viudo" },
];

export const TIEMPOS_ASISTE = [
  { value: "", label: "Selecciona..." },
  { value: "MENOS_6", label: "Menos de 6 meses" },
  { value: "ENTRE_6_12", label: "Entre 6 meses y 1 ano" },
  { value: "ENTRE_1_3", label: "Entre 1 y 3 anos" },
  { value: "MAS_3", label: "Mas de 3 anos" },
];

export const RELACIONES = [
  { value: "", label: "Selecciona..." },
  { value: "PADRE", label: "Padre" },
  { value: "MADRE", label: "Madre" },
  { value: "TUTOR", label: "Tutor" },
  { value: "OTRO", label: "Otro" },
];

export const MINISTERIOS = [
  "Alabanza",
  "Ninos",
  "Jovenes",
  "Ujieres",
  "Intercesion",
  "Medios",
  "Otro",
];
