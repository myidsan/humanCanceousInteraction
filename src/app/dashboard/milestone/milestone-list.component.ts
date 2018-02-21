import { Component, OnInit, Input } from '@angular/core';
import { Milestone } from '../../model/milestone';
import { MilestoneStoreService } from '../../service/milestone-store.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-milestone-list',
  templateUrl: './milestone-list.component.html',
  styleUrls: ['./milestone-list.component.css']
})
export class MilestoneListComponent implements OnInit {
  bar_color = 'primary';
  mode = 'determinate';
  public msStoreList = this.msStore.milestones;

  constructor(public msStore: MilestoneStoreService,
              public router: Router) { }


  deletemilestone(ms) {
    return this.msStore.deletemilestone(ms);
  }

  emitMilestone(ms) {
    this.msStore.calendarMilestone = ms;
    this.msStore.getDisplayName();
    this.msStore.obs_milestones.subscribe(((val) => {
      this.msStoreList = val;
    }))
  }

  editmilestone(ms) {
    this.msStore.editdecide = true;
    this.msStore.tempms = ms;
    this.router.navigate(['/newmilestone']);
  }

  get_milestone() {
    this.msStoreList = this.msStore.milestones;
  }

  ngOnInit() {
    this.get_milestone();
  }
}
