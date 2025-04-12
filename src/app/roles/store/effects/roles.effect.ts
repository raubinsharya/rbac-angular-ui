import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../../services/notification.service';
import {
  addPermissionsToRole,
  addPermissionsToRoleFailed,
  createRoles,
  createRolesFailed,
  createRolesSuccess,
  deleteRoles,
  fetchRolePermissions,
  fetchRolePermissionsFailed,
  fetchRolePermissionsSuccess,
  fetchRoles,
  fetchRolesFailed,
  fetchRolesSuccess,
  removePermissionFromRole,
  removePermissionFromRoleFailed,
  updateRoleStatus,
  updateRoleStatusFailed,
} from '../actions/roles.action';
import { RolesService } from '../../services/roles.service';

@Injectable()
export class RolesEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly store: Store,
    private readonly rolesService: RolesService
  ) {}

  fetchRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRoles),
      exhaustMap(() =>
        this.rolesService.fetchRoles().pipe(
          map((response) => {
            return fetchRolesSuccess({ roles: response });
          }),
          catchError((error) => of(fetchRolesFailed({ error: error.message })))
        )
      )
    )
  );
  fetchRolePermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRolePermissions),
      exhaustMap(({ id }) =>
        this.rolesService.fetchRolePermissions(id).pipe(
          map((response) => {
            return fetchRolePermissionsSuccess({ permissions: response });
          }),
          catchError((error) =>
            of(fetchRolePermissionsFailed({ error: error.message }))
          )
        )
      )
    )
  );
  addRolePermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addPermissionsToRole),
      exhaustMap(({ id, permissions }) =>
        this.rolesService.addRolePermissions(id, permissions).pipe(
          map(() => {
            return fetchRolePermissions({ id });
          }),
          catchError((error) =>
            of(addPermissionsToRoleFailed({ error: error.message }))
          )
        )
      )
    )
  );
  removeRolePermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removePermissionFromRole),
      exhaustMap(({ id, permissions }) =>
        this.rolesService.removeRolePermissions(id, permissions).pipe(
          map(() => {
            return fetchRolePermissions({ id });
          }),
          catchError((error) =>
            of(removePermissionFromRoleFailed({ error: error.message }))
          )
        )
      )
    )
  );
  updateRoleStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRoleStatus),
      exhaustMap(({ roles }) =>
        this.rolesService.updateRoleStatus(roles).pipe(
          map((response) => {
            return fetchRolesSuccess({ roles: response });
          }),
          catchError((error) =>
            of(updateRoleStatusFailed({ error: error.message }), fetchRoles())
          )
        )
      )
    )
  );
  createRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createRoles),
      exhaustMap(({ roles }) =>
        this.rolesService.createRoles(roles).pipe(
          map(() => {
            return fetchRoles();
          }),
          catchError((error) =>
            of(createRolesFailed({ error: error.message }), fetchRoles())
          )
        )
      )
    )
  );
  deleteRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRoles),
      exhaustMap(({ ids }) =>
        this.rolesService.deleteRoles(ids).pipe(
          map(() => {
            return fetchRoles();
          }),
          catchError((error) =>
            of(createRolesFailed({ error: error.message }), fetchRoles())
          )
        )
      )
    )
  );
}
