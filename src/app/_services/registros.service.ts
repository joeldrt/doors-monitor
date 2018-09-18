import { Injectable } from '@angular/core';
import { ResponseContentType } from '@angular/http';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Base URL
import { environment } from '../../environments/environment';

// Models
import { Registro } from '../_models/registro';

@Injectable()
export class RegistrosService {
  private API_URL: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = environment.API_URL;
  }

  obtenerComplejos(): Observable<HttpResponse<String[]>> {
    return this.http.get<String[]>(this.API_URL + 'api/complejos', {observe: 'response'});
  }

  obtenerHabitaciones(complejo: string): Observable<HttpResponse<String[]>> {
    const parametros = new HttpParams()
      .set('complejo', complejo);
    return this.http.get<String[]>(this.API_URL + 'api/habitaciones', {params: parametros, observe: 'response'});
  }

  getRegistros(fecha_inicial: string, fecha_final: string, complejo: string, habitacion: string): Observable<HttpResponse<Registro[]>> {
    const parametros = new HttpParams()
      .set('fecha_inicial', fecha_inicial)
      .set('fecha_final', fecha_final)
      .set('complejo', complejo)
      .set('habitacion', habitacion);
    return this.http.get<Registro[]>(this.API_URL + 'api/registros', {params: parametros, observe: 'response'});
  }

  downloadExcelFile(fecha_inicial: string, fecha_final: string, complejo: string, habitacion: string) {
    const parametros = new HttpParams()
      .set('fecha_inicial', fecha_inicial)
      .set('fecha_final', fecha_final)
      .set('complejo', complejo)
      .set('habitacion', habitacion);
    return this.http.get(this.API_URL + 'api/descargar_excel', {params: parametros, responseType: 'blob'});
  }
}
