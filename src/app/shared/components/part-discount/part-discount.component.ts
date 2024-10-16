import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  IncludedServiceType,
  PartsDiscountType,
} from '../../../contract/models/contract-overview.model';
import { FormControl } from '@angular/forms';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import { removeLeadingZeros } from '../../../../utils';

export interface PartsDiscountDialogComponentParams {
  lineNumber: string;
  partsDiscount: PartsDiscountType[];
}

@Component({
  selector: 'app-part-discount',
  templateUrl: './part-discount.component.html',
  styleUrl: './part-discount.component.scss',
})
export class PartDiscountComponent {
  public payload: PartsDiscountDialogComponentParams = inject(MAT_DIALOG_DATA);
  readonly partsDiscountForm = new FormControl('');
  public partsDiscount = this.payload.partsDiscount;

  public colDefs: ColDef[] = [
    {
      field: 'discountDescription',
      headerName: 'Discount Description',
      filter: true,
      sortable: true,
    },
    {
      field: 'discountValue',
      headerName: 'Discount Value',
      filter: true,
      sortable: true,
    },
  ];
}
