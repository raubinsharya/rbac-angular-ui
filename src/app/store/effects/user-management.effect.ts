import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  fetchUserRoles,
  fetchUserRolesFailed,
  fetchUserRolesSuccess,
} from '../actions/user-management.action';
import { UserManagementService } from '../../services/user-management.service';

@Injectable()
export class UserManagementEffect {
  constructor(
    private actions$: Actions,
    private userManagementService: UserManagementService
  ) {}

  fetchUserRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUserRoles),
      exhaustMap(({ email, name }) =>
        this.userManagementService.fetchUserRoles(email).pipe(
          map((userRoles) =>
            fetchUserRolesSuccess({
              userRoles: userRoles,
              name: name,
              email: email,
            })
          ),
          catchError((error) =>
            of(fetchUserRolesFailed({ error: error.message, name }))
          )
        )
      )
    )
  );
}
