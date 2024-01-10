import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Data } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class CourseSessionService extends ServiceService<Data>{
  override url = environment.uri + '/session';
  constructor(http: HttpClient) {
    super(http);
  }
}
