import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PlanifierCoursSessionComponent } from './planifier-cours-session/planifier-cours-session.component';
import { FormAjoutSessionComponent } from './planifier-cours-session/form-ajout-session/form-ajout-session.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { PlanifierCoursComponent } from './planifier-cours/planifier-cours.component';
import { ListComponent } from './planifier-cours/list/list.component';
import { authentificationGuard } from './guards/authentification.guard';
import { ListClasseComponent } from './planifier-cours/classes/list-classe/list-classe.component';
import { PlanningComponent } from './planifier-cours/planning/planning.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { AttacheComponent } from './attache/attache.component';



const routes: Routes = [
  { path: "login", component: AuthentificationComponent },
  { path: "", component: AuthentificationComponent },
  { path: "cour", component: PlanifierCoursComponent, },
  { path: "prof", component: ProfesseurComponent, },
  { path: "listCours", component: ListComponent },
  { path: "session", component: PlanifierCoursSessionComponent },
  { path: 'ajoutSession', component: FormAjoutSessionComponent },
  { path: "listClasse", component: ListClasseComponent },
  { path: "planning", component: PlanningComponent },
  { path: "attache", component: AttacheComponent }
  // {
  //   path:"connection" ,component:PlanifierCoursComponent,canActivate:[authentificationGuard],children:[
  //     {
  //       path:"cour",component:PlanifierCoursComponent,

  //     },
  //     // {
  //     //   path: "planning", component: NavBarComponent,
  //     // },
  //     {
  //       path:"listCours",component:ListComponent
  //     },
  //     {
  //       path: "session", component: PlanifierCoursSessionComponent
  //     },
  //     { path: 'ajoutSession', component: FormAjoutSessionComponent },
  //     {path: "listClasse",component:ListClasseComponent},
  //     {path:"planning",component:PlanningComponent}
  //   ]
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
