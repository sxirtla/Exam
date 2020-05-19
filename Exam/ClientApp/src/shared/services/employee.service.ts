import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { EmployeeDto } from '../dtos/employee.dto';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>("api/employee/Get");
  }

  getById(id: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>("api/employee/GetById?id=" + id);
  }

  post(employee: EmployeeDto): Observable<Response> {
    return this.http.post<Response>("api/employee/Post", employee);
  }

  put(employee: EmployeeDto): Observable<Response> {
    return this.http.put<Response>("api/employee/Put", employee);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>("api/employee/Delete?id=" + id);
  }
}
