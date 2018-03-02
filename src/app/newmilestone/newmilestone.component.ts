import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MilestoneStoreService } from '../service/milestone-store.service';
import { Milestone, MilestoneMaker } from '../model/milestone';
import {isDate, log} from 'util';

@Component({
  selector: 'app-newmilestone',
  templateUrl: './newmilestone.component.html',
  styleUrls: ['./newmilestone.component.css']
})
export class NewmilestoneComponent implements OnInit {
  id = 0;
  title = '';
  mon = false;
  tue = false;
  wed = false;
  thurs = false;
  fri = false;
  sat = false;
  sun = false;
  daysBool: boolean[] = [this.sun, this.mon, this.tue, this.wed, this.thurs, this.fri, this.sat];
  days: string[] = [];
  startDate = '';
  endDate = '';
  dayseum = {0: 'sun', 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thurs', 5: 'fri', 6: 'sat'};
  days_to_work: number[] = [];
  days_to_do: number[] = [];

  email = '';
  today = new Date();

  constructor(public msStore: MilestoneStoreService,
              public router: Router) { }

  public ms = new MilestoneMaker( this.id, this.title, this.days, this.daysBool,
                                 this.startDate, this.endDate, 0, this.days_to_work, false, false, []);


  freqCheck() {
    this.daysBool[0] = this.sun;
    this.daysBool[1] = this.mon;
    this.daysBool[2] = this.tue;
    this.daysBool[3] = this.wed;
    this.daysBool[4] = this.thurs;
    this.daysBool[5] = this.fri;
    this.daysBool[6] = this.sat;

    for (let i = 0; i < this.daysBool.length; i++) {
      if (this.daysBool[i]) {
        this.days.push(this.dayseum[i]);
      }
    }
  }

  mark_days_to_do() {
    for (let i = 0; i < 35; i++) {
      if (this.daysBool[i % 7] === true && i > this.today.getDate()) {
        this.days_to_do.push(i);
      }
    }
  }

  check_days_to_work() {
    console.log(typeof(this.today.getDate()));
    for (let i = this.today.getDate(); i < 31; i++) {
      // document.getElementById(`${i}`).classList.add('active'); // this needs to added to the service
      // need to check for specific weekdays
      // pass for now
      this.days_to_work[i] = 1;
    }
  }

  init_days_to_work() {
    for (let i = 0; i < 31; i++) {
      this.days_to_work[i] = 0;
    }
  }

  assignNumber() {
    this.ms.id = this.msStore.milestones.length;
  }

  saveMilestone() {
    this.check_days_to_work();
    this.freqCheck();
    if (this.title === '') {
      alert('A name for the milestone is required.');
      this.days = [];
      return 0;
    }
    // date input should not be empy
    // startdate must be prior to end date
    if (this.startDate === '' || this.endDate === '' || this.endDate < this.startDate) {
      alert('Check your date.');
      this.days = [];
      return 0;
    }

    // make sure start date to end date includes the days you picked to work.

    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let daysi = ['sun', 'mon', 'tue', 'wed', 'thurs', 'fri','sat'];
    let startDayStr = String(this.startDate).split(" ", 1)[0];
    let endDayStr = String(this.endDate).split(" ", 1)[0];

    const starting = new Date(this.startDate);
    const ending = new Date(this.endDate);

    if (ending.getDate() - starting.getDate() < 6){
      if (days.indexOf(startDayStr) < days.indexOf(endDayStr)){
        let term = [];
        for (let i = days.indexOf(startDayStr); i <= days.indexOf(endDayStr); i++){
          term.push(i);
        }
        for (let i of this.days){
          let check = daysi.indexOf(i);
          if (term.indexOf(check) == -1){
            alert('Selected days are out of milestone duration range.');
            this.days = [];
            return 0;
          }
        }
      }
      else if (days.indexOf(startDayStr) > days.indexOf(endDayStr)){
        let term = [];
        for (let i = days.indexOf(endDayStr) +1; i < days.indexOf(startDayStr); i++){
          term.push(i);
        }
        for (let i of this.days){
          let check = daysi.indexOf(i);
          if (term.indexOf(check) !== -1) {
            alert('Check the days you want to work.');
            this.days = []
            return 0;
          }
        }
      }
      else {
        console.log("case3");
        for (let i of this.days) {
          let check = daysi.indexOf(i);
          if (check !== days.indexOf(startDayStr)) {
            alert('Check the days you want to work.');
            this.days = [];
            return 0;
          }
        }
      }
    }

    // date should be in date format
    if ( !(isDate(this.startDate) && isDate(this.endDate)) ) {
      alert('Choose a date.');
      this.days = [];
      return 0;
    }

    if ( (this.today.getDate() === starting.getDate()) ) {}
    else if ((this.today.getTime() > starting.getTime())) {
      alert('Starting cannot be in past');
      this.days = [];
      return 0;
    }

    if ( this.today.getTime() > ending.getTime() ) {
      alert("Can't be done before today.");
      this.days = [];
      return 0;
    }
    if ( starting.getTime() > ending.getTime() ) {
      alert("Can't be done before you start.");
      this.days = [];
      return 0;
    }

    if ( !(this.daysBool[0] || this.daysBool[1] || this.daysBool[2] || this.daysBool[3] || this.daysBool[4] || this.daysBool[5] || this.daysBool[6]) ) {
      alert('Choose a day to work on the task.');
      this.days = [];
      return 0;
    }

    this.ms.name = this.title;
    this.ms.days = this.days;
    this.ms.startDate = starting.toString();
    this.ms.endDate = ending.toString();
    this.ms.daysBool = this.daysBool;
    this.msStore.addmilestone(this.ms);
    this.router.navigate(['/dashboard']);
  }
  cancel() {
    this.title = '';
    this.days = [];
    this.router.navigate(['/dashboard']);
  }

 /* mockupData() {
    this.ms = new MilestoneMaker(1, 'water', ['tue', 'sat'], [], '2018-02-17', '2018-02-26', 0);
    this.saveMilestone();
  }*/

  prepopulateFields(ms) {
    const starting = new Date(this.startDate);
    const ending = new Date(this.endDate);

    this.title = ms.name;
    this.startDate = this.startDate;
    this.endDate = this.endDate;
    this.sun = ms.daysBool[0];
    this.mon = ms.daysBool[1];
    this.tue = ms.daysBool[2];
    this.wed = ms.daysBool[3];
    this.thurs = ms.daysBool[4];
    this.fri = ms.daysBool[5];
    this.sat = ms.daysBool[6];
    this.ms.id = ms.id;
    this.ms.calender = ms.calender; // restore the sideboard value
    this.ms.modified = ms.modified;
    this.startDate = ms.startDate;
    this.endDate = ms.endDate;
  }

  ngOnInit() {
    if (this.msStore.editdecide) {
      this.msStore.editdecide = false;
      this.prepopulateFields(this.msStore.tempms);
      this.init_days_to_work();
    } else {
      this.assignNumber();
      this.init_days_to_work();
    }
  }
}
