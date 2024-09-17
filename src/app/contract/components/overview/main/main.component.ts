import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchContractOverview } from '../../../store/actions/contract-overview.action';
import { ActivatedRoute } from '@angular/router';
import { ContractOverViewEffect } from '../../../store/effects/contract-overview.effects';
import { QuoteDetailsType } from '../../../models/contract-overview.model';
import {
  selectContractOverview,
  selectContractOverviewError,
  selectContractOverviewLoading,
} from '../../../store/selectors/contract-overview.selector';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class ContractOverviewMainComponent {
  public overview!: QuoteDetailsType | null;
  public loading!: boolean;
  public error!: any;

  private constractStatusMapping: { [k: string]: string } = {
    VALIDATION: 'LISTING',
    FAILED: 'FAILED',
    TEC_ERROR: 'TECH ERROR',
  };

  private classNameMapping: { [k: string]: string } = {
    VALIDATION: 'listing',
    FAILED: 'failed',
    TEC_ERROR: 'tech-error',
    IN_PROGRESS: 'progress',
  };

  get contractStatus(): string {
    return this.constractStatusMapping[
      this.overview?.commercialContract.contractCreationStatus as string
    ];
  }
  get contractStatusClass(): string {
    return this.classNameMapping[
      this.overview?.commercialContract.contractCreationStatus as string
    ];
  }

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
      this.store.dispatch(
        fetchContractOverview({
          sourceSystemHeaderId: params.get('id') as string,
        })
      );
    });
  }
}
