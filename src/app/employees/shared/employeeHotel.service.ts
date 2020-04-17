import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmployeeHotel } from './empleadoHotel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeHotelService {
  constructor(private http: HttpClient) {}

  save(employeeHotel: EmployeeHotel) {
    const url = environment.apiUrl;
    console.log(employeeHotel);

    this.http.post<any>(`${url}other/employee`, employeeHotel).subscribe(
      (data) => {
        console.log('success', data);
        console.log('codigo', data.status);
      },
      (error) => console.log('oops', error)
    );
  }
}
