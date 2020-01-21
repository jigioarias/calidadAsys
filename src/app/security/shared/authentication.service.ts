import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(user: any, pass: any) {
    console.log('login con', user, pass);
    const url = environment.apiUrl;
    this.http
      .post<any>(`${url}login`, {
        usuario: 'admin',
        contrasena: 'admin'
      })
      .subscribe(
        r => {
          console.log('respuesta', r);
        },
        err => {
          console.log('error', err);
        }
      );
  }
}
