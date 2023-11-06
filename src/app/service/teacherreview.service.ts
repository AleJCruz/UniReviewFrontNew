import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {University} from "../model/University";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TeacherReview} from "../model/TeacherReview";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class TeacherreviewService {
  private url = "http://localhost:8080/api/";
  private listaChange = new Subject<TeacherReview[]>();
  constructor(private http:HttpClient) { }
  list():Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<TeacherReview[]>(this.url + "teacherReviews", {headers});
  }
  insert (teacherReview:TeacherReview){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // This line ensures that you're sending JSON
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(this.url+"teacherReview", teacherReview, { headers });
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
        // Realiza cualquier otra acción necesaria después de la eliminación.
      },
      (error) => {
        console.error('Error al eliminar la reseña del profesor', error);
      }
    );
  }

}
