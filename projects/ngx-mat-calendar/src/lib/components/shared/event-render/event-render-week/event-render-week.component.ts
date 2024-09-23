import { Component, OnInit } from '@angular/core';
import { FormattingService } from '../../../../services/formatting.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EventRenderBaseComponent } from '../event-render-base.component';

@Component({
  selector: 'event-render-week',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './event-render-week.component.html',
  styleUrls: ['./event-render-week.component.scss'],
})
export class EventRenderWeekComponent
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
