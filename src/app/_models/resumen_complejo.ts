import { Complejo } from './complejo';
import { ResumenHabitacion } from './resumen_habitacion';

export class ResumenComplejo {
  public complejo?: Complejo;
  public fecha_inicial?: string;
  public fecha_final?: string;
  public resumen_habitaciones?: ResumenHabitacion[];
  public total_servicios?: number;
  public ganancia_total?: number;
}
