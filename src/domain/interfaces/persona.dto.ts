import type {
  EstadoCivil,
  EstadoPersona,
  Genero,
  TipoDocumento,
} from "./lgc-interfaces";

export type PersonaCreateInput = {
  nombreCompleto: string;
  telefono: string;

  correo?: string;
  direccion?: string;
  genero?: Genero;
  fechaNacimiento?: string;
  tipoDocumento?: TipoDocumento;
  numeroDocumento?: string;
  estadoCivil?: EstadoCivil;
  estado?: EstadoPersona;
};
