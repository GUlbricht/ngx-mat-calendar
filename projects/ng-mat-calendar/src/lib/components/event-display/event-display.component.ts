import {
    Component,
    ComponentFactoryResolver,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { CalendarEvent } from '../../models/Calendar';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'event-display',
    template: `<ng-template #renderTarget></ng-template>`
})
export class EventDisplayComponent implements OnInit, OnDestroy {
    renderComponent: any;
    @Input() event!: CalendarEvent;
    @Input() component!: any;

    @ViewChild('renderTarget', { read: ViewContainerRef, static: true }) renderTarget: any;

    constructor(
        private resolver: ComponentFactoryResolver
    ) {}

    ngOnInit(): void {
        if (this.event && !this.renderComponent) {
            this.createRenderComponent();
        }
    }

    ngOnDestroy(): void {
        if (this.renderComponent) {
            this.renderComponent.destroy();
        }
    }

    createRenderComponent(): void {
        const componentFactory = this.resolver.resolveComponentFactory(this.component);
        this.renderComponent = this.renderTarget.createComponent(componentFactory);
        this.renderComponent.instance.event = this.event;
    }
}
