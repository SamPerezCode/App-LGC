// --------------------------------------------------------------
// Tipos base / enums
export type EstadoPersona = "NUEVO" | "ASISTENTE_REGULAR" | "MIEMBRO";
export type Genero = "MASCULINO" | "FEMENINO";
export type EstadoCivil =
  | "SOLTERO"
  | "CASADO"
  | "UNION_LIBRE"
  | "DIVORCIADO"
  | "SEPARADO"
  | "VIUDO";
export type TipoDocumento = "CC" | "CE" | "PASAPORTE" | "TI";
export type TipoActividadRuta =
  | "EVENTO"
  | "CURSO"
  | "REUNION"
  | "MINISTERIO";
export type EstadoActividadSeguimiento =
  | "PENDIENTE"
  | "EN_PROCESO"
  | "COMPLETADA"
  | "CANCELADA";
export type TipoContacto =
  | "LLAMADA"
  | "VISITA"
  | "MENSAJE_WHATSAPP"
  | "OTRO";
export type RolUsuario = "ADMIN" | "PASTOR" | "LIDER_SEGUIMIENTO";
// --------------------------------------------------------------

//  Usuario (para login / autenticación)
export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: RolUsuario;
  activo: boolean;
  creadoEn: string;
}

//Persona (Módulo de Registro de Personas)
export interface Persona {
  id: string;
  nombreCompleto: string;
  telefono: string;
  correo?: string;
  direccion?: string;
  genero: Genero;
  fechaNacimiento?: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  estadoCivil?: EstadoCivil;
  estado: EstadoPersona;
  creadoEn: string;
  actualizadoEn: string;
}

// Actividades de la Ruta de Crecimiento (Catálogo)
export interface ActividadRutaCrecimiento {
  id: string;
  nombre: string;
  descripcion?: string;
  tipo: TipoActividadRuta;
  orden: number; // para definir el paso dentro de la ruta
  activa: boolean;
  creadoEn: string;
  actualizadoEn: string;
  rutaId: string;
}

// Seguimiento de actividades por persona
export interface SeguimientoActividadPersona {
  id: string;
  personaId: string;
  actividadRutaId: string;
  estado: EstadoActividadSeguimiento;
  fechaAsignacion: string;
  fechaCumplimiento?: string;
  observaciones?: string;
  // Opcional: quién registró el seguimiento (usuario del sistema)
  registradoPorUsuarioId?: string;
}

//  Registro de contactos / interacciones de seguimiento
export interface RegistroContacto {
  id: string;
  personaId: string;
  tipo: TipoContacto;
  fecha: string;
  descripcion?: string;
  realizadoPorUsuarioId?: string;
}

export interface RutaCrecimiento {
  id: string;
  nombre: string;
  descripcion?: string;
  activa: boolean;
  creadoEn: string;
  actualizadoEn: string;
}
