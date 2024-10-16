import { Component } from '@angular/core';
import { ContractLineItemType } from '../../../../../../models/contract-overview.model';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import {
  IncludedServicesComponent,
  IncludedServicesDialogComponentParams,
} from '../../../../../../../shared/components/included-services/included-services.component';

@Component({
  selector: 'app-included-services-renderer',
  templateUrl: './included-services-renderer.component.html',
  styleUrl: './included-services-renderer.component.scss',
})
export class IncludedServicesRendererComponent {
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

  public openIncludedServicesDialog() {
    this.dialog.open(IncludedServicesComponent, {
      minWidth: 700,
      minHeight: 300,
      data: {
        lineNumber: this.params.data?.contractLineItemNumber,
        includedServices: this.params.value,
      } as IncludedServicesDialogComponentParams,
    });
  }
}
