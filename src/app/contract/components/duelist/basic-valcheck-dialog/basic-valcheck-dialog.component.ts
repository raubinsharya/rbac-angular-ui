import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  positions: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-basic-valcheck-dialog',
  templateUrl: './basic-valcheck-dialog.component.html',
  styleUrl: './basic-valcheck-dialog.component.scss',
})
export class BasicValcheckDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  displayedColumns: string[] = ['checkName', 'status', 'errorMessage'];
}
