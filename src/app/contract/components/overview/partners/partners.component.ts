import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import {
  BusinessPartnerRoleType,
  QuoteDetailsType,
} from '../../../models/contract-overview.model';
import {
  fetchPartnerLoading,
  selectContractOverview,
  selectContractOverviewHeaderPartnerSoldTo,
  selectContractOverviewIsBusinesspartnerroleUpdated,
  selectContractOverviewPartners,
} from '../../../store/selectors/contract-overview.selector';

import { NotificationService } from '../../../../services/notification.service';
import {
  fetchPartnerDetailsCancel,
  fetchPartnerDetailsSuccess,
  resetOverview,
  resetPartnerField,
  updateOverview,
  updatetPartnerField,
} from '../../../store/actions/contract-overview.action';
import { filter, firstValueFrom, takeUntil } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { queryAndResetJSON, queryAndUpdateJSON } from '../../../../../utils';
import { HeaderPartnerColDefs } from './colDefs.service';

@Component({
  selector: 'contract-overview-partners',
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
})
export class ContractOverviewPartnersComponent {
  public colDefs!: ColDef[];
  public isEditMode: boolean = false;
  public isExpanded: boolean = false;
  public partnersData!: BusinessPartnerRoleType[];
  public originalBusinessPartnerData!: BusinessPartnerRoleType[];
  public isBusinesspartnerroleUpdated!: boolean;
  public contractOverview!: QuoteDetailsType;
  public soldTo!: BusinessPartnerRoleType;
  public parternLoading!: boolean;
  public partnerLoadingMessage!: string;

  constructor(
    private store: Store,
    private notification: NotificationService,
    private actions$: Actions,
    private colDefsService: HeaderPartnerColDefs
  ) {
    this.store
      .select(selectContractOverviewPartners)
      .pipe(filter(() => !this.isEditMode))
      .subscribe((partners) => {
        this.partnersData = structuredClone(
          partners
        ) as BusinessPartnerRoleType[];
        this.originalBusinessPartnerData = partners;
      });
    this.store
      .select(selectContractOverviewIsBusinesspartnerroleUpdated)
      .subscribe((updated) => (this.isBusinesspartnerroleUpdated = updated));
    this.store
      .select(selectContractOverview)
      .subscribe((overview) => (this.contractOverview = overview));
    this.store
      .select(selectContractOverviewHeaderPartnerSoldTo)
      .subscribe((soldTo) => (this.soldTo = soldTo));
    this.store.select(fetchPartnerLoading).subscribe((loading) => {
      this.parternLoading = loading;
      this.partnerLoadingMessage = 'Fetching Partner...';
    });
  }

  ngOnInit() {
    this.updateColDefs();
    this.actions$.pipe(ofType(resetPartnerField)).subscribe((action) => {
      this.partnersData = structuredClone(
        queryAndResetJSON(
          this.originalBusinessPartnerData,
          this.partnersData,
          action.query
        )
      );
    });
    this.actions$.pipe(ofType(updatetPartnerField)).subscribe((action) => {
      this.partnersData = structuredClone(
        queryAndUpdateJSON(this.partnersData, action.query, action.targetFields)
      );
    });
  }

  updateColDefs() {
    this.colDefs = this.colDefsService.getColDefs(
      this.contractOverview,
      this.soldTo,
      this.isEditMode
    );
  }

  startEditMode() {
    this.isEditMode = true;
    this.updateColDefs();
  }

  stopEditMode() {
    this.isEditMode = false;
    this.updateColDefs();
    setTimeout(
      () =>
        this.store.dispatch(
          updateOverview({
            query: '$.commercialContract',
            targetFields: [
              { field: 'businessPartnerRole', value: this.partnersData },
            ],
          })
        ),
      1000
    );
  }

  async cancelEditMode() {
    this.isEditMode = false;
    this.partnerLoadingMessage = '';
    this.store.dispatch(fetchPartnerDetailsCancel());
    this.partnersData = structuredClone(
      await firstValueFrom(this.store.select(selectContractOverviewPartners))
    );
    this.updateColDefs();
  }

  reset() {
    this.store.dispatch(
      resetOverview({ query: 'commercialContract.businessPartnerRole' })
    );
  }
}
