export const TIPOS_HABITACION: Map<string, string> = new Map<string, string>([
  ['Peatonal', 'fas fa-walking'],
  ['Cochera', 'fas fa-car'],
  ['Oficina', 'fas fa-desktop'],
  ['Bodega', 'fas fa-boxes'],
  ['Servicio', 'fas fa-broom']
]);

export class Habitacion {
  public id?: string;
  public complejo_id?: string;
  public nombre?: string;
  public tipo?: string;
  public precio_base?: number;
  public dispositivos_ids?: string[];
  public usa_servicio_doble?: boolean;
  public dispositivos_ids_servicio_doble?: string[];
  public hora_extra?: number;
  public persona_extra?: number;
}
