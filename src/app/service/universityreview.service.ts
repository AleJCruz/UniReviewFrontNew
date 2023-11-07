import { Injectable } from '@angular/core';
import {Observable, Subject, switchMap, tap} from "rxjs";
import {TeacherReview} from "../model/TeacherReview";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UniversityReview} from "../model/UniversityReview";

@Injectable({
  providedIn: 'root'
})
export class UniversityreviewService {
  private url = "http://localhost:8080/api/";
  private listaChange = new Subject<UniversityReview[]>();

  constructor(private http:HttpClient) { }
  list(id: number): Observable<UniversityReview[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<UniversityReview[]>(this.url + "universityReview/byidUniversity/" + id, { headers });
  }
  insert(universityReview: UniversityReview) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<UniversityReview>(this.url + "universityReview", universityReview, { headers }).pipe(
      switchMap(() => this.list(universityReview.university.id)) // Reutiliza el método list para obtener la lista actualizada.
    );
  }
  setList(listaNueva:UniversityReview[]){

    this.listaChange.next(listaNueva); //enviar la nueva lista a los suscriptores
  }
  getList(): Observable<UniversityReview[]> {
    return this.listaChange.asObservable(); // No ha cambiado, esto es correcto.
  }
  delete(id: number) {
    const url =this.url+ `universityReview/${id}`;
    this.http.delete(url).subscribe(
      (response) => {
        console.log('Reseña de la universidad eliminada con éxito', response);
        // Realiza cualquier otra acción necesaria después de la eliminación.
      },
      (error) => {
        console.error('Error al eliminar la reseña de la universidad', error);
      }
    );
  }

}
