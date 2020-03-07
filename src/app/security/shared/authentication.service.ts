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
    console.log(url);
    return this.http
      .post<any>(`${url}login`, {
        user: user,
        password: pass
      })
      .pipe(
        switchMap(response => {
          if (response.message && response.message === 'Usuario encontrado.') {
            this.setUserCredential(response.content);
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
