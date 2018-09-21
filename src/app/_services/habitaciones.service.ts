import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

// Base URL
import { environment } from '../../environments/environment';

// Models
import { Habitacion } from './../_models/habitacion';

@Injectable()
export class HabitacionesService {
  private API_URL: string;
  private API_URLxComplejo: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = environment.API_URL + '/api/app/user/habitaciones';
    this.API_URLxComplejo = environment.API_URL + '/api/app/user/habitaciones_complejo';
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

}
