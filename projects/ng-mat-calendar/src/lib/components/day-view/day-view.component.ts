import {
    Component,
    DoCheck,
    IterableDiffers,
    KeyValueDiffers,
    OnInit
} from '@angular/core';

import { BaseViewComponent } from '../shared/base-view/base-view.component';
import { CalendarDay, DayView } from '../../models/Calendar';
import { CalendarEvent } from '../../models/CalendarEvent';

import { isSameDay } from 'date-fns';
import { FormattingService } from '../../services/formatting.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'day-view',
    templateUrl: './day-view.component.html',
    styleUrls: ['./day-view.component.scss']
})
export class DayViewComponent extends BaseViewComponent implements OnInit {
    dayView = {} as DayView;

    constructor(
        formattingService: FormattingService
    ) {
        super(formattingService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.initView();

        this.subscriptions$.add(
            this.events$.pipe(
                tap(events => {
                    this.events = events;
                    this.generateView();
                })
            ).subscribe()
        );
    }

    initView(): void {
        this.markerPosition = this.calculateMarkerPosition();

        if (this.options && this.events) {
            this.pixelsPerHour = this.options.getPixelsPerMinute * 60;

            this.generateView();
        }
    }

    generateView(): void {
        if (this.selectedDate) {
            const date = new Date(this.selectedDate);

            this.dayView = {
                date,
                eventGroups: [],
                events: [],
            };

            const emptyDay = this.generateDays();
            this.populateDayView(emptyDay);

            console.log(this.dayView, this.events);
        }
    }

    populateDayView(emptyDay: CalendarDay): void {
        const populatedDay: CalendarDay = emptyDay;

        const events = this.events.filter((event: CalendarEvent) => {
                return isSameDay(new Date(populatedDay.date), new Date(event.startTime)) ||
                    isSameDay(new Date(populatedDay.date), new Date(event.endTime));
            }).map((event: CalendarEvent) => {
                return this.populateEvents(event, populatedDay);
            }).sort((a: CalendarEvent, b: CalendarEvent) => {
                return a.startTime.getTime() - b.startTime.getTime();
            });

        populatedDay.events = events;

        this.dayView = this.createEventGroups(populatedDay);
    }

    generateDays(): CalendarDay {
        const date = new Date(this.selectedDate);

        const day: CalendarDay = {
            date,
            eventGroups: [],
            events: []
        };

        return day;
    }
}
