import { Component, OnInit } from '@angular/core';
import { FormattingService } from '../../../../services/formatting.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EventRenderBaseComponent } from '../event-render-base.component';

@Component({
  selector: 'event-render-month',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './event-render-month.component.html',
  styleUrls: ['./event-render-month.component.scss'],
})
export class EventRenderMonthComponent
  extends EventRenderBaseComponent
  implements OnInit
{
  constructor(protected override formattingService: FormattingService) {
    super(formattingService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.eventTooltip = this.getEventTooltip();
  }
}
