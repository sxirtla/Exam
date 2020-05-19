import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { TaskDto } from '../dtos/task.dto';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>("api/task/Get");
  }

  getById(id: number): Observable<TaskDto> {
    return this.http.get<TaskDto>("api/task/GetById?id=" + id);
  }

  getByEmployeeId(id: number): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>("api/task/GetByEmployeeId?id=" + id);
  }

  post(task: TaskDto): Observable<Response> {
    return this.http.post<Response>("api/task/Post", task);
  }

  put(task: TaskDto): Observable<Response> {
    return this.http.put<Response>("api/task/Put", task);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>("api/task/Delete?id=" + id);
  }
}
