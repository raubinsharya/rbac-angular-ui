import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import {
  MeMessageDialogComponentParams,
  MessageDialogComponent,
} from '../../../../../../shared/components/message-dialog/message-dialog.component';
import { ContractLineItemType } from '../../../../../models/contract-overview.model';

@Component({
  selector: 'app-text-cell-renderer',
  templateUrl: './text-cell-renderer.component.html',
  styleUrl: './text-cell-renderer.component.scss',
})
export class GridTextCellRendererComponent {
  private params!: ICellRendererParams<ContractLineItemType>;

  constructor(private dialog: MatDialog) {}

  agInit(params: ICellRendererParams<ContractLineItemType>): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return true;
  }

  public openMessageDialog() {
    this.dialog
      .open(MessageDialogComponent, {
        minWidth: '600px',
        minHeight: '300px',
        data: {
          title: `Line Text: ${this.params.data?.contractLineItemNumber}`,
          data: this.params.value,
          tabs: [
            { name: 'Internal', icon: 'security', fieldName: 'itemText' },
            {
              name: 'Customer Invoice',
              icon: 'description',
              fieldName: 'itemText',
            },
            {
              name: 'Additional Info (SMAX)',
              icon: 'domain_verification',
              fieldName: 'itemText',
            },
          ],
        } as MeMessageDialogComponentParams,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.params.node.setDataValue('texts', result);
        }
      });
  }
}
