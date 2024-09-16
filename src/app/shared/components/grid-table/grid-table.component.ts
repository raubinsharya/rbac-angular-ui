import { Component, Input } from '@angular/core';
import { ColDef, IsFullWidthRowParams } from 'ag-grid-community';

@Component({
  selector: 'ag-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrl: './grid-table.component.scss',
})
export class AgGridTableComponent {
  @Input() rowData!: any[];
  @Input() colDefs!: ColDef[];
  @Input() components!: {
    [p: string]: any;
  };

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
}
