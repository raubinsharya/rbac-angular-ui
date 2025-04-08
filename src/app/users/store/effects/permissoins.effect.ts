import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  fetchPermissions,
  fetchPermissionsFailed,
  fetchPermissionsSuccess,
} from '../actions/user.action';
import { UsersService } from '../../services/user.service';

@Injectable()
export class UsersPermissionsEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly usersService: UsersService
  ) {}

  fetchPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchPermissions),
      exhaustMap(() =>
        this.usersService.fetchPermissions().pipe(
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
