import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Teacher} from "../model/Teacher";
import {Image} from "../model/Image";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url = `${base_url}`;
  constructor(private http: HttpClient) { }
  insert(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name); // En el back colocar 'file' en la iamgen cuack

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    // No establecer 'Content-Type' aquí, dejemos que Angular lo haga automáticamente
    return this.http.post<Image>(this.url + "image/upload", formData, { headers }); // Cambia 'Image' a 'any' o al DTO adecuado
  }
}
