import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Response, ResponseList } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) {}

  add(item: Item) {
    const url = environment.apiUrl;
    this.http.post<any>(`${url}item`, item).subscribe(
      (data) => console.log('success', data),
      (error) => console.log('oops', error)
    );
  }

  edit(item: Item): Observable<any> {
    const url = environment.apiUrl;
    return this.http.put<any>(`${url}item`, item).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => {
        return '{error:' + error + '}';
      })
    );
  }

  list(): Observable<Item[]> {
    const url = environment.apiUrl;
    return this.http.get<ResponseList<Item>>(`${url}item/`).pipe(
      switchMap((data) => of(data.content)),
      catchError((e) => {
        console.log(e);

        return empty;
      })
    );
  }

  find(uuid: string): Observable<Item> {
    const url = environment.apiUrl;
    return this.http.get<Response<Item>>(`${url}item/` + uuid).pipe(
      switchMap((data) => of(data.content)),
      catchError((e) => {
        console.log(e);
        return empty;
      })
    );
  }

  handleError(error): string {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return errorMessage;
  }
}
