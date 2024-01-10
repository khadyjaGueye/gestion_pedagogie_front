import { Component, OnInit } from '@angular/core';
import { ProfesseurService } from '../service/professeur.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cours, Data, Model } from '../interfaces/model';
import { DemandeService } from '../service/demande.service';

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.css']
})
export class ProfesseurComponent implements OnInit {

  cours: Cours[] = [];

  openModal: boolean = false;
  selectedCour?: Cours
  formDemande: FormGroup;

  message: string = ""

  constructor(private serviceProf: ProfesseurService, private fb: FormBuilder, private demandeService: DemandeService) {
    this.formDemande = this.fb.group({
      motif: ['',]
    })
  }
  ngOnInit(): void {
    this.listeCoursProf();
  }

  listeCoursProf() {
    return this.serviceProf.index().subscribe((response: Model<Data>) => {
      this.cours = response.data.cours
      console.log(this.cours);
    })
  }
  annulation(cour: Cours) {
    // Stocker la ligne cliquée
    this.selectedCour = cour;
    //console.log(this.selectedCour);

    // Ouvrir le modal
    this.openModal = true;
  }
  closemodale() {
    //fermer modal
    this.openModal = false
  }

  demadeAnnulation() {
    let prof_id = this.selectedCour?.cour.prof.id
    let session_id = this.selectedCour?.id
    //console.log(prof_id,session_id);
    const data = this.formDemande.value
    data.prof_id = prof_id;
    data.session_id = session_id;
    //console.log(data);
    return this.demandeService.store(data).subscribe((response: Model<Data>) => {

    }, error => {
      console.error(error.error.message);
      this.message = error.error.message
    })
  }

}
