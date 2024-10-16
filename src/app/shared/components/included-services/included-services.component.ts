import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IncludedServiceType } from '../../../contract/models/contract-overview.model';
import { FormControl } from '@angular/forms';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import { removeLeadingZeros } from '../../../../utils';

export interface IncludedServicesDialogComponentParams {
  lineNumber: string;
  includedServices: IncludedServiceType[];
}

@Component({
  selector: 'app-included-services',
  templateUrl: './included-services.component.html',
  styleUrl: './included-services.component.scss',
})
export class IncludedServicesComponent {
  public payload: IncludedServicesDialogComponentParams =
    inject(MAT_DIALOG_DATA);
  readonly includedServicesForm = new FormControl('');
  public includedServices = this.payload.includedServices;

  public colDefs: ColDef[] = [
    {
      field: 'serviceName',
      headerName: 'Service Name',
      filter: true,
      sortable: true,
    },
    {
      field: 'serviceValue',
      headerName: 'Service Value',
      filter: true,
      sortable: true,
    },
  ];
}
