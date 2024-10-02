import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'ag-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrl: './grid-table.component.scss',
})
export class AgGridTableComponent {
  public gridApi!: GridApi;

  @Input() pagination: boolean = false;
  @Input() rowData!: any[];
  @Input() colDefs!: ColDef[];
  @Input() isRowSelectable!: (node: any) => boolean;
  @Input() rowSelection: 'single' | 'multiple' = 'single';
  @Output() selectedRows = new EventEmitter<any[]>();
  @Output() cellValueChangedEvent = new EventEmitter<any>();
  @Output() cellEditStoppedEvent = new EventEmitter<any>();
  @Output() gridReadyEvent = new EventEmitter<any>();

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridReadyEvent.emit(params);
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectedRows.emit(selectedRows);
  }

  onCellValueChanged(event: any): void {
    this.cellValueChangedEvent.emit(event);
  }
  @HostListener('document:click', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    const gridElement = document.querySelector('.ag-cell-edit-wrapper');
    if (gridElement && !gridElement.contains(event.target as Node)) {
      this.gridApi?.stopEditing();
    }
  }

  onCellEditingStopped(event: any): void {
    this.cellEditStoppedEvent.emit(event);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.onGlobalClick.bind(this));
  }
}
