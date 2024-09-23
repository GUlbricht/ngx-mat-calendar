import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  CalendarEvent,
  CalendarOptions,
  NgxMatCalendarComponent,
} from 'ngx-mat-calendar';
import { add } from 'date-fns';
import { EventService } from './services/event.service';
import { CustomEventRenderMonthComponent } from './component/event-render-month/event-render-month.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatCalendarComponent,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  events: CalendarEvent[];
  calendarOptions = new CalendarOptions();
  date = new Date();

  compact = false;
  addButton = false;
  viewToggle = true;
  enableDatePickerButton = true;
  enableCustomMonthViewComponent = false;

  constructor(
    private eventService: EventService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.initCalendar();
  }

  initCalendar(): void {
    this.calendarOptions = new CalendarOptions({
      compact: this.compact,
      enableAddEventButton: this.addButton,
      enableViewToggle: this.viewToggle,
      enableDatePickerButton: this.enableDatePickerButton,
    });

    if (this.enableCustomMonthViewComponent) {
      this.calendarOptions.renderComponent.month = CustomEventRenderMonthComponent;
    }

    this.getEvents(this.date);
  }

  getEvents(date: Date): void {
    this.eventService.getEvents(date).subscribe((events: CalendarEvent[]) => {
      this.events = events;
    });
  }

  changeDateFromParent(): void {
    this.date = add(this.date, { months: 1 });
  }

  onCompactChange(): void {
    this.compact = !this.compact;
    this.initCalendar();
  }

  onAddButtonChange(): void {
    this.addButton = !this.addButton;
    this.initCalendar();
  }

  onViewToggleChange(): void {
    this.viewToggle = !this.viewToggle;
    this.initCalendar();
  }

  onDatePickerButtonChange(): void {
    this.enableDatePickerButton = !this.enableDatePickerButton;
    this.initCalendar();
  }

  onCustomMonthViewComponentButtonChange(): void {
    this.enableCustomMonthViewComponent = !this.enableCustomMonthViewComponent;
    this.initCalendar();
  }

  handleDateChange(date: Date): void {
    this.date = date;
    this.getEvents(date);
  }

  handleEventClick(event: CalendarEvent): void {
    console.log(event);
  }

  handleAddButtonClick(): void {
    console.log('Add button clicked!');
  }
}
