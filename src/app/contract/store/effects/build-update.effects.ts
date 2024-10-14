import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap } from 'rxjs/operators';
import {
  buildAndUpdateOverview,
  resetOverview,
  updateOverview,
} from '../actions/contract-overview.action';
import { of } from 'rxjs';

@Injectable()
export class BuildAndUpdateEffect {
  constructor(private actions$: Actions) {}

  triggerOnMultipleActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOverview, resetOverview),
      exhaustMap(() => of(buildAndUpdateOverview()))
    )
  );
}
