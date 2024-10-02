import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import {
  buildAndUpdateOverview,
  resetOverview,
  updateOverview,
} from '../actions/contract-overview.action';

@Injectable()
export class BuildAndUpdateEffect {
  constructor(private actions$: Actions) {}

  triggerOnMultipleActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOverview, resetOverview),
      map(() => buildAndUpdateOverview())
    )
  );
}
