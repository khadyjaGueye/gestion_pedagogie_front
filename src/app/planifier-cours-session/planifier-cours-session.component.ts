import { Component, Input, OnInit } from '@angular/core';

import { SessionServiceService } from './session-service.service';
import { Cours, Data, Model, Module, Salle, Semestre } from 'src/app/interfaces/model';

@Component({
  selector: 'app-planifier-cours-session',
  templateUrl: './planifier-cours-session.component.html',
  styleUrls: ['./planifier-cours-session.component.css']
})
export class PlanifierCoursSessionComponent implements OnInit{
  salles: Salle[] = [];
  cours: Cours[] = [];
  modules: Module[] = []

  @Input() courSession? : Cours

  constructor(private service : SessionServiceService){}

  ngOnInit(): void {

  }

}
