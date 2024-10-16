import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ContractLineItemType } from '../../../../../models/contract-overview.model';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentDialogComponent } from '../../../../../../shared/components/equipment-dialog/equipment-dialog.component';
import { Store } from '@ngrx/store';
import { updateOverview } from '../../../../../store/actions/contract-overview.action';

@Component({
  selector: 'overview-number-of-equipments',
  templateUrl: './number-of-equipments.component.html',
  styleUrl: './number-of-equipments.component.scss',
})
export class NumberOfEquipmentsCellRenderer {
  private params!: ICellRendererParams<ContractLineItemType>;

  constructor(private dialog: MatDialog, private store: Store) {}

  agInit(params: ICellRendererParams<ContractLineItemType>): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return true;
  }

  get noOfEquipments() {
    return this.params.data?.technicalObjects?.length;
  }

  public openEquipmentDialog() {
    this.dialog
      .open(EquipmentDialogComponent, {
        minWidth: '700px',
        minHeight: '300px',
        data: {
          lineNumber: this.params.data?.contractLineItemNumber,
          technicalObjects: structuredClone(this.params.value),
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.store.dispatch(
            updateOverview({
              query: `$.commercialContract.contractLineItems[${this.params.node.id}]`,
              targetFields: [{ field: 'technicalObjects', value: result }],
            })
          );
        }
      });
  }
}
