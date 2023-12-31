import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../model/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Image} from "../model/Image";
import {environment} from "../../environments/environment";
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${base_url}`;
  private listaChange = new Subject<User[]>();
  private currentUserSubject = new BehaviorSubject<User | null>(null);
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
  getCurrentUserObservable(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }
  updateCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }
  edit(id:number, image:Image): Observable<any> {
    const url1 =this.url+ `user/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', //Esto especifica que estamos enviando un json, la verdad nose porque de otra forma no funca xd
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    this.http.put(url1, JSON.stringify(image), { headers });
    return this.http.put(url1, JSON.stringify(image), { headers });
  }
  edituserdata(user:User){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Esto igual, hace que estemos enviando un json
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(this.url + "user", JSON.stringify(user), { headers });
  }
}
