import { Injectable } from '@angular/core';
import {University} from "../model/University";
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private url = "http://localhost:8080/api";
  private listaChange = new Subject<University[]>();
  constructor(private http:HttpClient) { }

  list(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<University[]>(this.url + "/universities", { headers });
  }
  insert (university:University){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(this.url+"/university", university, { headers });
  }
  setList(listaNueva:University[]){
    this.listaChange.next(listaNueva); //enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaChange.asObservable();
  }
}
