import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  delay,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { concat, of } from 'rxjs';
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
  requestSimulation,
  requestSimulationFailed,
  requestSimulationSuccess,
  resetLinePartnerField,
  resetPartnerField,
  updateOverview,
  updatetLinePartnerField,
  updatetPartnerField,
} from '../actions/contract-overview.action';
import { clone, isEmpty, set } from 'lodash';
import { NotificationService } from '../../../services/notification.service';
import { Store } from '@ngrx/store';
import { selectUserEmail } from '../../../store/selectos/user-management.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { BasicValcheckDialogComponent } from '../../../shared/components/basic-valcheck-dialog/basic-valcheck-dialog.component';
import { QuoteDetailsType } from '../../models/contract-overview.model';

@Injectable()
export class ContractOverViewEffect {
  public email!: string;
  constructor(
    private actions$: Actions,
    private contractService: ContractService,
    private notification: NotificationService,
    private store: Store,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.store
      .select(selectUserEmail)
      .subscribe((email) => (this.email = email));
  }

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
  simulateContract$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestSimulation),
      switchMap((action) =>
        this.contractService.validateContract(action.payload.payload).pipe(
          mergeMap((validationResponse) => {
            if (isEmpty(validationResponse)) {
              this.notification.showError('No Response from Server');
              return of(
                requestSimulationFailed({ error: 'Simulation Failed' })
              );
            }

            const isFailed = validationResponse.some((valid) => !valid.status);
            if (isFailed) {
              const snackBarRef = this.snackBar.open(
                'Contract Basic Validation Failed',
                'View Details',
                {
                  duration: 10000,
                  horizontalPosition: 'end',
                  verticalPosition: 'top',
                  panelClass: ['error-snackbar'],
                }
              );

              // Open dialog on snackbar action click
              snackBarRef.onAction().subscribe(() => {
                this.dialog.open(BasicValcheckDialogComponent, {
                  minWidth: 900,
                  minHeight: 500,
                  data: {
                    data: validationResponse,
                    status: {
                      text: 'failed',
                      className: 'failed',
                    },
                  },
                });
              });

              return of(
                requestSimulationFailed({ error: 'Validation Failed' })
              );
            }

            // Prepare payload and URL
            let payload: QuoteDetailsType | { simulatedBy: string } =
              structuredClone(action.payload.payload);
            const url =
              payload.isUpdated === 'Yes'
                ? '/qqoperator/updatesimulate'
                : '/qqoperator/simulatequote';
            if (payload.isUpdated === 'Yes') {
              payload.commercialContract!.simulatedBy = this.email;
              payload.commercialContract!.updatedBy = this.email;
              payload.commercialContract!.basicValDesc =
                JSON.stringify(validationResponse);
              payload.commercialContract!.basicValStatus = 'VAL_SUCCESS';
            } else payload = { simulatedBy: this.email };

            // Make the simulation request
            return this.contractService.postSimulateContract(payload, url).pipe(
              exhaustMap((simulationResponse) => {
                if (!isEmpty(simulationResponse))
                  this.notification.showSuccess('Simulation Successful...');
                return concat(
                  of(requestSimulationSuccess({ simulationResponse })),
                  of(
                    fetchContractOverview({
                      sourceSystemHeaderId:
                        action.payload.payload.commercialContract
                          ?.sourceSystemHeaderId,
                    })
                  ).pipe(delay(3000))
                );
              }),
              catchError((err) => {
                return of(requestSimulationFailed({ error: err.message }));
              })
            );
          }),
          catchError((error) =>
            of(requestSimulationFailed({ error: error.message }))
          )
        )
      )
    )
  );
}
