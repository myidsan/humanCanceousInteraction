import { Injectable } from '@angular/core';
import { Milestone } from '../model/milestone';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class MilestoneStoreService {
  milestones: Milestone[] = [];
  obs_milestones = new BehaviorSubject<Array<Milestone>>(this.milestones);
  public readonly mstones: Observable<Array<Milestone>> = this.obs_milestones.asObservable();
  private _observer: Observer<Milestone[]>;
  calendarMilestone: Milestone;
  calendarMilestoneName = '';
  tempms: Milestone = null;
  editdecide = false;

  getDisplayName() {
    this.calendarMilestoneName = this.calendarMilestone.name;
    // return this.calendarMilestoneName;
  }

  array_sorter(prev_arr) {
    // let new_arr = this.milestones.filter(function(n) { return (n !== (null || undefined)); });
    let new_arr = [];
    new_arr = prev_arr.filter(function(e) { return e; });
    console.log(new_arr);
    console.log('arr_sorter: ' + new_arr.length);
    for (let i = 0; i < new_arr.length; i++) {
      new_arr[i].id = i;
    }
    this.milestones = new_arr;
    this.obs_milestones.next(new_arr);
    console.log(this.milestones);
  }

  addmilestone(ms) {
    // this.indexChecker(ms);
    if (this.milestones[ms.id] !== null) {
      this.milestones[ms.id] = ms;
    } else {
      // this.array_sorter();
      this.milestones.push(ms);
    }
    this.array_sorter(this.milestones);
  }

  deletemilestone(ms) {
    for (let i = 0; i < this.milestones.length; i++) {
      if (ms.id === this.milestones[i].id) {
        this.milestones[i] = null;
        break;
        // return;
      }
      console.log('broke');
    }
    this.array_sorter(this.milestones);
  }

  constructor() { }
}
