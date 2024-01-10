import { Component, OnInit } from '@angular/core';
import { Classe, Data, Model, User } from 'src/app/interfaces/model';
import { ClasseService } from 'src/app/service/classe.service';
import { EtudiantService } from 'src/app/service/etudiant.service';

@Component({
  selector: 'app-liste-etudiant',
  templateUrl: './liste-etudiant.component.html',
  styleUrls: ['./liste-etudiant.component.css']
})

export class ListeEtudiantComponent implements OnInit {

  etudiants: User[] = [];
  showToEtudiant: User[] = [];
  classes: Classe[] = [];
  constructor(private serviceEtudiant: EtudiantService, private serviceClasse: ClasseService) { }

  ngOnInit(): void {
    this.listEtudiant();
    this.allClasse();
  }
  listEtudiant() {
    return this.serviceEtudiant.index().subscribe((response: Model<Data>) => {
      this.etudiants = response.data.users;
      this.showToEtudiant = this.etudiants;
      //  console.log(this.showToEtudiant);
    })
  }
  allClasse() {
    return this.serviceClasse.index().subscribe((response: Model<Data>) => {
      this.classes =response.data.classes
      //console.log(this.classes);
    })
  }
  inputClasse(event: Event) {
    const element = event.target as HTMLSelectElement
    this.classes = this.classes.filter(ele => ele.id == +element.value)
  }

}
