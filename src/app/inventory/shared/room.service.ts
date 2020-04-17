import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  addType(roomType: RoomType) {
    console.log('tipo a guardar', roomType);

    const url = environment.apiUrl;
    this.http.post<any>(`${url}roomtype`, roomType).subscribe(
      (data) => console.log('success', data),
      (error) => console.log('oops', error)
    );
  }
}
