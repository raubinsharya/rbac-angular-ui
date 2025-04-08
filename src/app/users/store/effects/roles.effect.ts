import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  fetchRoles,
  fetchRolesFailed,
  fetchRolesSuccess,
} from '../actions/user.action';
import { UsersService } from '../../services/user.service';

@Injectable()
export class UsersRolesEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly usersService: UsersService
  ) {}

  fetchRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRoles),
      exhaustMap(() =>
        this.usersService.fetchRoles().pipe(
          map((response) => {
            return fetchRolesSuccess({ roles: response });
          }),
          catchError((error) => of(fetchRolesFailed({ error: error.message })))
        )
      )
    )
  );
}
