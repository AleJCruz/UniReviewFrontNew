import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {User} from "../model/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Image} from "../model/Image";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:8080/api/";
  private listaChange = new Subject<User[]>();
  constructor(private http:HttpClient) { }
  list():Observable<any>{
    return this.http.get<User[]>(this.url + "get");
  }
  insert (user:User){
    return this.http.post(this.url+"user/register", user);
  }
  setList(listaNueva:User[]){
    this.listaChange.next(listaNueva); //enviar la nueva lista a los suscriptores
  }
  getList(){
    return this.listaChange.asObservable();
  }
  edit(id:number, image:Image): Observable<any> {
    const url1 =this.url+ `user/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // This line ensures that you're sending JSON
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    this.http.put(url1, JSON.stringify(image), { headers });
    return this.http.put(url1, JSON.stringify(image), { headers });
  }
  edituserdata(user:User){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // This line ensures that you're sending JSON
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(this.url + "user", JSON.stringify(user), { headers });
  }
}
