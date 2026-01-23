export type Step = 1 | 2 | 3 | 4;
export type YesNo = "yes" | "no" | "";
export type Registrando = "self" | "other";
export type AdultRelacion = "" | "PADRE" | "MADRE" | "TUTOR" | "OTRO";

export type UpdateForm = {
  registrando: Registrando;

  adultoTipoDocumento: string;
  adultoNumeroDocumento: string;
  adultoRelacion: AdultRelacion;
  adultoRelacionOtro: string;

  nombreCompleto: string;
  fechaNacimiento: string;
  tipoDocumento: string;
  numeroDocumento: string;
  genero: "MASCULINO" | "FEMENINO" | "";
  estadoCivil: string;
  correo: string;

  telefono: string;
  direccion: string;
  barrio: string;
  tiempoAsiste: string;
  vinculadoMinisterio: YesNo;
  ministerios: string[];

  bautizado: YesNo;
  anoBautismo: string;
  deseaBautizarse: YesNo;
  aceptaPolitica: boolean;
  autorizaImagen: boolean;
};

export type UpdateField = <K extends keyof UpdateForm>(
  field: K,
  value: UpdateForm[K]
) => void;
