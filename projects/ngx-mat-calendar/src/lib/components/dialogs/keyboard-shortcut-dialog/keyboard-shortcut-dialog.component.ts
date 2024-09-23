import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CalendarOptions } from '../../../models/CalendarOptions';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'keyboard-shortcut-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDividerModule, MatDialogModule],
  templateUrl: './keyboard-shortcut-dialog.component.html',
  styleUrls: ['./keyboard-shortcut-dialog.component.scss'],
})
export class KeyboardShortcutDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CalendarOptions) {}
}
