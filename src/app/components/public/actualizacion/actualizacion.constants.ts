import type { UpdateForm } from "./actualizacion.types";

export const INITIAL_FORM: UpdateForm = {
  registrando: "self",

  adultoTipoDocumento: "",
  adultoNumeroDocumento: "",
  adultoRelacion: "",
  adultoRelacionOtro: "",

  nombreCompleto: "",
  fechaNacimiento: "",
  tipoDocumento: "",
  numeroDocumento: "",
  genero: "",
  estadoCivil: "",
  correo: "",

  telefono: "",
  direccion: "",
  barrio: "",
  tiempoAsiste: "",
  vinculadoMinisterio: "",
  ministerios: [],

  bautizado: "",
  anoBautismo: "",
  deseaBautizarse: "",
  aceptaPolitica: false,
  autorizaImagen: false,
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

// Logos provisionales (luego los cambias)
export const MINISTERIOS_ADULTOS = [
  { id: "ALABANZA", label: "Alabanza", logo: "/person.svg" },
  { id: "UJIERES", label: "Ujieres", logo: "/person.svg" },
  { id: "INTERCESION", label: "Intercesion", logo: "/person.svg" },
  { id: "JOVENES", label: "Jovenes", logo: "/person.svg" },
  { id: "NINOS", label: "Ninos", logo: "/person.svg" },
  { id: "MEDIOS", label: "Medios", logo: "/person.svg" },
  { id: "OTRO", label: "Otro", logo: "/person.svg" },
];

export const MINISTERIOS_INFANTIL = [
  {
    id: "CASTILLO_REY",
    label: "Castillo del Rey",
    logo: "/person.svg",
  },
  {
    id: "CLUB_CASTILLO",
    label: "Club Castillo",
    logo: "/person.svg",
  },
  {
    id: "COMISION_DANCE",
    label: "Comision Dance",
    logo: "/person.svg",
  },
  {
    id: "COMISION_KIDS",
    label: "Comision KIDS",
    logo: "/person.svg",
  },
  { id: "GPS", label: "GPS", logo: "/person.svg" },
];
