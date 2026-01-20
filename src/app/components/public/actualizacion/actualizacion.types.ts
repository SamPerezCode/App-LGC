export type Step = 1 | 2 | 3 | 4;
export type YesNo = "yes" | "no" | "";
export type Registrando = "self" | "other";
export type AdultRelacion = "" | "PADRE" | "MADRE" | "TUTOR" | "OTRO";

export type UpdateForm = {
  registrando: Registrando;

  adultoNombre: string;
  adultoRelacion: AdultRelacion;
  adultoRelacionOtro: string;
  adultoContacto: string;

  nombreCompleto: string;
  fechaNacimiento: string;
  tipoDocumento: string;
  numeroDocumento: string;
  genero: "MASCULINO" | "FEMENINO" | "";
  estadoCivil: string;
  correo: string;

  direccion: string;
  barrio: string;
  tiempoAsiste: string;
  vinculadoMinisterio: YesNo;
  ministerios: string[];

  bautizado: YesNo;
  anoBautismo: string;
  deseaBautizarse: YesNo;
  aceptaPolitica: boolean;
};

export type UpdateField = <K extends keyof UpdateForm>(
  field: K,
  value: UpdateForm[K]
) => void;
