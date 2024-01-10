import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PlanifierCoursComponent } from './planifier-cours/planifier-cours.component';
import { FormComponent } from './planifier-cours/form/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './planifier-cours/list/list.component';
import { PlanifierCoursSessionComponent } from './planifier-cours-session/planifier-cours-session.component';
import { FormAjoutSessionComponent } from './planifier-cours-session/form-ajout-session/form-ajout-session.component';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule, DatePipe } from '@angular/common';
import { PlanningComponent } from './planifier-cours/planning/planning.component';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ClassesComponent } from './planifier-cours/classes/classes.component';
import { ListClasseComponent } from './planifier-cours/classes/list-classe/list-classe.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { ListeEtudiantComponent } from './planifier-cours/liste-etudiant/liste-etudiant.component';
import { AuthentificateInterceptorProvider } from './authentificate.interceptor';
import { AccepteOuAnnulerComponent } from './planifier-cours/accepte-ou-annuler/accepte-ou-annuler.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { AttacheComponent } from './attache/attache.component';

registerLocaleData(localeFr, 'fr')

class CustomDateFormatter extends CalendarNativeDateFormatter {

  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' }).format(date);
  }
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' }).format(date);
  }
}



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PlanifierCoursComponent,
    FormComponent,
    PlanningComponent,
    FormAjoutSessionComponent,
    PlanifierCoursSessionComponent,
    ClassesComponent,
    ListClasseComponent,
    AuthentificationComponent,
    ListComponent,
    ProfesseurComponent,
    ListeEtudiantComponent,
    AccepteOuAnnulerComponent,
    AttacheComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    SweetAlert2Module,
    NgxPaginationModule
  ],
  providers: [
    AuthentificateInterceptorProvider,
    DatePipe,
    {provide:CalendarDateFormatter,useClass: CustomDateFormatter},
    // { provide: HTTP_INTERCEPTORS, useClass: AuthentificateInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
