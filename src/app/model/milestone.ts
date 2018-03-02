// export class Milestone {
//   constructor(public name: string, public days: number[], progressValue = 0) {}
// }
//
// export class MilestoneMaker {
//   static create(event: Milestone) {
//     return new Milestone(event.name, event.days);
//   }
// }


export interface Milestone {
  id: number;
  name: string;
  days: string[];
  daysBool: boolean[]; // weekdays
  startDate: string;
  endDate: string;
  progressValue: number;
  calender: number[];
  shouldDo?: boolean;
  modified: boolean;
  days_to_do: number[];
}

export class MilestoneMaker implements Milestone {
  constructor(public id: number,
              public name: string,
              public days: string[],
              public daysBool: boolean[],
              public startDate: string,
              public endDate: string,
              public progressValue: number,
              public calender: number[],
              public shouldDo = false,
              public modified = false,
              public days_to_do: number[]) { }
}
