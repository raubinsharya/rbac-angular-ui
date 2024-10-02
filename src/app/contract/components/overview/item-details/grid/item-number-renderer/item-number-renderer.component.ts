import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ContractLineItemType } from '../../../../../models/contract-overview.model';

@Component({
  selector: 'app-item-number-renderer',
  templateUrl: './item-number-renderer.component.html',
  styleUrl: './item-number-renderer.component.scss',
})
export class GridItemNumberRendererComponent {
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
