import { Injectable } from '@angular/core';
import {  User, UserAuth } from '../interfaces/model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authenticatedUser: User | undefined;
  constructor(private http: HttpClient) { }

  login(user: User): Observable<UserAuth> {
    //console.log(user);
    return this.http.post<UserAuth>("http://127.0.0.1:8000/api/login", user);
  }

  public isAuthentificated(): boolean {
    return this.authenticatedUser != undefined;
  }

  public authentificateUser(user: User, token:string): Observable<boolean>{
    this.authenticatedUser = user;
    localStorage.setItem('token',token);
   // localStorage.setItem("authUser", token);
    return of(true);
  }
  estConnecter()
  {
    return localStorage.getItem('token')!==null;
  }


}
