import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {
  BusinessPartnerRoleType,
  QuoteDetailsType,
} from '../../../models/contract-overview.model';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../../../services/notification.service';
import { Actions, ofType } from '@ngrx/effects';
import { filter, firstValueFrom } from 'rxjs';
import {
  fetchPartnerDetailsCancel,
  resetLinePartnerField,
  resetOverview,
  updateOverview,
  updatetLinePartnerField,
} from '../../../store/actions/contract-overview.action';
import {
  selectContractOverview,
  selectContractOverviewLineIsBusinesspartnerRoleUpdated,
  selectContractOverviewLineItemPartner,
  selectContractOverviewLinePartnerSoldTo,
  selectPartnerLoading,
} from '../../../store/selectors/contract-overview.selector';
import { ActivatedRoute } from '@angular/router';
import { LinePartnerColDefs } from './colDefs.service';
import { queryAndResetJSON, queryAndUpdateJSON } from '../../../../../utils';

@Component({
  selector: 'contract-line-partner',
  templateUrl: './partner.component.html',
  styleUrl: './partner.component.scss',
})
export class ContractLinePartnerComponent {
  public colDefs!: ColDef[];
  public isEditMode: boolean = false;
  public isExpanded: boolean = false;
  public partnersData!: BusinessPartnerRoleType[];
  public originalBusinessPartnerData!: BusinessPartnerRoleType[];
  public isBusinesspartnerRoleUpdated!: boolean;
  public contractOverview!: QuoteDetailsType;
  public soldTo!: BusinessPartnerRoleType;
  public parternLoading!: boolean;
  public partnerLoadingMessage!: string;
  public idx!: number;

  constructor(
    private store: Store,
    private actions$: Actions,
    private route: ActivatedRoute,
    private colDefsService: LinePartnerColDefs
  ) {
    this.route.paramMap.subscribe((params) => {
      this.idx = Number(params.get('idx'));
      this.store
        .select(selectContractOverviewLineItemPartner(this.idx))
        .pipe(filter(() => !this.isEditMode))
        .subscribe((partners) => {
          this.partnersData = structuredClone(
            partners
          ) as BusinessPartnerRoleType[];
          this.originalBusinessPartnerData =
            partners as BusinessPartnerRoleType[];
        });

      this.store
        .select(
          selectContractOverviewLineIsBusinesspartnerRoleUpdated(this.idx)
        )
        .subscribe((updated) => (this.isBusinesspartnerRoleUpdated = updated));
      this.store
        .select(selectContractOverview)
        .subscribe((overview) => (this.contractOverview = overview));
      this.store
        .select(selectContractOverviewLinePartnerSoldTo(this.idx))
        .subscribe((soldTo) => (this.soldTo = soldTo));
      this.store.select(selectPartnerLoading).subscribe((loading) => {
        this.parternLoading = loading;
        this.partnerLoadingMessage = 'Fetching Partner...';
      });
    });
  }

  ngOnInit() {
    this.updateColDefs();
    this.actions$.pipe(ofType(resetLinePartnerField)).subscribe((action) => {
      this.partnersData = structuredClone(
        queryAndResetJSON(
          this.originalBusinessPartnerData,
          this.partnersData,
          action.query
        )
      );
    });
    this.actions$.pipe(ofType(updatetLinePartnerField)).subscribe((action) => {
      this.partnersData = structuredClone(
        queryAndUpdateJSON(this.partnersData, action.query, action.targetFields)
      );
    });
  }

  updateColDefs() {
    this.colDefs = this.colDefsService.getColDefs(
      this.contractOverview,
      this.soldTo,
      this.isEditMode,
      this.idx
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
            query: `$.commercialContract.contractLineItems[${this.idx}]`,
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
      (await firstValueFrom(
        this.store.select(selectContractOverviewLineItemPartner(this.idx))
      )) as BusinessPartnerRoleType[]
    );
    this.updateColDefs();
  }

  reset() {
    this.store.dispatch(
      resetOverview({
        query: `commercialContract.contractLineItems[${this.idx}].businessPartnerRole`,
      })
    );
  }
}
