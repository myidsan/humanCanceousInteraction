import { Component, OnInit } from '@angular/core';
import { Milestone } from '../model/milestone';
import { Router } from '@angular/router';
import { MilestoneStoreService } from '../service/milestone-store.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  msLists = this.msStore.milestones;

  constructor(public msStore: MilestoneStoreService,
              public router: Router,
              public authservice: AuthService) { }


  gotoMsPage() {
    this.router.navigate(['newmilestone']);
  }

  logout() {
    this.authservice.signOut();
  }

  ngOnInit() {

  }

}
