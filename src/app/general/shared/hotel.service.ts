import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Response } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { Hotel } from './hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  constructor(private http: HttpClient) {}

  find(): Observable<Hotel> {
    const url = environment.apiUrl;
    return this.http.get<Response<Hotel>>(`${url}hotel/`).pipe(
      switchMap((data) => of(data.content)),
      catchError((e) => {
        console.log(e);
        return empty;
      })
    );
  }
}
