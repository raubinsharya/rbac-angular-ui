import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  fetchPermissions,
  fetchPermissionsFailed,
  fetchPermissionsSuccess,
} from '../actions/roles.action';
import { RolesService } from '../../services/roles.service';

@Injectable()
export class RolesPermissionsEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly rolesService: RolesService
  ) {}

  fetchPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchPermissions),
      exhaustMap(() =>
        this.rolesService.fetchPermissions().pipe(
          map((response) => {
            return fetchPermissionsSuccess({ permissions: response });
          }),
          catchError((error) =>
            of(fetchPermissionsFailed({ error: error.message }))
          )
        )
      )
    )
  );
}
