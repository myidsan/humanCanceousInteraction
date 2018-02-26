import { Injectable } from '@angular/core';

import { CalendarComponent } from '../dashboard/calendar/calendar.component';
import { SideboardComponent } from '../dashboard/sideboard/sideboard.component';
import { Milestone } from '../model/milestone';
import { MilestoneStoreService } from './milestone-store.service';

@Injectable()
export class CalendarcolorService {

  // returns the weekday as a number
  public today = new Date().getDay(); // 5 = saturday
  public today_date = new Date().getDate();

  complete(ms) {
    const d = new Date();
    document.getElementById(d.getDate().toString()).classList.add('active');
    document.getElementById(d.getDate().toString()).style['background-color'] = 'limegreen';
    document.getElementById(d.getDate().toString()).style['color'] = 'white';
  }

  incomplete() {
   const d = new Date();
    document.getElementById(d.getDate().toString()).classList.add('active');
    document.getElementById(d.getDate().toString()).style['background-color'] = 'tomato';
    document.getElementById(d.getDate().toString()).style['color'] = 'white';
  }

  update_days_to_work(ms) {
    for (let i = 1; i < 29; i++) {
      if (ms.calender[i] !== null) {
        document.getElementById(`${i}`).classList.remove('active');
        document.getElementById(`${i}`).style['background-color'] = 'transparent';
        document.getElementById(`${i}`).style['color'] = '#777';
      }
    }
    for (let i = 1; i <= (new Date(ms.endDate)).getDate(); i++) {
      // check if it not 0 and if today is selected day of milestone
      // currently hardcoded for Feb
      if (ms.calender[i] !== 0 && ((ms.daysBool[(i + 3) % 7] ) === true)) {
        document.getElementById(`${i}`).classList.add('active');
        document.getElementById(`${i}`).style['background-color'] = 'white';
      }
    }
    for (let i = 1; i <= (new Date(ms.endDate)).getDate(); i++) {
      if (ms.calender[i] === 2) {
        // document.getElementById(`${i}`).style['background-color'] = 'limegreen';
        this.complete(ms);
      } else if (ms.calender[i] === 3) {
        // document.getElementById(`${i}`).style['background-color'] = 'tomato';
        this.incomplete();
      }
    }
  }

  constructor(private msStore: MilestoneStoreService) { }

}
