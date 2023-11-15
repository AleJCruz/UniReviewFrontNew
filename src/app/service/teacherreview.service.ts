import { Injectable } from '@angular/core';
import {Observable, Subject, switchMap, tap} from "rxjs";
import {University} from "../model/University";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TeacherReview} from "../model/TeacherReview";
import {User} from "../model/User";
import {environment} from "../../environments/environment";
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class TeacherreviewService {
  private url = `${base_url}`;
  private listaChange = new Subject<TeacherReview[]>();
  constructor(private http:HttpClient) { }
  list(id:number):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<TeacherReview[]>(this.url + "teacherReviews/byid/"+id, {headers});
  }
  insert (teacherReview:TeacherReview){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Enviando Jsooooooon
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<TeacherReview>(this.url + "teacherReview", teacherReview, { headers }).pipe(
      switchMap(response => {
        // Aquí asumimos que la respuesta es la reseña insertada
        return this.list(teacherReview.teacherDTO.id).pipe(
          tap(updatedList => {
            this.setList(updatedList); // Actualizar la lista después de la inserción
          })
        );
      })
    );
  }
  setList(listaNueva:TeacherReview[]){

    this.listaChange.next(listaNueva); //enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaChange.asObservable();
  }
  delete(id: number) {
    const url =this.url+ `teacherReview/${id}`;
    this.http.delete(url).subscribe(
      (response) => {
        console.log('Reseña del profesor eliminada con éxito', response);
        // agregamos algo?
      },
      (error) => {
        console.error('Error al eliminar la reseña del profesor', error);
      }
    );
  }

}
