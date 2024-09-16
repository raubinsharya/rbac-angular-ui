import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  positions: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { positions: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { positions: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { positions: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { positions: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { positions: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { positions: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { positions: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { positions: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { positions: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { positions: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-basic-valcheck-dialog',
  templateUrl: './basic-valcheck-dialog.component.html',
  styleUrl: './basic-valcheck-dialog.component.scss',
})
export class BasicValcheckDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  displayedColumns: string[] = ['checkName', 'status', 'errorMessage'];
  dataSource = ELEMENT_DATA;
}
