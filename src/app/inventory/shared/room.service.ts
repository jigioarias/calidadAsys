import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ResponseList } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { Room, RoomType } from './room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http: HttpClient) {}

  add(room: Room) {
    const url = environment.apiUrl;
    this.http.post<any>(`${url}room`, room).subscribe(
      (data) => console.log('success', data),
      (error) => console.log('oops', error)
    );
  }

  addType(roomType: RoomType): Observable<RoomType> {
    const url = environment.apiUrl;
    return this.http.post<any>(`${url}roomtype`, roomType).pipe(
      switchMap((result) => of(result.content)),
      catchError((error) => throwError(error.error))
    );
  }

  getRoomTypes(): Observable<RoomType[]> {
    const url = environment.apiUrl;
    return this.http.get<ResponseList<RoomType>>(`${url}roomtype`).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => throwError(error.error))
    );
  }
}
