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

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = environment.API_URL + '/api/app/user/complejos';
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

  obtenerComplejo(complejo_id: string): Observable<HttpResponse<Complejo[]>> {
    return this.http.get<Complejo[]>(this.API_URL + '/' + complejo_id, {observe: 'response'});
  }

  borrarComplejo(complejo_id: string): Observable<HttpResponse<Complejo[]>> {
    return this.http.delete<Complejo[]>(this.API_URL + '/' + complejo_id, {observe: 'response'});
  }

}
