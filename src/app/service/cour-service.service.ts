import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ServiceService } from './service.service';
import { Data } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class CourServiceService extends ServiceService<Data>{
  override url = environment.uri+'/cours';

  constructor(http:HttpClient) {
    super(http);
   }
}
