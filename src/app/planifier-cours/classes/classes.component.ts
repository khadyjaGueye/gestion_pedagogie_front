import { Component, OnInit } from '@angular/core';
import { Classe, Data, Model } from 'src/app/interfaces/model';
import { ClasseService } from 'src/app/service/classe.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classes: Classe[] = [];

  classeShow: Classe[] = [];
  constructor(private service: ClasseService) { }

  ngOnInit(): void {
    this.allclasse();
  }

  allclasse() {
    return this.service.index().subscribe((response: Model<Data>) => {
      this.classes = response.data.classes
      //console.log(this.classes);
      this.classeShow = this.classes
    })
  }
}
