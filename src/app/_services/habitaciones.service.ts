import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Base URL
import { environment } from '../../environments/environment';

// Models
import { Habitacion } from './../_models/habitacion';

@Injectable()
export class HabitacionesService {
  private API_URL: string;
  private API_URLxComplejo: string;
  private API_URL_Servicios: string;
  private API_URL_Registros: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = environment.API_URL + '/api/app/user/habitaciones';
    this.API_URLxComplejo = environment.API_URL + '/api/app/user/habitaciones_complejo';
    this.API_URL_Servicios = environment.API_URL + '/api/app/user/habitaciones_servicios';
    this.API_URL_Registros = environment.API_URL + '/api/app/user/habitaciones_registros';
  }

  guardarHabitacion(habitacion: Habitacion): Observable<HttpResponse<Habitacion>> {
    return this.http.post<Habitacion>(this.API_URL, habitacion, {observe: 'response'});
  }

  editarHabitacion(habitacion_id: string, habitacion: Habitacion): Observable<HttpResponse<Habitacion>> {
    return this.http.put<Habitacion>(this.API_URL + '/' + habitacion_id, habitacion, {observe: 'response'});
  }

  obtenerHabitacionesPorPropietario(): Observable<HttpResponse<Habitacion[]>> {
    return this.http.get<Habitacion[]>(this.API_URL, {observe: 'response'});
  }

  obtenerHabitacionesPorComplejoId(complejo_id: string): Observable<HttpResponse<Habitacion[]>> {
    return this.http.get<Habitacion[]>(this.API_URLxComplejo + '/' + complejo_id, {observe: 'response'});
  }

  obtenerHabitacion(habitacion_id: string): Observable<HttpResponse<Habitacion>> {
    return this.http.get<Habitacion>(this.API_URL + '/' + habitacion_id, {observe: 'response'});
  }

  borrarHabitacion(habitacion_id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.API_URL + '/' + habitacion_id, {observe: 'response'});
  }

  obtenerServiciosPorHabitacionEntreFechas(habitacion_id: string, fecha_inicial: string, fecha_final: string):
  Observable<HttpResponse<any>> {
    const parametros = new HttpParams()
      .set('fecha_inicial', fecha_inicial)
      .set('fecha_final', fecha_final);
    return this.http.get<HttpResponse<any>>(this.API_URL_Servicios + '/' + habitacion_id, {params: parametros, observe: 'response'});
  }

  obtenerRegistrosPorHabitacionEntreFechas(habitacion_id: string, fecha_inicial: string, fecha_final: string):
  Observable<HttpResponse<any>> {
    const parametros = new HttpParams()
      .set('fecha_inicial', fecha_inicial)
      .set('fecha_final', fecha_final);
    return this.http.get<HttpResponse<any>>(this.API_URL_Registros + '/' + habitacion_id, {params: parametros, observe: 'response'});
  }

}
