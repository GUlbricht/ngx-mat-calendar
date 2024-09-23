import { CalendarEvent } from './CalendarEvent';

export class CalendarDay {
    date: Date = new Date();
    eventGroups: string[] = [];
    events: CalendarEvent[] = [];
    eventCount = 0;

    constructor(init?: Partial<CalendarDay>) {
        Object.assign(this, init);
    }
}
