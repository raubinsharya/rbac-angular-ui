import { Component } from '@angular/core';
import { ContractLineItemType } from '../../../../../../models/contract-overview.model';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-included-services-renderer',
  templateUrl: './included-services-renderer.component.html',
  styleUrl: './included-services-renderer.component.scss',
})
export class IncludedServicesRendererComponent {
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
