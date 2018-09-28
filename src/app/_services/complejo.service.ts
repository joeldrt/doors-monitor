import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Base URL
import { environment } from '../../environments/environment';

// Models
import { Complejo } from './../_models/complejo';

@Injectable()
export class ComplejoService {
  private API_URL: string;
  private API_URL_RESUMEN: string;
  private API_URL_RESUMEN_GENERAL: string;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = environment.API_URL + '/api/app/user/complejos';
    this.API_URL_RESUMEN = environment.API_URL + '/api/app/user/complejo_resumen';
    this.API_URL_RESUMEN_GENERAL = environment.API_URL + '/api/app/user/resumen_general';
  }

  guardarComplejo(complejo: Complejo): Observable<HttpResponse<Complejo>> {
    return this.http.post<Complejo>(this.API_URL, complejo, {observe: 'response'});
  }

  editarComplejo(complejo_id: string, complejo: Complejo): Observable<HttpResponse<Complejo>> {
    return this.http.put<Complejo>(this.API_URL + '/' + complejo_id, complejo, {observe: 'response'});
  }

  obtenerComplejos(): Observable<HttpResponse<Complejo[]>> {
    return this.http.get<Complejo[]>(this.API_URL, {observe: 'response'});
  }

  obtenerComplejo(complejo_id: string): Observable<HttpResponse<Complejo>> {
    return this.http.get<Complejo>(this.API_URL + '/' + complejo_id, {observe: 'response'});
  }

  borrarComplejo(complejo_id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.API_URL + '/' + complejo_id, {observe: 'response'});
  }

  obtenerServiciosComplejoEntreFechas(complejo_id: string, fecha_inicial: string, fecha_final: string):
  Observable<HttpResponse<any>> {
    const parametros = new HttpParams()
      .set('fecha_inicial', fecha_inicial)
      .set('fecha_final', fecha_final);
    return this.http.get<HttpResponse<any>>(this.API_URL_RESUMEN + '/' + complejo_id, {params: parametros, observe: 'response'});
  }

  obtenerResumenGeneral(fecha_inicial: string, fecha_final: string):
  Observable<HttpResponse<any>> {
    const parametros = new HttpParams()
      .set('fecha_inicial', fecha_inicial)
      .set('fecha_final', fecha_final);
    return this.http.get<HttpResponse<any>>(this.API_URL_RESUMEN_GENERAL, {params: parametros, observe: 'response'});
  }

}
