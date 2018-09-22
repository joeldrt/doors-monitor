export const TIPOS_SENSORES: Map<string, string> = new Map<string, string>([
  ['Puerta', 'fas fa-door-closed'],
  ['Cochera', 'fas fa-warehouse'],
  ['Puerta de Servicio', 'fas fa-concierge-bell'],
  ['Refrigerador', 'fas fa-wine-glass-alt']
]);

export class Sensor {
  public id?: string;
  public fecha_creacion?: string;
  public habitacion_id?: string;
  public dispositivo_id?: string;
  public nombre?: string;
  public tipo_sensor?: string;
}
