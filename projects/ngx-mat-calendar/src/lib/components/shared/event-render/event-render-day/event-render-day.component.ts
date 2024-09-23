import { Component, OnInit } from '@angular/core';
import { FormattingService } from '../../../../services/formatting.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EventRenderBaseComponent } from '../event-render-base.component';

@Component({
  selector: 'event-render-day',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './event-render-day.component.html',
  styleUrls: ['./event-render-day.component.scss'],
})
export class EventRenderDayComponent
  extends EventRenderBaseComponent
  implements OnInit
{
  constructor(protected override formattingService: FormattingService) {
    super(formattingService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
