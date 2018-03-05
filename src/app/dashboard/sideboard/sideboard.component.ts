import { AfterViewInit, Component, OnInit} from '@angular/core';
import { MilestoneStoreService } from '../../service/milestone-store.service';
import { Milestone } from '../../model/milestone';
import { CalendarcolorService } from '../../service/calendarcolor.service';


@Component({
  selector: 'app-sideboard',
  templateUrl: './sideboard.component.html',
  styleUrls: ['./sideboard.component.css']
})
export class SideboardComponent implements OnInit, AfterViewInit {
  public msStoreList = this.msStore.milestones;

  // returns the weekday as a number
  public today = new Date().getDay(); // 5 = saturday
  public today_date = new Date().getDate();
  public today_month = new Date().getMonth();




  constructor(public msStore: MilestoneStoreService,
              public calColor: CalendarcolorService) { }


  doChecker() {
    for (let i = 0; i < this.msStoreList.length; i++) {
      if (this.msStoreList[i].daysBool[this.today]) {

        let startDate = new Date(this.msStoreList[i].startDate).getDate();
        let endDate = new Date(this.msStoreList[i].endDate).getDate();

        let startMonth = new Date(this.msStoreList[i].startDate).getMonth();
        let endMonth = new Date(this.msStoreList[i].endDate).getMonth();

        if(Number(this.today_month) < Number(startMonth)){
          continue;
        }
        else if ((Number(this.today_month) == Number(startMonth)) && (Number(this.today_date) < Number(startDate))){
          continue;
        }
        else{
          this.msStoreList[i].shouldDo = true;
        }
      }
    }
  }

  display_complete(i) {
    document.getElementById('milestone-box-' + `${i}`).style['background-color'] = 'limegreen';
    document.getElementById('milestone-box-' + `${i}`).style.width = '8rem';
    document.getElementById('yes-btn-' + `${i}` ).style.display = 'none';
    document.getElementById('no-btn-' + `${i}`).style.display = 'none';
  }
  complete(i) {
    this.display_complete(i);
    this.msStoreList[i].calender[this.today_date] = 2;
    this.msStore.progress_val_updated = false;
    this.msStore.update_progress_value(this.msStore.milestones[i]);
    this.calColor.complete(this.msStore[i]);
    this.msStoreList[i].modified = true;
  }

  display_incomplete(i) {
    document.getElementById('milestone-box-' + `${i}`).style['background-color'] = 'tomato';
    document.getElementById('milestone-box-' + `${i}`).style.width = '8rem';
    document.getElementById('yes-btn-' + `${i}`).style.display = 'none';
    document.getElementById('no-btn-' + `${i}`).style.display = 'none';
  }
  incomplete(i) {
    this.display_incomplete(i);
    this.msStoreList[i].calender[this.today_date] = 3;
    this.calColor.incomplete();
    this.msStoreList[i].modified = true;
  }

  ngAfterViewInit() {
    for (let i = 0; i < this.msStore.milestones.length; i++) {
      if (this.msStore.milestones[i].modified === true) {
        if (this.msStore.milestones[i].calender[this.today_date] === 2) {
          this.display_complete(i);
        } else if (this.msStore.milestones[i].calender[this.today_date] === 3) {
          this.display_incomplete(i);
        }
      }
    }
  }

  ngOnInit() {
    this.doChecker();
    this.msStore.obs_milestones.subscribe(((val) => {
      this.msStoreList = val;
    }));
  }
}
