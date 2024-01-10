import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnneeScolaire, Classe, Cours, Data, Model, Module, Prof, Salle, Session } from 'src/app/interfaces/model';
import { AnneeServiceService } from 'src/app/service/annee-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  p: number = 1;

  @Input() cours: Cours[] = [];
  @Input() salles: Salle[] = [];
  @Input() profs: Prof[] = [];
  @Input() classes: Classe[] = []
  @Input() modules: Module[] = [];

  @Input() coursToShow: Cours[] = [];
  @Output() eventCours = new EventEmitter<Cours>();
  @Output() eventDisplay = new EventEmitter();
  @Output() eventSession = new EventEmitter<Session>();
  @Input() message: string = "";
  annee: AnneeScolaire[] = [];
  @Input() sessions: Session[] = [];

  display: boolean = false;
  openModal: boolean = false
  selectedCour?: Cours
  formSession: FormGroup;
  searchFormGroup?: FormGroup

  module?: string
  dateValue?: string
  errorMessage: string = "";
  dateErrorMessage = "";


  constructor(public fb: FormBuilder, private serviceAnnee: AnneeServiceService) {
    this.formSession = fb.group({
      prof_id: ['',],
      semestre_id: ['',],
      module_id: [''],
      dateCours: ['', [Validators.required,]],
      /* , this.validateDateNow */
      classe_id: [],
      hDedut: ["", [Validators.required]],
      hFin: ['', [Validators.required, this.heureFinGreaterThanDebut]],
      /* ,  */
      duree: ['',[]],
      etat: ['', []],
      salle_id: ['',[]],
    })
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    })
    this.annee_en_cour();
  }
  annee_en_cour() {
    this.serviceAnnee.index().subscribe((response: Model<Data>) => {

      this.annee = response.data.annee
      // console.log(this.annee);
    })
  }
  validateDate(control: AbstractControl): { [key: string]: string } | null {
    const valueDate = control.value
    let dateC = valueDate.split("-")
    if (dateC[0] != 2023) {
      return { "message": "la date doit correspondre a l'annee " }
    }
    return null
  }
  ajouterSession(cour: Cours) {
    // Stocker la ligne cliquée
    this.selectedCour = cour;
    // Ouvrir le modal
    this.openModal = true;
  }
  closemodale() {
    //fermer modal
    this.openModal = false
  }
  // Définir le formulaire
  form = new FormGroup({
    heureDebut: new FormControl('', [
      // validateurs
    ]),
    heureFin: new FormControl('', [
      // validateurs
    ]),
  });
  validateHeureDebut(control: AbstractControl): { [key: string]: string } | null {
    if (control.value) {
      const value = control.value as string
      const debut = value.split(":");
      const heureDebutseconde = ((+debut[0] * 3600) + (+debut[1] * 60));
      const heureDebutAutorisee = 8 * 3600;
      console.log(heureDebutAutorisee, heureDebutseconde);
      if (heureDebutseconde) {
        if (heureDebutseconde > heureDebutAutorisee) {
          return { "heureDebut": "L'heure de début doit compris entre 8h et 16H" }
        }
      }
    } return null;

  }
  // validateur pour vérifier que l'heure de fin est supérieure au début
  heureFinGreaterThanDebut(control: AbstractControl): { [key: string]: string } | null {
    if (control.value) {
      // console.log(control.value);
      const val = control.value as string;
      const hfin = val.split(":");
      const value = control.parent?.get("hDedut")?.value;
      const debut = value.split(":");

      const heureDebutseconde = (+debut[0] * 3600 + +debut[1] * 60);
      const heureFinSeconde = (+hfin[0] * 3600 + +hfin[1] * 60);
      const duree = heureFinSeconde - heureDebutseconde;
      const dureeMin = 3600;
      const dureeMax = 14400;
      const heureFinAutorisee = 17 * 3600;

      if (heureFinSeconde && heureDebutseconde) {
        if (heureFinSeconde <= heureDebutseconde) {
          return { "heureFinSuperieure": "L'heure de fin doit strictement superieur a heure de debut" };
        }
        if (duree < dureeMin) {
          return { "heureFinSuperieure": "La durée minimun c'est 1h" }
        }
        if (duree > dureeMax) {
          return { "heureFinSuperieure": "La durée maximale c'est 4h" }
        }

        if (heureFinSeconde > heureFinAutorisee) {
          return { "heureFinSuperieure": "L'heure de fin doit être avant 17h" }
        }
      }
    }
    return null;
  }

  getEtatLabel(etat: number) {
    return etat == 1 ? '✅' : '🚫';
  }
  addSession() {
    const cour = this.selectedCour?.id;
    const prof = this.selectedCour?.prof.id;
    const mod = this.selectedCour?.module.id;
    const classe = this.selectedCour?.classe.id;

    const data = this.formSession.value
    data.cour_id = cour
    data.prof_id = prof
    data.module_id = mod
    data.classe_id = classe
     this.eventSession.emit(data);
    this.openModal = false

  }
  formatedDate() {
    // Récupérer la date sélectionnée
    let date = this.formSession.get('dateCours')?.value;
    // Formatter au format YYYY-MM-DD
    this.dateValue = new Date(date).toISOString().slice(0, 10);
    // console.log(this.dateValue);
    return this.dateValue
  }

  convertirSeconde(heure: string) {
    console.log(heure);
    let endsplit = heure.split(':');
    let nbreHeure = +endsplit[0]
    let minute = +endsplit[1];
    return (nbreHeure * 3600) + (minute * 60)
  }

  validateHoursRange() {
    const start = this.formSession.get('hDedut')!.value;
    const end = this.formSession.get('hFin')!.value;
    // Calculer la différence en heures
    const diff = end.getTime() - start.getTime();
    const diffHours = diff / (1000 * 60 * 60);

    if (diffHours < 1 || diffHours > 3) {
      return {
        hoursRange: true
      };
    }
    return null;
  }
  input(event: Event) {
    const element = event.target as HTMLSelectElement
    console.log(element.value);
    this.coursToShow = this.cours.filter(ele => ele.id == +element.value)
  }
  changeDebut() {
    let cour = this.selectedCour?.id;
    let date = this.formSession.get("dateCours")?.value
    let heureDebute = this.formSession.get('hDedut')?.value
    //console.log(this.sessions);
    console.log(date);

    // let object = this.sessions.find(element => element.cour.id == cour && element.dateCours == date)!;
    let object = this.sessions.filter(element => element.cour.id == cour && element.dateCours == date);
    console.log(object);
    if (object.length != 0) {
      let debutObj = this.convertirSeconde(object[0].hDedut)
      let finObj = this.convertirSeconde(object[0].hFin)
      let debut = this.convertirSeconde(heureDebute)

      if (debutObj <= debut && finObj > debut) {
        this.errorMessage = "Cette cour existe déjà"
        return;
      }
      this.errorMessage = "Cette heure est déjà prie"
    }
    else {
     //œ console.log("errors");

    }

  }
  validateDateNow(control: AbstractControl): { [key: string]: string } | null {
    if (control.value) {
      const selectedDate = control.value;
      const selectedDateIso = new Date(selectedDate);
      //console.log(selectedDateIso);
      const today = new Date();
      const date = today.toISOString().split('T')[0];
      const tomorrow = new Date(today.valueOf());
      const demain = tomorrow.setDate(tomorrow.getDate() + 1);
      const selectedDateSec = selectedDateIso.setDate(selectedDateIso.getDate() + 1);
      // console.log(demain);
      // console.log(selectedDateSec);
      if (selectedDate <= date) {
        return { 'dateNow': 'La date doit être au moins 2 jours après aujourd\'hui' }
      } else if (selectedDateSec == demain) {
        return { 'dateNow': 'La date ne peut pas être demain' };
      } else {
        return { 'dateNow': '' };
      }
    }
    return null;
  }
}
