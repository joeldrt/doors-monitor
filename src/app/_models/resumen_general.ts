import { ResumenComplejo } from './resumen_complejo';

export class ResumenGeneral {
  public fecha_inicial?: string;
  public fecha_final?: string;
  public total_servicios?: number;
  public ganancia_total?: number;
  public resumen_complejos?: ResumenComplejo[];
}
