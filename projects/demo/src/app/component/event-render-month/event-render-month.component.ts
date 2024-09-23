import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EventRenderBaseComponent } from '../../../../../ngx-mat-calendar/src/lib/components/shared/event-render/event-render-base.component';
import { FormattingService } from '../../../../../ngx-mat-calendar/src/lib/services/formatting.service';

@Component({
  selector: 'app-custom-event-render-month',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './event-render-month.component.html',
  styleUrls: ['./event-render-month.component.scss'],
})
export class CustomEventRenderMonthComponent
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
