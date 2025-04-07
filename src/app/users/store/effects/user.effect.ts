import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../../services/notification.service';
import {
  addRolesToUser,
  deleteRolesToUser,
  fetchRoles,
  fetchRolesFailed,
  fetchRolesSuccess,
  fetchUserRoles,
  fetchUserRolesFailed,
  fetchUserRolesSuccess,
  fetchUsers,
  fetchUsersFailed,
  fetchUsersSuccess,
} from '../actions/user.action';
import { UsersService } from '../../services/user.service';

@Injectable()
export class UsersEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly store: Store,
    private readonly usersService: UsersService
  ) {}

  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUsers),
      exhaustMap(() =>
        this.usersService.fetchUsers().pipe(
          map((response) => {
            return fetchUsersSuccess({ users: response });
          }),
          catchError((error) => of(fetchUsersFailed({ error: error.message })))
        )
      )
    )
  );
  fetchUserRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUserRoles),
      exhaustMap(({ id }) =>
        this.usersService.fetchUserRoles(id).pipe(
          map((response) => {
            return fetchUserRolesSuccess({ roles: response });
          }),
          catchError((error) =>
            of(fetchUserRolesFailed({ error: error.message }))
          )
        )
      )
    )
  );
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
  addRolesToUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRolesToUser),
      exhaustMap(({ ids, userId }) =>
        this.usersService.addRolesToUser(userId, ids).pipe(
          map(() => {
            return fetchUserRoles({ id: userId });
          }),
          catchError((error) => of(fetchRolesFailed({ error: error.message })))
        )
      )
    )
  );
  deleteRolesToUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRolesToUser),
      exhaustMap(({ ids, userId }) =>
        this.usersService.deleteRolesToUser(userId, ids).pipe(
          map(() => {
            return fetchUserRoles({ id: userId });
          }),
          catchError((error) => of(fetchRolesFailed({ error: error.message })))
        )
      )
    )
  );
}
