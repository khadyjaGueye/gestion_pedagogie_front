import { Component, OnInit, ViewChild } from '@angular/core';
import { CourServiceService } from '../service/cour-service.service';
import { Classe, Cour, Cours, Data, Model, Module, Prof, Salle, Semestre, Session } from '../interfaces/model';
import { FormComponent } from './form/form/form.component';
import { CourseSessionService } from '../service/course-session.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planifier-cours',
  templateUrl: './planifier-cours.component.html',
  styleUrls: ['./planifier-cours.component.css']
})
export class PlanifierCoursComponent implements OnInit {
  @ViewChild(FormComponent) formcomponent!: FormComponent
  profs: Prof[] = [];
  salles: Salle[] = [];
  classes: Classe[] = [];
  semestres: Semestre[] = [];
  cours: Cours[] = [];
  modules: Module[] = [];
  courToShow: Cours[] = [];
  sessions: Session[] = [];

  message: string = "";
  courSession?: Cours
  display: string = "cour";
  dispS: boolean = false;
  defaultDisplay = 'list';

  constructor(private serviceCour: CourServiceService, private serviceSession: CourseSessionService, private router: Router) { }

  ngOnInit(): void {
    this.allProf();
    this.allClasse();
    this.allSemestre();
    this.allModule();
    this.allCours();
    this.allSalle();
    this.allSession();
    this.display = this.defaultDisplay;
  }
  displaySession(disp: boolean) {
    this.dispS = disp;
  }

  allCours() {
    return this.serviceCour.index().subscribe((response: Model<Data>) => {
      this.cours = response.data.cours
      // console.log(this.cours);
      this.courToShow = this.cours;
    })
  }
  allProf() {
    return this.serviceCour.index().subscribe((response: Model<Data>) => {
      this.profs = response.data.profs;
      // console.log(this.profs);
      //this.formcomponent.profs = this.profs
    })
  }
  addSession(cour: Cours) {
    this.courSession = cour;
    //console.log(cour);

  }
  allSalle() {
    return this.serviceCour.index().subscribe((response: Model<Data>) => {
      this.salles = response.data.salles
      //console.log(this.salles);
    })
  }

  allModule() {
    return this.serviceCour.index().subscribe((response: Model<Data>) => {
      this.modules = response.data.modules;
      // console.log(response.data.modules);

    })
  }
  allClasse() {
    return this.serviceCour.index().subscribe((response: Model<Data>) => {
      this.classes = response.data.classes;
      //console.log(response.data.classes);
    })
  }
  allSemestre() {
    return this.serviceCour.index().subscribe((response: Model<Data>) => {
      this.semestres = response.data.semestres;
      // console.log(response.data.semestres);
    })
  }
  allSession() {
    return this.serviceSession.index().subscribe((response: Model<Data>) => {
      this.sessions = response.data.sessions;
      // console.log(this.sessions);
    })
  }
  getProf(moduleId: number) {
    return this.serviceCour.getProf(moduleId).subscribe((response) => {
    })
  }
  createCour(data: Cours) {
    this.serviceCour.store(data).subscribe(
      (response) => {
        this.message = response.data.message;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: this.message,
          showConfirmButton: false,
          timer: 3000
        })
      },error => {
        this.message = error.error.data.message
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.message,
        })
      })
  }
  createSession(session: Session) {
    this.serviceSession.store(session).subscribe(
      (response) => {
        this.message = response.data.message;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: this.message,
          showConfirmButton: false,
          timer: 1500
        })
      },error => {
        this.message = error.error.data.message
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.message,
        })
      }
    )
  }
  getClasse() {
    this.display = "classe"
  }
  getSession() {
    this.display = "session"
  }
  getPlanning() {
    this.display = "planning"
  }
  getList() {
    this.display = "list"
  }
  getEtudiant() {
    this.display = "etudiant";
  }
  getAcepteAnnuler() {
    this.display = "acepteAnnuler"
  }
  seDeconnecter() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigateByUrl("");
  }
}
