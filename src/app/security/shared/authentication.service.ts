import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserCredential } from './user-credential';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(user: string, pass: string): Observable<boolean> {
    const url = environment.apiUrl;
    return this.http
      .post<any>(`${url}login`, {
        usuario: user,
        contrasena: pass
      })
      .pipe(
        switchMap(response => {
          console.log('respuesta', response);
          if (response.mensaje && response.mensaje === 'Usuario existente') {
            this.setUserCredential(response.contenido);
            return of(true);
          }
          return of(false);
        })
      );
  }

  setUserCredential(userCredential: UserCredential) {
    localStorage.setItem('userLogged', userCredential.user);
    localStorage.setItem('token', userCredential.token);
  }
}
