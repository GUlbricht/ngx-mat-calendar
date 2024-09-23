import { CalendarEvent } from "ngx-mat-calendar";

type Modify<T, R> = Omit<T, keyof R> & R;

export interface DummyCalendarEvent extends Modify<CalendarEvent, { startTime: any, endTime: any }> {
    offsetStart: number;
    offsetEnd?: number;
}
