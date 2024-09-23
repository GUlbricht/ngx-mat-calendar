import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { format, add, isToday, toDate } from 'date-fns';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import Calendar from './models/Calendar';
import { CalendarEvent } from './models/CalendarEvent';
import { CalendarOptions } from './models/CalendarOptions';
import { colors } from './models/Colors';
import { PREVIOUS, NEXT } from './models/Directions';
import {
  KEY_D,
  KEY_W,
  KEY_M,
  KEY_T,
  KEY_N,
  KEY_ARROWLEFT,
  KEY_ARROWRIGHT,
} from './models/KeyboardShortcuts';
import { Periods } from './models/Times';
import { Views, DAY, WEEK, MONTH } from './models/Views';
import { KeyboardShortcutDialogComponent } from './components/dialogs/keyboard-shortcut-dialog/keyboard-shortcut-dialog.component';
import { MonthViewComponent } from './components/month-view/month-view.component';
import { WeekViewComponent } from './components/week-view/week-view.component';
import { DayViewComponent } from './components/day-view/day-view.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ngx-mat-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatDatepickerModule,
    MonthViewComponent,
    WeekViewComponent,
    DayViewComponent,
    MatButtonModule,
  ],
  templateUrl: './ngx-mat-calendar.component.html',
  styleUrls: ['./ngx-mat-calendar.component.scss'],
})
export class NgxMatCalendarComponent implements OnInit, OnDestroy {
  options$ = new BehaviorSubject<CalendarOptions>(new CalendarOptions());
  events$ = new BehaviorSubject<CalendarEvent[]>([]);
  selectedDate$ = new BehaviorSubject<Date>(new Date());

  @Input()
  set options(options: CalendarOptions) {
    this.selectedView = options.view;
    this.dateAdapter.setLocale(options.locale);
    this.options$.next(options);
  }

  get options(): CalendarOptions {
    return this.options$.getValue();
  }

  @Input()
  set events(events: CalendarEvent[]) {
    this.parseEvents(events);
  }

  get events(): CalendarEvent[] {
    return this.events$.getValue();
  }

  @Input()
  set selectedDate(selectedDate: Date) {
    this.selectedDate$.next(selectedDate);
  }

  get selectedDate(): Date {
    return this.selectedDate$.getValue();
  }

  @Output() dateChange = new EventEmitter<Date>();
  @Output() eventClick = new EventEmitter<CalendarEvent>();
  @Output() addButtonClick = new EventEmitter<MouseEvent>();

  @ViewChild(MatMenuTrigger) datePickerMenu: MatMenuTrigger;
  @ViewChild(MatCalendar) matCalendar: MatCalendar<Date>;

  views: Views;
  selectedView: Views;
  calendar = {} as Calendar;
  today = format(new Date(), 'EEEE, d MMMM');

  private subscriptions$ = new Subscription();

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.handleKeyboardEvents(event);
  }

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscriptions$.add(
      this.selectedDate$
        .pipe(
          tap((selectedDate) => {
            if (this.matCalendar) {
              this.matCalendar.activeDate = selectedDate;
            }

            this.generateCalendar(selectedDate);
            this.dateChange.emit(selectedDate);
          })
        )
        .subscribe()
    );
  }

  generateCalendar(selectedDate: Date): void {
    if (selectedDate) {
      this.calendar = {
        monthAndYear: format(selectedDate, 'MMMM yyyy'),
        weeknumber: format(selectedDate, 'I'),
      };
    }
  }

  parseEvents(events: CalendarEvent[]): void {
    this.events$.next(
      events.map((event: CalendarEvent) => {
        event.date = new Date(event.date);
        event.startTime = new Date(event.startTime);
        event.endTime = new Date(event.endTime);
        event.color = event.color || colors.grey;

        return event;
      })
    );
  }

  isToday(date: Date): boolean {
    return isToday(date);
  }

  setCalendarToday(): void {
    this.selectedDate$.next(new Date());
  }

  setCalendarOffset(direction: string): void {
    const offset = Periods[this.selectedView];

    this.selectedDate$.next(
      add(this.selectedDate$.getValue(), {
        [offset]: direction === PREVIOUS ? -1 : 1,
      })
    );
  }

  setCalendar(date: Date): void {
    this.selectedDate$.next(date);
  }

  onViewChange(view: Views): void {
    this.selectedView = view;
  }

  changeToDayView(date: Date): void {
    this.selectedView = DAY;
    this.setCalendar(date);
  }

  getSelectedView(view: Views): boolean {
    return this.selectedView === view;
  }

  onEventClick(event: CalendarEvent): void {
    this.eventClick.emit(event);
  }

  onAddButtonClick(): void {
    this.addButtonClick.emit();
  }

  onDatePickerChange(date: Date): void {
    this.setCalendar(toDate(date));
    this.datePickerMenu.closeMenu();
  }

  showKeyboardShortcutDialog(): void {
    this.dialog.open(KeyboardShortcutDialogComponent, {
      data: this.options,
    });
  }

  handleKeyboardEvents(event: KeyboardEvent): void {
    switch (event.key) {
      case KEY_D:
        this.selectedView = DAY;
        break;

      case KEY_W:
        this.selectedView = WEEK;
        break;

      case KEY_M:
        this.selectedView = MONTH;
        break;

      case KEY_T:
        this.setCalendarToday();
        break;

      case KEY_N:
        this.addButtonClick.emit();
        break;

      case KEY_ARROWLEFT:
        this.setCalendarOffset(PREVIOUS);
        break;

      case KEY_ARROWRIGHT:
        this.setCalendarOffset(NEXT);
        break;

      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
