import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  map,
  mergeMap,
  switchMap,
  toArray,
} from 'rxjs/operators';
import { concat, from, of, throwError } from 'rxjs';
import {
  addRolesToUser,
  addRolesToUserFailure,
  addRolesToUserSuccess,
  closeViewUserRoleDialog,
  createUser,
  fetchRoles,
  fetchRolesFailure,
  fetchRoleSuccess,
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
  removeRolesToUser,
  removeRolesToUserFailure,
  removeRolesToUserSuccess,
  resetSaveButtonUserRoleDialog,
} from '../actions/user-management.action';
import { UserManagementApiService } from '../../services/user-management.service';
import { isEmpty } from 'lodash';
import { NotificationService } from '../../../services/notification.service';

@Injectable()
export class UserManagementEffects {
  constructor(
    private actions$: Actions,
    private userManagementService: UserManagementApiService,
    private notification: NotificationService
  ) {}

  loadUsersLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUsers),
      switchMap(({ applicationId }) =>
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
      switchMap(({ applicationId }) =>
        this.userManagementService.fetchRoles(applicationId).pipe(
          map((roles) => fetchRoleSuccess({ roles })),
          catchError((error) => of(fetchRolesFailure({ error: error.message })))
        )
      )
    )
  );

  saveEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      filter(({ roleIDs, email }) => !isEmpty(roleIDs) && !isEmpty(email)),
      switchMap(({ roleIDs, email }) =>
        this.userManagementService.createUser(email).pipe(
          concatMap(() => {
            this.notification.showSuccess('User Creation successful!', email);
            return [addRolesToUser({ email: email, roleIDs }), fetchUsers({})];
          }),
          catchError((error) =>
            of(
              addRolesToUserFailure({ error: error.message }),
              resetSaveButtonUserRoleDialog()
            )
          )
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
            return [
              addRolesToUserSuccess({ userAddResponse }),
              closeViewUserRoleDialog(),
              fetchUsers({}),
            ];
          }),
          catchError((error) =>
            of(
              addRolesToUserFailure({ error: error.message }),
              resetSaveButtonUserRoleDialog()
            )
          )
        )
      )
    )
  );

  removeRolesToUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeRolesToUser),
      filter(({ roleIDs, email }) => !isEmpty(roleIDs) && !isEmpty(email)),
      switchMap(({ roleIDs, email }) =>
        from(roleIDs).pipe(
          concatMap((roleID) =>
            this.userManagementService.removeRoleToUser(roleID, email).pipe(
              catchError(
                (error) => throwError(() => new Error(error.message)) // Propagate the error
              )
            )
          ),
          toArray(), // Collect all responses into an array
          concatMap((responses) => {
            this.notification.showSuccess('Roles Removal Successful!');
            return [
              removeRolesToUserSuccess({ userRoleRemoveResponse: responses }),
              closeViewUserRoleDialog(),
              fetchUsers({}),
            ];
          }),
          catchError((error) => {
            this.notification.showError(
              'Failed to Remove Roles',
              'Role Removal'
            );
            return of(
              removeRolesToUserFailure({ error: error.message }),
              resetSaveButtonUserRoleDialog()
            );
          })
        )
      )
    )
  );
}
