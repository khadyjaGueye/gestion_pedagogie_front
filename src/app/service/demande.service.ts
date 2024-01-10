import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { Data } from '../interfaces/model';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemandeService extends ServiceService<Data>{

  override url = environment.uri + '/prof';
  constructor(http: HttpClient) {
    super(http);
  }
}
