import { Injectable } from '@angular/core';
import {Course} from "../model/Course";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private url = "http://localhost:8080/api/";

  constructor(private http: HttpClient) {
  }

  insert(course: Course) { // Cambia el tipo de retorno a any o a un tipo de DTO adecuado si lo tienes definido
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(this.url + "course", {headers});
  }
  list():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Course[]>(this.url + "courses", {headers});
  }
}
