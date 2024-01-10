import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cours, Module, Salle, Semestre } from 'src/app/interfaces/model';

@Component({
  selector: 'app-form-ajout-session',
  templateUrl: './form-ajout-session.component.html',
  styleUrls: ['./form-ajout-session.component.css']
})
export class FormAjoutSessionComponent implements OnInit {
  @Input() salles: Salle[] = [];
  @Output() testSession = new EventEmitter<FormData>()

  moduls: Module[] = []
  @Input() courSe? : Cours;

  formSession: FormGroup;

  constructor(public fb: FormBuilder) {
    this.formSession = fb.group({
      prof_id: ['',],
      semestre_id: ['',],
      module_id: [''],
      dateCours: [''],
      classe_id: [],
      hDedut: [''],
      hFin: [''],
      duree: [],
      etat: [],
      salle_id:[]
    })
  }
  ngOnInit(): void { }


  addSession() {

  }
}
