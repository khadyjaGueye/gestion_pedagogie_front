import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Data } from 'src/app/interfaces/model';
import { ServiceService } from 'src/app/service/service.service';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService extends ServiceService<Data>{
  override url = environment.uri+'/session';
  constructor(htpp:HttpClient) {
    super(htpp);
   }
}
