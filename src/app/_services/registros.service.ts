import { Injectable } from '@angular/core';
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

  getRegistros(fecha_inicial: string, fecha_final: string): Observable<HttpResponse<Registro[]>> {
    const parametros = new HttpParams()
      .set('fecha_inicial', fecha_inicial)
      .set('fecha_final', fecha_final);
    return this.http.get<Registro[]>(this.API_URL + 'api/registros', { params: parametros, observe: 'response'});
  }
}
