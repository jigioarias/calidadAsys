import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserCredential } from './user-credential';

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

  login2(email: string, pass: string): Observable<UserCredential> {
    if (email === 'user') {
      return of({
        user: email,
        token: 'token',
        hotel: [
          {
            uuid: 'uuidHotel',
            name: 'PrimerHotel',
            email: 'hotel@aa.com'
          },
          {
            uuid: 'uuidHotel',
            name: 'SegundoHotel',
            email: 'hotel@aa.com'
          }
        ]
      } as UserCredential);
    } else {
      return of({
        user: email,
        token: 'token',
        hotel: null
      } as UserCredential);
    }

    // const url = environment.apiUrl;
    // this.http
    //   .post<Respuesta<UserCredential>>(`${url}login`, {
    //     usuario: email,
    //     contrasena: pass
    //   })
    //   .subscribe(
    //     r => {
    //       console.log('respuesta', r);
    //     },
    //     err => {
    //       console.log('error', err);
    //     }
    //   );
  }
}
