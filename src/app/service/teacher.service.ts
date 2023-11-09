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
  insert (teacher:Teacher, id:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<Teacher>(this.url+"teacher/"+id, teacher, {headers});
  }
  addCourse(teacherId: number, courseId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    // Las opciones de la solicitud deben incluir los encabezados
    const options = { headers: headers };

    // La URL y las opciones se pasan como argumentos separados
    return this.http.put(`${this.url}teacher/${teacherId}/courses/${courseId}`, {}, options);
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
  listByFullName(fullName: string) {
    // Crear encabezados HTTP si son necesarios, por ejemplo, si requieres un token de autorización.
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    // Realizar la solicitud GET con los encabezados y retornar el Observable.
    return this.http.get<Teacher[]>(`${this.url}teacher/findbyfullname/${fullName}`, { headers });
  }
  //find por nombre de rigurosidad
  listTeachersbyRigurosityName(rigurosity:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Teacher[]>(`${this.url}teacher/rigurosity/${rigurosity}`, { headers });
  }
  //busqueda avanzada con todos los filtros
  listTeachersByAdvancedSearch(qFrom:number, qTo:number, rigurosityID:number, courseID:number, fullnameTeacher:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Teacher[]>(`${this.url}teacher/advancedsearch/${qFrom}/${qTo}/${rigurosityID}/${courseID}/${fullnameTeacher}`, { headers });
  }

  //filtro por curso para teacher
  listTeacherByCourse(courseID:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Teacher[]>(`${this.url}teacher/course/${courseID}`, { headers });
  }

  //filtro por calificacion para profesor
  listTeachersByQualifications(qFrom:number, qTo:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Teacher[]>(`${this.url}teacher/qualification/${qFrom}/${qTo}`, { headers });
  }

  //
}
