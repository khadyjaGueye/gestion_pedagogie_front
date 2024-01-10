import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Data, Demande, Model } from 'src/app/interfaces/model';
import { AnnulerAccepteService } from 'src/app/service/annuler-accepte.service';

@Component({
  selector: 'app-accepte-ou-annuler',
  templateUrl: './accepte-ou-annuler.component.html',
  styleUrls: ['./accepte-ou-annuler.component.css']
})
export class AccepteOuAnnulerComponent implements OnInit {

  demandes: Demande[] = [];

  openModal: boolean = false
  selectedDemande?: Demande

  etatDemande: FormGroup;

  constructor(private serviceResp: AnnulerAccepteService, private fb: FormBuilder) {
    this.etatDemande = this.fb.group({
      etat_demande: ['',],
    });
  }
  ngOnInit(): void {
    this.allDemande();
  }

  allDemande() {
    return this.serviceResp.index().subscribe((response: Model<Data>) => {
      this.demandes = response.data.demandes
      //console.log(this.demandes);
    })
  }
  accepte() {
   // alert("eeeee")
    const etatControl = this.etatDemande.get('etat_demande')?.value;
    if (etatControl) {

      console.log(etatControl);
    }
  }

  selectedAccepte(demande: Demande) {
    // Stocker la ligne cliquée
    this.selectedDemande = demande;
    //console.log(demande);
    // Ouvrir le modal
    this.openModal = true;
  }
  closemodale() {
    //fermer modal
    this.openModal = false
  }
}
