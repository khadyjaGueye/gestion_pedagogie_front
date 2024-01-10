import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Classe, Cours, Module, Prof, Semestre } from 'src/app/interfaces/model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  professeurs: Prof[] = [];
  profs: Prof[] = [];
  @Input() classes: Classe[] = [];
  @Input() semesters: Semestre[] = [];
  @Input() cours: Cours[] = [];
  @Input() modules: Module[] = []
  @Input() message: string = "";

  @Output() testEvent = new EventEmitter<Cours>();

  formcour: FormGroup // "prof_id": 6,
  // "module_id" : 2
  tabClasse: Classe[] = []
  coursAjoutes: Cours[] = [];
  selectedClasses: Classe[] = [];
  sms: string = "";

  constructor(private fb: FormBuilder) {
    this.formcour = this.fb.group({
      prof_id: ['', []],
      semestre_id: ['', []],
      module_id: ['', []],
      nbreHeure: ['', this.validateNombreHeure],
      classe_id: ['', []]
    });
  }
  ngOnInit(): void { }
  validateNombreHeure(control: AbstractControl): { [key: string]: string } | null {
    if (control.value) {
      const value = control.value
      if (value < 20) {
        return { "nbreHeure": "Le nombre heure doit etre minimum 20" }
      }
      if (value > 50) {
        return { "nbreHeure": "Le nombre heure doit etre maximum 50" }
      }
    } return null;

  }
  addClasse(suggestion: Classe) {
    this.selectedClasses.push(suggestion);
    this.selectedClasses = [];
  }
  getClasse(event: Event) {
    const target = event.target as HTMLInputElement
    let clas: string = target.value.toLowerCase()
    //console.log(clas);
    if (clas !== "") {
      this.tabClasse = this.classes.filter(classe =>
        classe.nom.toLowerCase().includes(clas)
      );
      return this.tabClasse
    } else { return this.tabClasse = [] }
  }

  addCour() {
    const cours = this.formcour.value;

    if (this.coursAjoutes.find(c => c.id === cours.id)) {
      return;
    }

    // let formData = new FormData();
    // formData.append("prof_id", this.formcour.value.prof_id);
    // formData.append("semestre_id", this.formcour.value.semestre_id);
    // formData.append("module_id", this.formcour.value.module_id);
    // formData.append("nbreHeure", this.formcour.value.nbreHeure);
    // formData.append("classe_id", this.formcour.value.classe_id);
    this.testEvent.emit(cours);
    // this.coursAjoutes.push(cours);
    //console.log(cours);
  }

  moduleChange() {
    let module = this.modules.find(element =>
      element.id == this.formcour.get('module_id')?.value
    )!
    this.professeurs = module?.profs
    //console.log(module);
  }

}
