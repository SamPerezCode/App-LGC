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
  { value: "CC", label: "Cédula de ciudadanía" },
  { value: "CE", label: "Cédula de extranjería" },
  { value: "PASAPORTE", label: "Pasaporte" },
  { value: "TI", label: "Tarjeta de identidad" },
  { value: "PEP", label: "Permiso especial de permanencia (PEP)" },
];

export const ESTADO_CIVIL = [
  { value: "", label: "Selecciona..." },
  { value: "SOLTERO", label: "Soltero" },
  { value: "CASADO", label: "Casado" },
  { value: "UNION_LIBRE", label: "Unión libre" },
  { value: "DIVORCIADO", label: "Divorciado" },
  { value: "SEPARADO", label: "Separado" },
  { value: "VIUDO", label: "Viudo" },
];

export const TIEMPOS_ASISTE = [
  { value: "", label: "Selecciona..." },
  { value: "MENOS_6", label: "Menos de 6 meses" },
  { value: "ENTRE_6_12", label: "Entre 6 meses y 1 año" },
  { value: "ENTRE_1_3", label: "Entre 1 y 3 años" },
  { value: "MAS_3", label: "Más de 3 años" },
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
  { id: "ALABANZA", label: "Alabanza", logo: "/adora.png" },
  { id: "UJIERES", label: "Anfitriones", logo: "/anfitrion.png" },
  {
    id: "PREJUVENIL",
    label: "Prejuveniles",
    logo: "/prejuvenil.png",
  },
  {
    id: "SOCIAL",
    label: "Comisión Social",
    logo: "/social.png",
  },
  {
    id: "PLANTACION",
    label: "Plantación de Iglesia",
    logo: "/social.png",
  },
  {
    id: "GPS",
    label: "GPS - Grupos Pequeños Saludables",
    logo: "/social.png",
  },
  {
    id: "INTERCESION",
    label: "Guerreros de Oración",
    logo: "/intersecion.png",
  },
  { id: "NINOS", label: "Comisión Kids", logo: "/kids.png" },
  {
    id: "MUJERES",
    label: "Mujeres de Valor",
    logo: "/mujer-valor.png",
  },
  {
    id: "CONSEJERIA",
    label: "Consejería",
    logo: "/consejeria.png",
  },
  {
    id: "MATRIMONIOS",
    label: "Matrimonios Saludables",
    logo: "/matrimonios.png",
  },
  {
    id: "COMUNICACIONES",
    label: "Comunicaciones",
    logo: "/comunicaciones.png",
  },
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
    label: "Comisión Dance",
    logo: "/person.svg",
  },
  {
    id: "COMISION_KIDS",
    label: "Comisión KIDS",
    logo: "/person.svg",
  },
  { id: "GPS", label: "GPS", logo: "/person.svg" },
];
