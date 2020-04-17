import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Response, ResponseList } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  add(usuario: User) {
    const url = environment.apiUrl;
    this.http.post<any>(`${url}user`, usuario).subscribe(
      (data) => console.log('success', data),
      (error) => console.log('oops', error)
    );
  }

  edit(usuario: User): Observable<any> {
    const url = environment.apiUrl;
    console.log('usuario', usuario);
    return this.http.put<any>(`${url}user`, usuario).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => {
        return '{error:' + error + '}';
      })
    );
  }

  list(): Observable<User[]> {
    let usuarios: User[];
    const url = environment.apiUrl;

    return this.http.get<ResponseList<User>>(`${url}user`).pipe(
      switchMap((data) => of(data.content)),
      catchError((e) => {
        console.log(e);
        return empty;
      })
    );
  }

  find(id: string): Observable<User> {
    const url = environment.apiUrl;
    return this.http.get<Response<User>>(`${url}user/` + id).pipe(
      switchMap((data) => of(data.content)),
      catchError((e) => {
        console.log(e);
        return empty;
      })
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
