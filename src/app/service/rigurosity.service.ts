import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../model/Course";

@Injectable({
  providedIn: 'root'
})
export class RigurosityService {
  private url = "http://localhost:8080/api/";
  constructor(private http: HttpClient) { }
  list():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Course[]>(this.url + "rigurosity", {headers});
  }
}
