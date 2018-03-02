import {Component, OnInit, AfterContentChecked, AfterViewInit} from '@angular/core';
import { Milestone } from '../../model/milestone';
import { MilestoneStoreService } from '../../service/milestone-store.service';
import { Observable } from 'rxjs/Observable';
import {Calendar, CalendarMaker} from '../../model/calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit, AfterContentChecked, AfterViewInit {
  public milestonelist = this.msStore.milestones;
  public calendarMilestone = this.msStore.calendarMilestone;
  public displayMilestoneName = '';
  public curr_month: Calendar;
  public today = new Date();

  get_this_month() {
    this.curr_month.month = this.today.getMonth();
    console.log(this.today.getMonth());
  }

  getName() {
    this.displayMilestoneName = this.msStore.calendarMilestoneName;
  }

  ngAfterContentChecked() {
    this.getName();
  }

  constructor(public msStore: MilestoneStoreService) { }

  getColor(d) {
    document.getElementById(d.getDate().toString()).classList.add('active');
  }

  prev_month() {

  }

  next_month() {

  }

  ngAfterViewInit() {
    // this.get_this_month();
  }

  ngOnInit() {
    if (this.displayMilestoneName !== null) {
      this.calendarMilestone = this.msStore.calendarMilestone;
    }

    this.curr_month = new CalendarMaker(this.today.getMonth(), []);

    const d = new Date();
    this.getColor(d);
    this.get_this_month();
  }
}
