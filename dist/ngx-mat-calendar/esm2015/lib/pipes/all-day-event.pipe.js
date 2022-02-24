import { Pipe } from '@angular/core';
export class AllDayEventPipe {
    transform(items, allDay) {
        if (allDay) {
            return items.filter(item => item.allDay);
        }
        return items.filter(item => !item.allDay);
    }
}
AllDayEventPipe.decorators = [
    { type: Pipe, args: [{
                name: 'allDayEventPipe'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLWRheS1ldmVudC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LW1hdC1jYWxlbmRhci9zcmMvbGliL3BpcGVzL2FsbC1kYXktZXZlbnQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRCxNQUFNLE9BQU8sZUFBZTtJQUN4QixTQUFTLENBQUMsS0FBWSxFQUFFLE1BQWU7UUFDbkMsSUFBSSxNQUFNLEVBQUU7WUFDUixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUM7UUFFRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7WUFWSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLGlCQUFpQjthQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdhbGxEYXlFdmVudFBpcGUnXG59KVxuZXhwb3J0IGNsYXNzIEFsbERheUV2ZW50UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybShpdGVtczogYW55W10sIGFsbERheTogYm9vbGVhbik6IGFueSB7XG4gICAgICAgIGlmIChhbGxEYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmFsbERheSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKGl0ZW0gPT4gIWl0ZW0uYWxsRGF5KTtcbiAgICB9XG59XG4iXX0=