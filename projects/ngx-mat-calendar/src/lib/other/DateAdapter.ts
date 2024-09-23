import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class LocaleDateAdapter extends NativeDateAdapter {
    override getFirstDayOfWeek(): number {
        return 1;
    }
}
