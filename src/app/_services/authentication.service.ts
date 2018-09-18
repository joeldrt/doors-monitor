import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  private API_URL;
  private BASE_API_PATH = '/api/app/user';

  constructor(
    private http: HttpClient
  ) {
    this.API_URL = environment.API_URL + this.BASE_API_PATH;
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.API_URL + '/authenticate', { email: email, password: password })
      .pipe(map(token => {
        // login successful if there's a jwt token in the response
        if (token && token.id_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('doors_monitor_token', JSON.stringify(token));
        }

        return token;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('doors_monitor_token');
    // remove account from local storage to log user out
    localStorage.removeItem('doors_monitor_token');
  }
}
