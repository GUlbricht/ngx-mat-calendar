import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WeekViewComponent } from './week-view.component';
import { RenderComponentsModule } from '../render-components/render-components.module';

import { MatIconModule } from '@angular/material/icon';

import { FormattingService } from '../../services/formatting.service';

const MaterialModules = [
    MatIconModule
];

@NgModule({
    declarations: [
        WeekViewComponent
    ],
    imports: [
        BrowserModule,
        RenderComponentsModule,
        ...MaterialModules
    ],
    exports: [
        WeekViewComponent
    ],
    entryComponents: [],
    providers: [
        FormattingService
    ],
    bootstrap: []
})
export class WeekViewModule { }
