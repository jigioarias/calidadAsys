import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Response, ResponseList } from 'src/app/general/shared/response';
import { environment } from 'src/environments/environment';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  save(employee: Employee) {
    const url = environment.apiUrl;
    console.log(employee);

    this.http.post<any>(`${url}employee`, employee).subscribe(
      (data) => {
        console.log('success', data);
        console.log('codigo', data.status);
      },
      (error) => console.log('oops', error)
    );
  }

  list(): Observable<Employee[]> {
    const url = environment.apiUrl;

    return this.http.get<ResponseList<Employee>>(`${url}employee`).pipe(
      switchMap((data) => of(data.content)),
      catchError((e) => {
        console.log(e);
        return empty;
      })
    );
  }

  find(id: string): Observable<Employee> {
    const url = environment.apiUrl;
    return this.http.get<Response<Employee>>(`${url}employee/` + id).pipe(
      switchMap((data) => of(data.content)),
      catchError((e) => {
        console.log(e);
        return empty;
      })
    );
  }
}
