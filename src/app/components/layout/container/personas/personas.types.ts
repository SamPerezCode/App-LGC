import type {
  EstadoCivil,
  EstadoPersona,
  Genero,
  TipoDocumento,
} from "../../../../../domain/interfaces/lgc-interfaces";

export interface PersonaCreateInput {
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
}
