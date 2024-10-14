import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ContractLineItemType,
  QuoteDetailsType,
} from '../../../models/contract-overview.model';
import {
  classNameMapping,
  constractStatusMapping,
} from '../../../../shared/constants';
import {
  selectContractOverview,
  selectContractOverviewError,
  selectContractOverviewLineItem,
  selectContractOverviewLoading,
} from '../../../store/selectors/contract-overview.selector';
import { ActivatedRoute } from '@angular/router';
import { fetchContractOverview } from '../../../store/actions/contract-overview.action';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class ContractItemDetailsMainComponent {
  public overview!: QuoteDetailsType | null;
  public contractLineItem!: ContractLineItemType | undefined;
  public loading!: boolean;
  public error!: any;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.store
      .select(selectContractOverview)
      .subscribe((result) => (this.overview = result));
    this.store
      .select(selectContractOverviewLoading)
      .subscribe((result) => (this.loading = result));
    this.store
      .select(selectContractOverviewError)
      .subscribe((result) => (this.error = result));
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (isEmpty(this.overview)) {
        this.store.dispatch(
          fetchContractOverview({
            sourceSystemHeaderId: params.get('source') as string,
          })
        );
      }
      this.store
        .select(selectContractOverviewLineItem(Number(params.get('idx'))))
        .subscribe((result) => (this.contractLineItem = result));
    });
  }

  get contractStatus(): string {
    return constractStatusMapping[
      this.overview?.commercialContract?.contractCreationStatus as string
    ];
  }
  get contractStatusClass(): string {
    return classNameMapping[
      this.overview?.commercialContract?.contractCreationStatus as string
    ];
  }
}
