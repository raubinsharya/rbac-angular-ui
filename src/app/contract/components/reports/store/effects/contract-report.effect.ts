import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  fetchContractReport,
  fetchContractReportFailure,
  fetchContractReportSuccess,
} from '../actions/contract-report.action';
import { ContractReportService } from '../../services/contract-report.service';

@Injectable()
export class ContractReportEffect {
  constructor(
    private actions$: Actions,
    private contractReportService: ContractReportService
  ) {}

  fetchContractBookingStatusReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchContractReport),
      switchMap(({ payload }) =>
        this.contractReportService
          .fetchContractBookingStatusReport(payload)
          .pipe(
            map((reportData) => fetchContractReportSuccess({ reportData })),
            catchError((error) => of(fetchContractReportFailure(error)))
          )
      )
    )
  );
}
