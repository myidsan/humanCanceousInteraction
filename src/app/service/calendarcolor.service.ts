
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
  public curr_month = new Date().getMonth();
  public selected_month = this.curr_month;



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



  update_days_to_work(ms: Milestone, direction?: number) {
    for (let i = 1; i <= 31; i++) {
      if (ms.calender[i] !== null) {
        document.getElementById(`${i}`).classList.remove('active');
        document.getElementById(`${i}`).style['background-color'] = 'aliceblue';
        document.getElementById(`${i}`).style['color'] = 'black';
      }
    }



    for (let i = 0; i < ms.days.length; i++) {
      console.log(ms.days.length);
      let class_one = ms.days[i];
      let classes_one = document.querySelectorAll(`.${class_one}`) as HTMLCollectionOf<HTMLElement>;

      for (let j = 0; j < classes_one.length; j++) {
        if (Number(classes_one[j].innerHTML) >= this.today_date) {
          console.log(classes_one[j].innerHTML);
          classes_one[j].classList.add('active');
          classes_one[j].style.backgroundColor = 'white';
        }
      }
    }

    for (let i = (new Date(ms.startDate)).getDate(); i <= (new Date(ms.endDate)).getDate(); i++) {
      console.log(i);
      if (ms.calender[i] === 2) {
        // document.getElementById(`${i}`).style['background-color'] = 'limegreen';
        this.complete(ms);
      } else if (ms.calender[i] === 3) {
        // document.getElementById(`${i}`).style['background-color'] = 'tomato';
        this.incomplete();
      }
    }
  }

  constructor(private msStore: MilestoneStoreService) {
    this.selected_month = this.curr_month;
  }

}
