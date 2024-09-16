import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';

@Component({
  selector: 'ag-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrl: './grid-table.component.scss',
})
export class AgGridTableComponent {
  public gridApi!: GridApi;

  @Input() rowData!: any[];
  @Input() colDefs!: ColDef[];
  @Input() isRowSelectable!: (node: any) => boolean;
  @Input() rowSelection: 'single' | 'multiple' = 'single';
  @Output() selectedRows = new EventEmitter<any[]>();

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedRows.emit(selectedRows);
  }
}
