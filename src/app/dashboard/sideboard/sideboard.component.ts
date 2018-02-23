import { Component, OnInit } from '@angular/core';
import { MilestoneStoreService } from '../../service/milestone-store.service';
import { Milestone } from '../../model/milestone';
import * as firebase from 'firebase';
import { CalendarcolorService } from '../../service/calendarcolor.service';


@Component({
  selector: 'app-sideboard',
  templateUrl: './sideboard.component.html',
  styleUrls: ['./sideboard.component.css']
})
export class SideboardComponent implements OnInit {
  public msStoreList = this.msStore.milestones;
  checklist: number[] = [];
  // shouldDo = false;

  // returns the weekday as a number
  public today = new Date().getDay(); // 5 = saturday


  constructor(public msStore: MilestoneStoreService,
              public calColor: CalendarcolorService) { }

  doChekcer() {
    for (let i = 0; i < this.msStoreList.length; i++) {
      if (this.msStoreList[i].daysBool[this.today]) {
        this.msStoreList[i].shouldDo = true;
        this.sendEmail();
      }
    }
  }

  sendEmail(){
    console.log(firebase.auth().currentUser.email);
  }


  complete(i) {
    document.getElementById('milestone-box-'+`${i}`).style['background-color'] = 'limegreen';
    document.getElementById('yes-btn-'+`${i}` ).style.display = 'none';
    document.getElementById('no-btn-'+`${i}`).style.display = 'none';
    document.getElementById('milestone-box-'+`${i}`).style.width = '8rem';
    this.calColor.complete();
  }

  incomplete(i) {
    document.getElementById('milestone-box-'+`${i}`).style['background-color'] = 'tomato';
    document.getElementById('yes-btn-'+`${i}`).style.display = 'none';
    document.getElementById('no-btn-'+`${i}`).style.display = 'none';
    document.getElementById('milestone-box-'+`${i}`).style.width = '8rem';
    this.calColor.incomplete();
  }

  ngOnInit() {
    this.doChekcer();

  }

}
