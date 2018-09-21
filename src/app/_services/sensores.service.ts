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
  private API_URL_sin_registrar: string;
  private API_URL_batch: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = environment.API_URL + '/api/app/user/sensores';
    this.API_URL_sin_registrar = environment.API_URL + '/api/app/user/dispositivos_sin_registrar';
    this.API_URL_batch = environment.API_URL + '/api/app/user/sensores_batch';
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
    return this.http.get<string[]>(this.API_URL_sin_registrar, {observe: 'response'});
  }

}
