import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { Data } from '../interfaces/model';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnnulerAccepteService extends ServiceService<Data>{

  override url = environment.uri+'/resp';

  constructor(http:HttpClient) {
    super(http);
   }
}
