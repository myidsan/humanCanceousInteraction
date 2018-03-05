export interface Calendar {
  // ms_id: number;
  // ms_name: string;
  // days: string[];     // list of completed days
  // completed: boolean[];
  month: number;
  days_in_month: number[];
  months?: string[];
}

export class CalendarMaker implements Calendar {
  // constructor(public ms_id: number, public ms_name: string, public days: string[], public completed: boolean[]) { }
  constructor(public month: number, public days_in_month: number[], public months = ['January', 'Feb', 'Mar' , 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']) {}
}
