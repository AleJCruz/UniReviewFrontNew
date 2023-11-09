import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Teacher} from "../model/Teacher";
import {Image} from "../model/Image";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url = "http://localhost:8080/api/";
  constructor(private http: HttpClient) { }
  insert(file: File): Observable<any> { // Cambia el tipo de retorno a any o a un tipo de DTO adecuado si lo tienes definido
    const formData: FormData = new FormData();
    formData.append('file', file, file.name); // Asegúrate de que 'file' coincida con el nombre del parámetro esperado en tu backend

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    // No establecer 'Content-Type' aquí, deja que Angular lo haga automáticamente
    return this.http.post<Image>(this.url + "image/upload", formData, { headers }); // Cambia 'Image' a 'any' o al DTO adecuado
  }
}
