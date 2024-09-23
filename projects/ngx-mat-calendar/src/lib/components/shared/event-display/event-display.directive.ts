import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[eventDisplay]',
  standalone: true
})
export class EventDisplayDirective {
    constructor(
        public viewContainerRef: ViewContainerRef
    ) { }
}
