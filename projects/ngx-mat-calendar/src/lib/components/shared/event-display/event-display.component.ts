import { Component, ComponentRef, Input, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { CalendarEvent } from '../../../models/CalendarEvent';
import { DisplayComponent } from '../../../models/DisplayComponent';
import { EventDisplayDirective } from './event-display.directive';
import { EventRenderBaseComponent } from '../event-render/event-render-base.component';

@Component({
    selector: 'event-display',
    standalone: true,
    imports: [EventDisplayDirective],
    template: `<ng-template eventDisplay></ng-template>`,
    styleUrls: ['./event-display.component.scss']
})
export class EventDisplayComponent implements OnInit, OnDestroy {
    @Input() event: CalendarEvent;
    @Input() date: Date;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Input() component: any;

    componentRef: ComponentRef<DisplayComponent>;

    @ViewChild(EventDisplayDirective, { static: true }) eventDisplayTarget!: EventDisplayDirective;

    ngOnInit(): void {
        if (this.event && !this.componentRef) {
            this.loadComponent();
        }
    }

    private componentTypeFactory(): Type<DisplayComponent> {
        const comp: Type<DisplayComponent> = this.component;
        return comp;
    }

    private loadComponent(): void {
        const viewContainerRef = this.eventDisplayTarget.viewContainerRef;
        viewContainerRef.clear();

        this.componentRef = viewContainerRef.createComponent(this.componentTypeFactory());
        const base = (this.componentRef.instance as EventRenderBaseComponent);
        base.date = this.date;
        base.event = this.event;
    }

    ngOnDestroy(): void {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }
}
