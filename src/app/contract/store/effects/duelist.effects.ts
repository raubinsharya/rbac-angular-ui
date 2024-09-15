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

@Injectable()
export class DueListEffects {
  constructor(
    private actions$: Actions,
    private contractService: ContractService
  ) {}

  loadDueLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchDueLists),
      mergeMap(() =>
        this.contractService.getDueLists().pipe(
          map((dueLists) => fetchDueListsSuccess({ dueLists })),
          catchError((error) =>
            of(fetchDueListsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
