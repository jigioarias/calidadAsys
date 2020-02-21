import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ResponseList } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  add(usuario: User) {

    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    let options = {
      headers: headers
    };
    console.log(usuario);
    const url = environment.apiUrl;
    console.log(url);
    this.http.post<any>(`${url}user`, usuario, options).subscribe(
      data => console.log('success', data),
      error => console.log('oops', error)
    );

  }


  list(): Observable<User[]> {

    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    let options = {
      headers: headers
    };

    let usuarios: User[];
    const url = environment.apiUrl;

    return this.http.get<ResponseList<User>>(`${url}user`, options).pipe(
      switchMap(
        data => of(data.content)
      ), catchError(
        e => {
          console.log(e);
          return empty;
        }
      )
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
