import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from '../models/CalendarEvent';

@Pipe({
    name: 'allDayEventPipe',
    standalone: true
})
export class AllDayEventPipe implements PipeTransform {
    transform(items: CalendarEvent[], allDay: boolean): CalendarEvent[] {
        if (allDay) {
            return items.filter(item => item.allDay);
        }

        return items.filter(item => !item.allDay);
    }
}
