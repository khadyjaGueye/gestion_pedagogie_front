import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { Data } from '../interfaces/model';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService extends ServiceService<Data>{
  override url = environment.uri + '/prof/1';
  constructor(http: HttpClient) {
    super(http);
  }
}

