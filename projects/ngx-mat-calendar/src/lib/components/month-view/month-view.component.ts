import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  add,
  eachWeekOfInterval,
  endOfMonth,
  format,
  getWeek,
  getWeekOfMonth,
  isSameMonth,
  startOfMonth,
  sub,
} from 'date-fns';
import { fromEvent, interval, Subject } from 'rxjs';
import { takeUntil, tap, throttle } from 'rxjs/operators';
import { MonthView } from '../../models/Calendar';
import { CalendarDay } from '../../models/CalendarDay';
import { CalendarEvent } from '../../models/CalendarEvent';
import { NEXT, PREVIOUS } from '../../models/Directions';
import { daysOfWeek, Times } from '../../models/Times';
import { FormattingService } from '../../services/formatting.service';
import { ViewBaseComponent } from '../shared/view-base/view-base.component';
import { CommonModule } from '@angular/common';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { EventDisplayComponent } from '../shared/event-display/event-display.component';
import { LimitPipe } from '../../pipes/limit.pipe';

@Component({
  selector: 'month-view',
  standalone: true,
  imports: [CommonModule, OverlayModule, EventDisplayComponent, LimitPipe],
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss'],
})
export class MonthViewComponent
  extends ViewBaseComponent
  implements OnInit, OnDestroy
{
  @Output() setCalendarOffset = new EventEmitter<string>();

  monthView = {} as MonthView;
  daysOfWeek = daysOfWeek;
  dayBlockHeight = 0;
  weekNumbers: number[] = [];
  showHiddenEvents = false;
  hiddenEventsTriggerOrigin: CdkOverlayOrigin;
  hiddenEventsDay: CalendarDay;
  maxEventsVisible = 0;
  observer: MutationObserver;

  scrollListener = new Subject();
  scrollListener$ = this.scrollListener.asObservable();

  @ViewChild('calendarDayElement', { read: ElementRef, static: true })
  calendarDayElement: ElementRef;
  @HostListener('window:resize', ['$event']) onResize(): void {
    this.calculateMaxEventsPerDay();
  }

  constructor(formattingService: FormattingService) {
    super(formattingService);

    fromEvent<WheelEvent>(window, 'wheel')
      .pipe(
        takeUntil(this.scrollListener$),
        throttle(() => interval(1000))
      )
      .subscribe((e: WheelEvent) => this.handleScroll(e));

    this.hiddenEventsDay = new CalendarDay();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.generateView();
    this.listenToCalendarViewportChanges();

    this.subscriptions$.add(
      this.events$
        .pipe(
          tap((events) => {
            this.events = events;
            this.generateView();
          })
        )
        .subscribe()
    );

    this.subscriptions$.add(
      this.selectedDate$
        .pipe(
          tap(() => {
            this.closeHiddenEvents();
          })
        )
        .subscribe()
    );
  }

  listenToCalendarViewportChanges(): void {
    this.observer = new MutationObserver(() => {
      this.calculateMaxEventsPerDay();
    });

    this.observer.observe(this.calendarDayElement.nativeElement, {
      childList: true,
    });
  }

  generateView(): void {
    if (this.selectedDate) {
      const emptyDays = this.generateDays();
      this.populateMonthView(emptyDays);
      this.getWeekNumbers();

      this.calculateMaxEventsPerDay();
    }
  }

  getWeekNumbers(): void {
    const weeksOfMonth = eachWeekOfInterval({
      start: startOfMonth(this.selectedDate),
      end: endOfMonth(this.selectedDate),
    });

    this.weekNumbers = [];
    weeksOfMonth.forEach((week) => {
      this.weekNumbers.push(getWeek(week, { weekStartsOn: 1 }));
    });
  }

  populateMonthView(emptyDays: CalendarDay[]): void {
    const populatedDays: CalendarDay[] = emptyDays;

    populatedDays.forEach((day) => {
      day.events = this.events
        .filter((event: CalendarEvent) => {
          return this.isSameDay(day.date, event.startTime, event.endTime);
        })
        .map((event: CalendarEvent) => {
          return this.populateEvents(event, day);
        })
        .sort((a: CalendarEvent, b: CalendarEvent) => {
          return this.sortByTime(a, b);
        })
        .sort((event) => {
          return this.sortByAllDay(event);
        });

      day = this.createEventGroups(day);
      day.eventCount = day.events.length;
    });

    this.monthView.days = populatedDays;
  }

  generateDays(): CalendarDay[] {
    const dayOfWeek = add(startOfMonth(this.selectedDate), {
      days: 7,
    }).getDay();
    const selectedMonthStart = sub(startOfMonth(this.selectedDate), {
      days: dayOfWeek - 1,
    });
    const days = [];

    for (let i = 0; i < 35; i++) {
      let date = new Date(selectedMonthStart);
      date = add(date, { days: i });

      const day: CalendarDay = {
        date,
        eventGroups: [],
        events: [],
        eventCount: 0,
      };

      days.push(day);
    }

    return days;
  }

  isCurrentMonth(date: Date): boolean {
    return isSameMonth(date, this.selectedDate);
  }

  handleScroll(e: WheelEvent): void {
    if (e.deltaY > 0) this.setCalendarOffset.emit(NEXT);
    else this.setCalendarOffset.emit(PREVIOUS);
  }

  toggleHiddenEvents(
    hiddenEventsTriggerOrigin: CdkOverlayOrigin,
    day: CalendarDay
  ): void {
    this.hiddenEventsTriggerOrigin = hiddenEventsTriggerOrigin;
    this.hiddenEventsDay = day;
    this.showHiddenEvents = !this.showHiddenEvents;
  }

  closeHiddenEvents(): void {
    this.showHiddenEvents = false;
  }

  getHiddenEventsHeight(): number {
    return this.hiddenEventsDay.eventCount * 30 + 85;
  }

  calculateMaxEventsPerDay(): void {
    const dayBlockHeight =
      this.calendarDayElement.nativeElement.children[0]?.getBoundingClientRect()
        .height;
    this.maxEventsVisible = Math.floor((dayBlockHeight - 25) / 30);
  }

  weekDayIsToday(day: Times): boolean {
    const isFirstWeekOfMonth =
      getWeekOfMonth(this.selectedDate) === 1 &&
      day.title === format(this.selectedDate, 'E') &&
      this.isToday(this.selectedDate);

    return isFirstWeekOfMonth;
  }

  override ngOnDestroy(): void {
    this.scrollListener.next(null);
    this.observer.disconnect();
  }
}
