import { Injectable } from '@angular/core';
import {Teacher} from "../model/Teacher";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private url = "http://localhost:8080/api/";
  private listaCambio = new Subject<Teacher[]>();
// inyectando httpClient
  constructor(private http: HttpClient) { }

//listar
  list() : Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Teacher[]> (this.url + "teacher", {headers});
  }

//insertar datos
  insert (teacher:Teacher){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(this.url+"teacher", teacher, {headers});
  }
  setList(listaNueva:Teacher[]){
    this.listaCambio.next(listaNueva); //enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaCambio.asObservable();
  }

  update(teacher: Teacher){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(this.url+"teacher", teacher, {headers});
  }
  getTeacherbyID(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(this.url + "teacher/" + id, {headers});
  }

}
