import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Base URL
import { environment } from '../../environments/environment';

// Models
import { Sensor } from './../_models/sensor';

@Injectable()
export class SensoresService {
  private API_URL: string;
  private API_URL_dispositivos_sin_registrar: string;
  private API_URL_batch: string;
  private API_URL_sensores_sin_vincular: string;
  private API_URL_sensores_por_habitacion: string;
  private API_URL_agregar_sensor_a_lista_servicio: string;
  private API_URL_quitar_sensor_de_lista_servicio: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = environment.API_URL + '/api/app/user/sensores';
    this.API_URL_dispositivos_sin_registrar = environment.API_URL + '/api/app/user/dispositivos_sin_registrar';
    this.API_URL_batch = environment.API_URL + '/api/app/user/sensores_batch';
    this.API_URL_sensores_sin_vincular = environment.API_URL + '/api/app/user/sensores_sin_vincular';
    this.API_URL_sensores_por_habitacion = environment.API_URL + '/api/app/user/sensores_por_habitacion';
    this.API_URL_agregar_sensor_a_lista_servicio = environment.API_URL + '/api/app/user/sensor_agregar_servicio';
    this.API_URL_quitar_sensor_de_lista_servicio = environment.API_URL + '/api/app/user/sensor_quitar_servicio';
  }

  guardarSensor(sensor: Sensor): Observable<HttpResponse<Sensor>> {
    return this.http.post<Sensor>(this.API_URL, sensor, {observe: 'response'});
  }

  editarSensor(sensor_id: string, sensor: Sensor): Observable<HttpResponse<Sensor>> {
    return this.http.put<Sensor>(this.API_URL + '/' + sensor_id, sensor, {observe: 'response'});
  }

  obtenerSensoresPorPropietario(): Observable<HttpResponse<Sensor[]>> {
    return this.http.get<Sensor[]>(this.API_URL, {observe: 'response'});
  }

  obtenerSensoresBatch(sensores_ids: string[]): Observable<HttpResponse<Sensor[]>> {
    const params = new HttpParams()
      .set('sensores_ids', sensores_ids.join(','));
    return this.http.get<Sensor[]>(this.API_URL_batch, {params: params, observe: 'response'});
  }

  obtenerSensor(sensor_id: string): Observable<HttpResponse<Sensor>> {
    return this.http.get<Sensor>(this.API_URL + '/' + sensor_id, {observe: 'response'});
  }

  borrarSensor(sensor_id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.API_URL + '/' + sensor_id, {observe: 'response'});
  }

  obtenerDispositivosSinRegistrar(): Observable<HttpResponse<string[]>> {
    return this.http.get<string[]>(this.API_URL_dispositivos_sin_registrar, {observe: 'response'});
  }

  obtenerSensoresSinvincular(): Observable<HttpResponse<Sensor[]>> {
    return this.http.get<Sensor[]>(this.API_URL_sensores_sin_vincular, {observe: 'response'});
  }

  obtenerSensoresPorHabitacion(habitacion_id: string): Observable<HttpResponse<Sensor[]>> {
    return this.http.get<Sensor[]>(this.API_URL_sensores_por_habitacion + '/' + habitacion_id, {observe: 'response'});
  }

  agregarSensorListaServicio(sensor_id: string): Observable<HttpResponse<any>> {
    return this.http.put<any>(this.API_URL_agregar_sensor_a_lista_servicio + '/' + sensor_id, null, {observe: 'response'});
  }

  removerSensorListaServicio(sensor_id: string): Observable<HttpResponse<any>> {
    return this.http.put<any>(this.API_URL_quitar_sensor_de_lista_servicio + '/' + sensor_id, null, {observe: 'response'});
  }

}
