import { Component } from '@angular/core';
import { ContractLineItemType } from '../../../models/contract-overview.model';
import { Store } from '@ngrx/store';
import { selectContractOverviewcontractLineItems } from '../../../store/selectors/contract-overview.selector';
import { LineItemcolDefs } from './colDefs';
import { ColDef } from 'ag-grid-community';
import { updateOverview } from '../../../store/actions/contract-overview.action';

@Component({
  selector: 'contract-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
})
export class ContractItemDetailsComponent {
  public linesData!: ContractLineItemType[];
  public colDefs: ColDef[] = LineItemcolDefs;

  constructor(private store: Store) {
    this.store
      .select(selectContractOverviewcontractLineItems)
      .subscribe(
        (lines) =>
          (this.linesData = structuredClone(lines) as ContractLineItemType[])
      );
  }

  onCellValueChanged(): void {
    this.store.dispatch(
      updateOverview({
        query: '$.commercialContract',
        targetFields: [{ field: 'contractLineItems', value: this.linesData }],
      })
    );
  }
  onGridReady(params: any) {}
}
