import { Component, OnInit } from '@angular/core';
import { DayView } from '../../models/Calendar';
import { CalendarEvent } from '../../models/CalendarEvent';
import { FormattingService } from '../../services/formatting.service';
import { tap } from 'rxjs/operators';
import { CalendarDay } from '../../models/CalendarDay';
import { CommonModule } from '@angular/common';
import { EventDisplayComponent } from '../shared/event-display/event-display.component';
import { ViewBaseComponent } from '../shared/view-base/view-base.component';
import { AllDayEventPipe } from '../../pipes/all-day-event.pipe';

@Component({
    selector: 'day-view',
    standalone: true,
    imports: [CommonModule, EventDisplayComponent, AllDayEventPipe],
    templateUrl: './day-view.component.html',
    styleUrls: ['./day-view.component.scss']
})
export class DayViewComponent extends ViewBaseComponent implements OnInit {
    dayView = {} as DayView;

    constructor(
        formattingService: FormattingService
    ) {
        super(formattingService);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.generateView();

        this.subscriptions$.add(
            this.events$.pipe(
                tap(events => {
                    this.events = events;
                    this.generateView();
                })
            ).subscribe()
        );
    }

    generateView(): void {
        if (this.selectedDate) {
            const emptyDay = this.generateDays();
            this.populateDayView(emptyDay);
        }
    }

    populateDayView(emptyDay: CalendarDay): void {
        const populatedDay: CalendarDay = emptyDay;

        const events = this.events.filter((event: CalendarEvent) => {
            return this.isSameDay(populatedDay.date, event.startTime, event.endTime);
            }).map((event: CalendarEvent) => {
                return this.populateEvents(event, populatedDay);
            }).sort((a: CalendarEvent, b: CalendarEvent) => {
                return this.sortByTime(a, b);
            });

        populatedDay.events = events;

        this.dayView = this.createEventGroups(populatedDay);
    }

    generateDays(): CalendarDay {
        const date = new Date(this.selectedDate);

        const day: CalendarDay = new CalendarDay({
            date,
            eventGroups: [],
            events: [],
            eventCount: 0
        });

        return day;
    }
}
