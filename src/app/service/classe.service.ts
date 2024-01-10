import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { Data } from '../interfaces/model';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClasseService extends ServiceService<Data>{

  override url = environment.uri+'/classe';

  constructor(http:HttpClient) {
    super(http);
   }
}
