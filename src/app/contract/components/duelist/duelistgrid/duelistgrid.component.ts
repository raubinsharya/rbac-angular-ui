import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchDueLists } from '../../../store/actions/duelist.action';
import { DueList } from '../../../models/duelist.model';
import {
  selectDueLists,
  selectDueListLoading,
  selectDueListError,
} from '../../../store/selectors/duelist.selector';
import { NotificationService } from '../../../../services/notification.service';
import { ColDef } from 'ag-grid-community';
import moment from 'moment';
import { HyperlinkcellrenderComponent } from './custom-cell/hyperlinkcellrender/hyperlinkcellrender.component';
import { ContractstatusRenderComponent } from './custom-cell/contractstatus/contractstatus.component';
import { BasicvalCheckRenderComponent } from './custom-cell/basicval/basicval.component';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from '../../../../shared/components/booking-dialog/booking-dialog.component';

@Component({
  selector: 'contract-duelist-grid',
  templateUrl: './duelistgrid.component.html',
  styleUrl: './duelistgrid.component.scss',
})
export class ContractDuelistGridComponent {
  dueLists!: DueList[];
  loading!: boolean;
  error!: any;
  selectedRows: DueList[] = [];

  colDefs: ColDef[] = [
    {
      field: 'date',
      headerName: 'Date',
      sortable: true,
      minWidth: 160,
      showDisabledCheckboxes: true,
      checkboxSelection: true,
      filter: 'agDateColumnFilter',
      sort: 'desc',
      cellRenderer: ({ value }: { value: string }) =>
        moment(value).format('DD-MM-yyyy'),
    },
    {
      field: 'date',
      headerName: 'Time',
      sortable: true,
      editable: false,
      minWidth: 110,
      sort: 'desc',
      cellRenderer: ({ value }: { value: string }) =>
        moment(value).format('hh:mm A'),
    },
    {
      field: 'poNumber',
      headerName: 'PO Number',
      minWidth: 160,
      filter: true,
      cellRenderer: HyperlinkcellrenderComponent,
    },
    {
      field: 'quoteRefNumber',
      headerName: 'Quote Ref Number',
      minWidth: 205,
      filter: true,
      cellRenderer: HyperlinkcellrenderComponent,
    },
    {
      field: 'poDate',
      headerName: 'PO Date',
      minWidth: 135,
      filter: 'agDateColumnFilter',
    },
    {
      field: 'soldToParty',
      minWidth: 170,
      headerName: 'Sold To Party',
      filter: true,
    },
    {
      field: 'soldToPartyNo',
      headerName: 'Sold To Party No',
      minWidth: 190,
      filter: true,
      cellRenderer: ({ value }: { value: string }) => Number(value),
    },
    {
      field: 'shipToParty',
      headerName: 'Ship To Party',
      minWidth: 170,
      filter: true,
    },
    {
      field: 'shipToPartyNo',
      headerName: 'Ship To Party No',
      minWidth: 190,
      filter: true,
      cellRenderer: ({ value }: { value: string }) => Number(value),
    },
    {
      field: 'salesOrg',
      headerName: 'Sales Org',
      minWidth: 140,
      filter: true,
      cellRenderer: ({ value }: { value: string }) => value.toUpperCase(),
    },
    {
      field: 'contractType',
      headerName: 'Contract Type',
      minWidth: 170,
      filter: true,
      cellRenderer: ({ value }: { value: string }) => value.toUpperCase(),
    },
    {
      field: 'salesDocType',
      headerName: 'Sales Doc Type',
      minWidth: 180,
      editable: false,
      filter: true,
      cellRenderer: ({ value }: { value: string }) => value.toUpperCase(),
    },
    {
      field: 'accountManagerName',
      headerName: 'Account Manager Name',
      minWidth: 240,
      editable: false,
      filter: true,
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      minWidth: 150,
      editable: false,
      filter: true,
    },
    {
      field: 'currency',
      headerName: 'Currency',
      minWidth: 140,
      editable: false,
      filter: true,
      cellRenderer: ({ value }: { value: string }) => value.toUpperCase(),
    },
    {
      field: 'contractCreationStatus',
      headerName: 'Contract Status',
      minWidth: 170,
      sortable: true,
      filter: false,
      cellRenderer: ContractstatusRenderComponent,
    },
    {
      field: 'basicValCheck',
      headerName: 'BasicValCheck',
      minWidth: 170,
      editable: false,
      cellRenderer: BasicvalCheckRenderComponent,
    },
  ];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {
    this.store
      .select(selectDueLists)
      .subscribe((dueLists) => (this.dueLists = dueLists));
    this.store
      .select(selectDueListLoading)
      .subscribe((value) => (this.loading = value));
    this.store
      .select(selectDueListError)
      .subscribe((error) => (this.error = error));
  }

  ngOnInit(): void {
    this.store.dispatch(
      fetchDueLists({ salesOrgIdList: ['NZ90', 'AU90', 'US93'] })
    );
  }

  handleSelectedRows(selectedRows: any[]) {
    this.selectedRows = selectedRows;
  }

  handleBooking() {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      minWidth: '500px',
      minHeight: '300px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedRows = [];
        this.store.dispatch(
          fetchDueLists({ salesOrgIdList: ['NZ90', 'AU90', 'US93'] })
        );
        this.notification.showSuccess('Contract Sent to SAP');
      }
    });
  }

  isRowSelectable = (node: any) => {
    return (
      node.data.basicValCheck === 'VAL_SUCCESS' &&
      node.data.contractCreationStatus === 'VALIDATION'
    );
  };
}
