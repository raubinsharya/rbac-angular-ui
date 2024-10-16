import { Component } from '@angular/core';
import { ContractLineItemType } from '../../../../../../models/contract-overview.model';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import {
  PartDiscountComponent,
  PartsDiscountDialogComponentParams,
} from '../../../../../../../shared/components/part-discount/part-discount.component';

@Component({
  selector: 'app-part-discount-renderer',
  templateUrl: './part-discount-renderer.component.html',
  styleUrl: './part-discount-renderer.component.scss',
})
export class PartDiscountRendererComponent {
  public value!: string;
  public idx!: string;
  private params!: ICellRendererParams<ContractLineItemType>;

  constructor(private dialog: MatDialog) {}

  agInit(params: ICellRendererParams<ContractLineItemType>): void {
    this.value = params.value;
    this.idx = params.node?.id as string;
    this.params = params;
  }

  refresh(params: any): boolean {
    return true;
  }

  public openPartDiscountDialog() {
    this.dialog.open(PartDiscountComponent, {
      minWidth: 700,
      minHeight: 300,
      data: {
        lineNumber: this.params.data?.contractLineItemNumber,
        partsDiscount: this.params.value,
      } as PartsDiscountDialogComponentParams,
    });
  }
}
