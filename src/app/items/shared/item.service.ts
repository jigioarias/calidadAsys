import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ResponseList } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) {}

  add(item: Item) {
    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    let options = {
      headers: headers
    };
    const url = environment.apiUrl;
    this.http.post<any>(`${url}item`, item, options).subscribe(
      data => console.log('success', data),
      error => console.log('oops', error)
    );
  }

  list(): Observable<Item[]> {
    let headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    let options = {
      headers: headers
    };

    let usuarios: Item[];
    const url = environment.apiUrl;

    return this.http.get<ResponseList<Item>>(`${url}item`, options).pipe(
      switchMap(data => of(data.content)),
      catchError(e => {
        console.log(e);
        return empty;
      })
    );
  }
}
