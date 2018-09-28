import { Habitacion } from './habitacion';
import { Registro } from './registro';

export class ResumenHabitacion {
  public habitacion?: Habitacion;
  public fecha_inicial?: string;
  public fecha_final?: string;
  public numero_servicios?: number;
  public ultimo_status?: string;
  public ganancia?: number;
  public registros?: Registro[];
}
