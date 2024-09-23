import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from '../models/CalendarEvent';

@Pipe({
    name: 'limitPipe',
    standalone: true
})
export class LimitPipe implements PipeTransform {
    transform(items: CalendarEvent[], limit: number): CalendarEvent[] {
        return items.slice(0, limit);
    }
}
