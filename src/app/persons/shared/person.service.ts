import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ResponseList } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(private http: HttpClient) {}

  list(type: string): Observable<Person[]> {
    let usuarios: Person[];
    const url = environment.apiUrl;
    return this.http.get<ResponseList<Person>>(`${url}person?type=` + type).pipe(
      switchMap((data) => of(data.content)),
      catchError((e) => {
        console.log(e);
        return empty;
      })
    );
  }

  listSale(nationality: string, initDate: string, endDate: string): Observable<Person[]> {
    let usuarios: Person[];
    const url = environment.apiUrl;
    return this.http
      .get<ResponseList<Person>>(`${url}person?nationality=` + nationality + '&initDate' + initDate + '&endDate=' + endDate)
      .pipe(
        switchMap((data) => of(data.content)),
        catchError((e) => {
          console.log(e);
          return empty;
        })
      );
  }
}
