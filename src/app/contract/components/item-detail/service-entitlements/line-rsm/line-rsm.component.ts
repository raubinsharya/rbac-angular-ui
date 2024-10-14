import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ContractLineItemType } from '../../../../models/contract-overview.model';
import { LineRSMColDefs } from './colDefs.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectContractOverviewLineItem } from '../../../../store/selectors/contract-overview.selector';

@Component({
  selector: 'contract-line-rsm',
  templateUrl: './line-rsm.component.html',
  styleUrl: './line-rsm.component.scss',
})
export class LineRsmComponent {
  public colDefs!: ColDef[];
  public rowData!: ContractLineItemType[];
  public idx!: number;

  constructor(
    private colService: LineRSMColDefs,
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.colDefs = this.colService.getColDefs();
    this.route.paramMap.subscribe((params) => {
      this.idx = Number(params.get('idx'));
      this.store
        .select(selectContractOverviewLineItem(this.idx))
        .subscribe((lineItem) => {
          this.rowData = [lineItem as ContractLineItemType];
        });
    });
  }
}
