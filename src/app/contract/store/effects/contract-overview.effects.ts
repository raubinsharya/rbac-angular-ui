import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  fetchDueLists,
  fetchDueListsSuccess,
  fetchDueListsFailure,
} from '../actions/duelist.action';
import { ContractService } from '../../services/contract.service';
import {
  fetchContractOverview,
  fetchContractOverviewFailure,
  fetchContractOverviewSuccess,
} from '../actions/contract-overview.action';

@Injectable()
export class ContractOverViewEffect {
  constructor(
    private actions$: Actions,
    private contractService: ContractService
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
}
