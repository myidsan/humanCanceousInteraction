export interface Calendar {
  ms_id: number;
  ms_name: string;
  days: string[];     // list of completed days
  completed: boolean[];
}

export class CalendarMaker implements Calendar {
  constructor(public ms_id: number, public ms_name: string, public days: string[], public completed: boolean[]) { }
}
