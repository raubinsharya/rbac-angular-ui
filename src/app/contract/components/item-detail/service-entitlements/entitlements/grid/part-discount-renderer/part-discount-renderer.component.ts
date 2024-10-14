import { Component } from '@angular/core';
import { ContractLineItemType } from '../../../../../../models/contract-overview.model';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-part-discount-renderer',
  templateUrl: './part-discount-renderer.component.html',
  styleUrl: './part-discount-renderer.component.scss',
})
export class PartDiscountRendererComponent {
  public value!: string;
  public idx!: string;
  agInit(params: ICellRendererParams<ContractLineItemType>): void {
    this.value = params.value;
    this.idx = params.node?.id as string;
  }

  refresh(params: any): boolean {
    return true;
  }
}
