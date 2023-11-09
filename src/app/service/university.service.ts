import { Injectable } from '@angular/core';
import {University} from "../model/University";
import {Observable, Subject} from "rxjs";
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
  getUniversitybyID(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(this.url + "/university/" + id, {headers});
  }
  //filtro para encontrar universidad por nombre
  listUniversitiesByName(name:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<University[]>(`${this.url}/universities/findby/${name}`, { headers });
  }
  //filtro de busqueda avanzada
  listUniversitiesAdvancedFilter(district:string, modality:string, qFrom:number, qTo:number, pFrom:number, pTo:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<University[]>(`${this.url}/universities/findbyfilters/${district}/${modality}/${qFrom}/${qTo}/${pFrom}/${pTo}`, { headers });
  }
  //filtro de tipo de educacion
  listUniversitiesByEducationType(educationType:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<University[]>(`${this.url}/universities/findbyeducationtype/${educationType}`, { headers });
  }
  //filtro de pension promedio
  listUniversitiesByPensionProm(pFrom:number, pTo:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<University[]>(`${this.url}/universities/findbypension/${pFrom}/${pTo}`, { headers });
  }
  //implementar filtro de link de matricula
  getEnrrollmentLinkByUniversity(id:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<University[]>(`${this.url}/universities/findlinkbyid/${id}`, { headers });
  }
}
