import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

// Base URL
import { environment } from '../../environments/environment';

// Models
import { Registro } from '../_models/registro';

@Injectable()
export class RegistrosService {
  private API_URL: String;

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = environment.API_URL;
  }

  getRegistros(): Observable<HttpResponse<Registro[]>> {
    return this.http.get<Registro[]>(this.API_URL + 'api/registros?days=3', { observe: 'response'});
  }
}
