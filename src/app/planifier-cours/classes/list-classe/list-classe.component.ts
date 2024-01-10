import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Classe, Model, User } from 'src/app/interfaces/model';
import { ClasseService } from 'src/app/service/classe.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-classe',
  templateUrl: './list-classe.component.html',
  styleUrls: ['./list-classe.component.css']
})
export class ListClasseComponent implements OnInit {

  @Input() classes: Classe[] = []

  @Input() classShow: Classe[] = []

  selectClasse?: Classe
  openModal: boolean = false

  public doc: any;
  public excelData: any
  public message!: string
  etudiants: User[] = []
  coursId: number = 0;
  seache: FormGroup

  constructor(private service: ClasseService, private fb: FormBuilder) {
    this.seache = fb.group({
      nom: ['',],

    })
  }

  ngOnInit(): void { }

  importFiles(event: any) {
    const files = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(files);

    fileReader.onload = (e) => {
      let workbook = XLSX.read(fileReader.result, { type: 'binary' })
      let sheetNames = workbook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
      this.doc = {
        doc: this.excelData
      }
      console.log(this.doc);
      console.log(this.excelData);
    }
  }
  uploadFile() {
    console.log(this.doc);
    if (this.doc) {
      this.service.create(this.doc).subscribe(
        response => {
          this.message = response.data.message;
         // console.log('Fichier envoyé avec succès !', response);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: this.message,
            showConfirmButton: false,
            timer: 1500
          })
        },
        (error) => {
          //console.error('Erreur lors de l\'envoi du fichier :', error);
          this.message = error.error.data.message
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: this.message,
          })
        }
      );
    } else {
      console.error('Aucun fichier à envoyer !');  // {
      //   path : "prof",component:ProfesseurComponent,
      // },
    }
  }
  inscrireEtudiant(classe: Classe) {
    // Stocker la ligne cliquée
    this.selectClasse = classe;
    // console.log(classe);
    // Ouvrir le modal
    this.openModal = true;
  }
  closemodale() {
    //fermer modal
    this.openModal = false
  }
  inputClasse(event: Event) {
    const element = event.target as HTMLSelectElement
    this.classShow = this.classes.filter(ele => ele.id == +element.value)
  }

}
