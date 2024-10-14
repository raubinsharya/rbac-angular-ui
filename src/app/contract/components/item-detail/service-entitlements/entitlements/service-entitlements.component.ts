import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { LineEntitlementColDefs } from './colDefs.service';
import { ContractLineItemType } from '../../../../models/contract-overview.model';
import { Store } from '@ngrx/store';
import { selectContractOverviewLineItem } from '../../../../store/selectors/contract-overview.selector';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'line-service-entitlements',
  templateUrl: './service-entitlements.component.html',
  styleUrl: './service-entitlements.component.scss',
})
export class ServiceEntitlementsComponent {
  public colDefs!: ColDef[];
  public rowData!: [ContractLineItemType];
  public idx!: number;

  constructor(
    private colService: LineEntitlementColDefs,
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
