import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(user: any, pass: any) {
    console.log('login con', user, pass);

    this.http
      .post<any>(
        'http://localhost:8083/login',
        {
          'usuario ': 'admin',
          'contrasena ': 'admin'
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
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
