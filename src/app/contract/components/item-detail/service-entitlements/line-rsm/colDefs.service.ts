import { ColDef } from 'ag-grid-community';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LineRSMColDefs {
  getColDefs(): ColDef[] {
    return [
      {
        field: 'rsmType',
        headerName: 'RSM Type',
        sortable: true,
        editable: false,
        filter: true,
        minWidth: 130,
      },
      {
        field: 'partsLine',
        headerName: 'Part Line',
        sortable: true,
        editable: false,
        filter: true,
        minWidth: 130,
      },
      {
        field: 'includedServices',
        headerName: 'Included Service',
        sortable: true,
        editable: false,
        filter: true,
        minWidth: 180,
      },
      {
        field: 'thresholdAmount',
        headerName: 'Threshold Amount',
        sortable: true,
        editable: false,
        filter: true,
        minWidth: 190,
      },
      {
        field: 'thresholdQuantity',
        headerName: 'Threshold Quantity',
        sortable: true,
        editable: false,
        filter: true,
        minWidth: 190,
      },
      {
        field: 'rsmStartDate',
        headerName: 'RSM Start Date',
        sortable: true,
        editable: false,
        filter: true,
        minWidth: 160,
      },
      {
        field: 'rsmEndDate',
        headerName: 'RSM End Date',
        sortable: true,
        editable: false,
        filter: true,
        minWidth: 160,
      },
      {
        field: 'rsmSequence',
        headerName: 'RSM Sequence',
        sortable: true,
        editable: false,
        filter: true,
        minWidth: 160,
      },
      {
        field: 'rsmMultiYear',
        headerName: 'RSM Multi Year',
        sortable: true,
        editable: false,
        filter: true,
        minWidth: 170,
      },
    ];
  }
}
