import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ResponseList } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { Rol } from './rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  constructor(private http: HttpClient) {}

  list(): Observable<Rol[]> {
    let roles: Rol[];
    const url = environment.apiUrl;
    return this.http.get<ResponseList<Rol>>(`${url}role`).pipe(
      switchMap((data) => of(data.content)),
      catchError((e) => {
        console.log(e);
        return empty;
      })
    );
  }
}
