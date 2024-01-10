import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cours, Data, Model } from '../interfaces/model';
// import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export abstract class ServiceService<T> {

  protected url: string = "";
  constructor(protected http: HttpClient) { }

  store(data:any):Observable<Model<Data>>
  {
    return this.http.post<Model<Data>>(`${this.url}`,data)
  }
  index():Observable<Model<Data>>{
    return this.http.get<Model<Data>>(`${this.url}`);
  }

  getProf(moduleId:number):Observable<Model<Data>>{
    return this.http.get<Model<Data>>(`http://127.0.0.1:8000/api/module/${moduleId}`)
  }
  create(data:any):Observable<any>
  {
    return this.http.post<any>(`${this.url}`,data)
  }
}
