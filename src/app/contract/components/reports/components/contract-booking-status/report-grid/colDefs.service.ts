import { ColDef, ValueFormatterParams } from 'ag-grid-community';

import { Injectable } from '@angular/core';
import moment from 'moment';
import { BasicvalCheckRenderComponent } from '../../../../duelist/duelistgrid/custom-cell/basicval/basicval.component';
import { ContractstatusRenderComponent } from '../../../../duelist/duelistgrid/custom-cell/contractstatus/contractstatus.component';

@Injectable({
  providedIn: 'root',
})
export class ReportGridColDefs {
  getColDefs(): ColDef[] {
    return [
      {
        field: 'date',
        headerName: 'Record Creation Date',
        sortable: true,
        editable: false,
        minWidth: 220,
        filter: 'agDateColumnFilter',
        sort: 'desc',
        valueFormatter: ({ value }: ValueFormatterParams) =>
          moment(value).format('DD-MM-yyyy'),
      },
      {
        field: 'poNumber',
        headerName: 'PO Number',
        minWidth: 160,
        editable: false,
        filter: true,
      },
      {
        field: 'quoteRefNumber',
        headerName: 'Quote Ref Number',
        minWidth: 200,
        editable: false,
        filter: true,
      },
      {
        field: 'fileName',
        headerName: 'Opportunity Number',
        minWidth: 220,
        editable: false,
        filter: true,
      },
      {
        field: 'csbrNumber',
        headerName: 'CSBR Number',
        minWidth: 170,
        editable: false,
        filter: true,
      },
      {
        field: 'bookedDate',
        headerName: 'SAP Creation Date',
        minWidth: 200,
        editable: false,
        filter: true,
      },
      {
        field: 'sapContractNumber',
        headerName: 'SAP Contract Number',
        minWidth: 225,
        editable: false,
        filter: true,
      },
      {
        field: 'poDate',
        headerName: 'PO Date',
        minWidth: 130,
        editable: false,
        filter: 'agDateColumnFilter',
        valueFormatter: ({ value }: ValueFormatterParams) =>
          moment(value).format('DD-MM-yyyy'),
      },
      {
        field: 'salesOrg',
        headerName: 'Sales Org',
        minWidth: 140,
        editable: false,
        filter: true,
      },
      {
        field: 'contractType',
        headerName: 'Contract Type',
        minWidth: 170,
        editable: false,
        filter: true,
      },
      {
        field: 'salesDocType',
        headerName: 'Sales Doc Type',
        minWidth: 180,
        editable: false,
        filter: true,
      },
      {
        field: 'totalPrice',
        headerName: 'Total Price',
        minWidth: 150,
        editable: false,
        filter: true,
        cellStyle: { textAlign: 'right' },
      },
      {
        field: 'currency',
        headerName: 'Currency',
        minWidth: 140,
        editable: false,
        filter: true,
      },
      {
        field: 'contractCreationStatus',
        headerName: 'Contract Creation Status',
        minWidth: 240,
        editable: false,
        filter: true,
        sortable: true,
        cellRenderer: ContractstatusRenderComponent
      },
      {
        field: 'basicValCheck',
        headerName: 'BasicValCheck',
        minWidth: 170,
        editable: false,
        filter: true,
        cellRenderer: BasicvalCheckRenderComponent
      },
    ];
  }
}
