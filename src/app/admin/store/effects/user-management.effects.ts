import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  map,
  mergeMap,
  toArray,
} from 'rxjs/operators';
import { concat, from, of } from 'rxjs';
import {
  addRolesToUser,
  addRolesToUserFailure,
  addRolesToUserSuccess,
  fetchRoles,
  fetchRolesFailure,
  fetchRoleSuccess,
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
  removeRolesToUser,
  removeRolesToUserFailure,
  removeRolesToUserSuccess,
} from '../actions/user-management.action';
import { UserManagementService } from '../../services/user-management.service';
import { isEmpty } from 'lodash';
import { NotificationService } from '../../../services/notification.service';

@Injectable()
export class UserManagementEffects {
  constructor(
    private actions$: Actions,
    private userManagementService: UserManagementService,
    private notification: NotificationService
  ) {}

  loadUsersLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUsers),
      mergeMap(({ applicationId }) =>
        this.userManagementService.fetchUsers(applicationId).pipe(
          map((usersList) => fetchUsersSuccess({ usersList })),
          catchError((error) => of(fetchUsersFailure({ error: error.message })))
        )
      )
    )
  );
  loadUsersRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRoles),
      mergeMap(({ applicationId }) =>
        this.userManagementService.fetchRoles(applicationId).pipe(
          map((roles) => fetchRoleSuccess({ roles })),
          catchError((error) => of(fetchRolesFailure({ error: error.message })))
        )
      )
    )
  );

  addRolesToUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRolesToUser),
      filter(({ roleIDs, email }) => !isEmpty(roleIDs) && !isEmpty(email)),
      exhaustMap(({ roleIDs, email }) =>
        this.userManagementService.addRolesToUser(roleIDs, email).pipe(
          concatMap((userAddResponse) => {
            this.notification.showSuccess(
              userAddResponse.message,
              userAddResponse.email
            );
            return [addRolesToUserSuccess({ userAddResponse }), fetchUsers({})];
          }),
          catchError((error) =>
            of(addRolesToUserFailure({ error: error.message }))
          )
        )
      )
    )
  );

  removeRolesToUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeRolesToUser),
      filter(({ roleIDs, email }) => !isEmpty(roleIDs) && !isEmpty(email)),
      mergeMap(({ roleIDs, email }) =>
        from(roleIDs).pipe(
          mergeMap((roleID) =>
            this.userManagementService
              .removeRoleToUser(roleID, email)
              .pipe(catchError((error) => of({ roleID, error })))
          ),
          toArray(),
          concatMap((responses) => {
            this.notification.showSuccess(
              'Roles Removed Successfully',
              'Role Removal'
            );
            return [
              removeRolesToUserSuccess({
                userRoleRemoveResponse: responses,
              }),
              fetchUsers({}),
            ];
          }),
          catchError((error) =>
            of(removeRolesToUserFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
