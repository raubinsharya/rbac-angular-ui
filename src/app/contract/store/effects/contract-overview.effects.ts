import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ContractService } from '../../services/contract.service';
import {
  fetchContractOverview,
  fetchContractOverviewFailure,
  fetchContractOverviewSuccess,
  fetchPartnerDetails,
  fetchPartnerDetailsFailed,
  fetchPartnerDetailsSuccess,
  resetOverview,
  resetPartnerField,
  updateOverview,
  updatetPartnerField,
} from '../actions/contract-overview.action';
import { isEmpty } from 'lodash';
import { NotificationService } from '../../../services/notification.service';

@Injectable()
export class ContractOverViewEffect {
  constructor(
    private actions$: Actions,
    private contractService: ContractService,
    private notification: NotificationService
  ) {}

  loadContractOverview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchContractOverview),
      mergeMap(({ sourceSystemHeaderId }) =>
        this.contractService.getContractOverivew(sourceSystemHeaderId).pipe(
          map((overview) => fetchContractOverviewSuccess({ overview })),
          catchError((error) =>
            of(fetchContractOverviewFailure({ error: error.message }))
          )
        )
      )
    )
  );
  fetchPartner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchPartnerDetails),
      exhaustMap((action) =>
        this.contractService.getPartnerData(action.payload).pipe(
          mergeMap((partner) => {
            if (isEmpty(partner)) {
              this.notification.showError('No Partner Found!');
              return [
                resetPartnerField({
                  query: `$[?(@.businessPartnerRoleId == '${action.payload.businessPartnerRoleId}')]`,
                }),
                fetchPartnerDetailsSuccess({ partner }),
              ];
            }
            return [
              fetchPartnerDetailsSuccess({ partner }),
              updateOverview({
                query: `$.commercialContract.contractLineItems[*].businessPartnerRole[?(@.businessPartnerRoleId == '${action.payload.businessPartnerRoleId}')]`,
                targetFields: [
                  { field: 'address.country', value: partner.at(0)?.country },
                  {
                    field: 'address.businessPartnerName',
                    value: partner.at(0)?.name1,
                  },
                  { field: 'address.street1', value: partner.at(0)?.street },
                  { field: 'address.city', value: partner.at(0)?.city1 },
                  {
                    field: 'address.postalCode',
                    value: partner.at(0)?.postCode1,
                  },
                  { field: 'address.region', value: partner.at(0)?.region },
                  { field: 'address.timezone', value: partner.at(0)?.timeZone },
                ],
              }),
              updatetPartnerField({
                query: `$[?(@.businessPartnerRoleId == '${action.payload.businessPartnerRoleId}')]`,
                targetFields: [
                  { field: 'address.country', value: partner.at(0)?.country },
                  {
                    field: 'address.businessPartnerName',
                    value: partner.at(0)?.name1,
                  },
                  { field: 'address.street1', value: partner.at(0)?.street },
                  { field: 'address.city', value: partner.at(0)?.city1 },
                  {
                    field: 'address.postalCode',
                    value: partner.at(0)?.postCode1,
                  },
                  { field: 'address.region', value: partner.at(0)?.region },
                  { field: 'address.timezone', value: partner.at(0)?.timeZone },
                  { field: 'timezone', value: partner.at(0)?.timeZone },
                ],
              }),
            ];
          }),
          catchError((error) =>
            of(
              fetchPartnerDetailsFailed({ error: error.message }),
              resetPartnerField({
                query: `$[?(@.businessPartnerRoleId == '${action.payload.businessPartnerRoleId}')]`,
              })
            )
          )
        )
      )
    )
  );
}
