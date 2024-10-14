import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { ContractService } from '../../services/contract.service';
import {
  fetchContractOverview,
  fetchContractOverviewFailure,
  fetchContractOverviewSuccess,
  fetchEquipment,
  fetchEquipmentCancel,
  fetchEquipmentFailed,
  fetchEquipmentSuccess,
  fetchLinePartnerDetails,
  fetchPartnerDetails,
  fetchPartnerDetailsCancel,
  fetchPartnerDetailsFailed,
  fetchPartnerDetailsSuccess,
  resetLinePartnerField,
  resetPartnerField,
  updateOverview,
  updatetLinePartnerField,
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
      exhaustMap(({ sourceSystemHeaderId }) =>
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
      switchMap((action) =>
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
          ),
          takeUntil(this.actions$.pipe(ofType(fetchPartnerDetailsCancel)))
        )
      )
    )
  );
  fetchLinePartner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchLinePartnerDetails),
      switchMap((action) =>
        this.contractService.getPartnerData(action.payload).pipe(
          mergeMap((partner) => {
            if (isEmpty(partner)) {
              this.notification.showError('No Partner Found!');
              // If no partner found then reset that row
              return [
                resetLinePartnerField({
                  query: `$[?(@.businessPartnerRoleId == '${action.payload.businessPartnerRoleId}')]`,
                }),
                // this will make sure to reset that loading state to false
                fetchPartnerDetailsSuccess({ partner }),
              ];
            }
            return [
              fetchPartnerDetailsSuccess({ partner }),
              updatetLinePartnerField({
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
          ),
          takeUntil(this.actions$.pipe(ofType(fetchPartnerDetailsCancel)))
        )
      )
    )
  );

  fetchEquipments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchEquipment),
      switchMap((action) =>
        this.contractService.getEquipmentData(action.payload).pipe(
          mergeMap((equipments) => {
            if (isEmpty(equipments)) {
              this.notification.showError('No Equipment Found!');
              return [fetchEquipmentSuccess({ equipments: equipments })];
            }
            return [fetchEquipmentSuccess({ equipments: equipments })];
          }),
          catchError((error) =>
            of(fetchEquipmentFailed({ error: error.message }))
          ),
          takeUntil(this.actions$.pipe(ofType(fetchEquipmentCancel)))
        )
      )
    )
  );
}
