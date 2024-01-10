import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { Session } from 'src/app/interfaces/model';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  @Input() sessions: Session[] = []

  viewDate: Date = new Date();

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  events: CalendarEvent[] = [];

  refresh = new Subject<void>()

  activeDayIsOpen: boolean = false

  constructor() {
    // const event1 = {
    //   title: "Cours de tennis",
    //   start: new Date("2023-10-12T10:30"),
    //   end: new Date("2023-10-12T17:30"),
    //   draggable: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   }
    // }
    //this.events.push(event1);
    //this.getEvent();
  }
  ngOnInit(): void {
    this.getEvent();
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    } this.viewDate = date;
  }
  eventClicked(event: any) {
    console.log(event);
  }

  eventTimesChanged(event: any) {
    //console.log(event);
    event.event.start = event.newStart;
    event.event.end = event.newEnd;
    this.refresh.next();
  }
  getEvent() {
    const colors = ['bg-blue-500', 'bg-green-500',];
    this.sessions.forEach(element => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      const colorClass = colors[randomIndex];
      const title = `
      
      <div>Classe : ${element.cour.classe.nom}</div>
      <div>Prof : ${element.cour.prof.nom} ${element.cour.prof.prenom}</div>
      <div>Module : ${element.cour.module.libelle}</div>
    `;
      const event = {
        title: title,
        colorClass:colorClass,
        start: new Date(`${this.formatDate(element.dateCours)}T${this.formatTime(element.hDedut)}`),
        end: new Date(`${this.formatDate(element.dateCours)}T${this.formatTime(element.hFin)}`)
      }
      this.events.push(event);
    });
  }
  formatDate(date: string) {
    const date1 = new Date(date)
    return date1.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
  formatTime(time: string) {
    const length = time.length;
    return time.substring(0, length - 3)
  }



  // getEvent(){
  //   this.sessions.forEach(element => {
  //   //  console.log(element.cour.classe.nom);
  //     const event = {
  //      title:"Classe :"+element.cour.classe.nom,
  //      start:new Date(`${element.dateCours}T${element.hDedut}`),
  //      end:new Date(`${element.dateCours}T${element.hFin}`)
  //     }
  //     console.log();

  //     this.events.push(event);
  //    // console.log(event);

  //   });
  // }
}
