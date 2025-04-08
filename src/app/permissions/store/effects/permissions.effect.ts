import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  createPermissions,
  createPermissionsFailed,
  deletePermissions,
  deletePermissionsFailed,
  fetchPermissions,
  fetchPermissionsFailed,
  fetchPermissionsSuccess,
  updatePermissionsStatus,
  updatePermissionsStatusFailed,
} from '../actions/permissions.action';
import { PermissionsService } from '../../services/permissions.service';

@Injectable()
export class PermissionsEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly permissionService: PermissionsService
  ) {}

  fetchPermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchPermissions),
      exhaustMap(() =>
        this.permissionService.fetchPermissions().pipe(
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

  updatePermissionStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePermissionsStatus),
      exhaustMap(({ permissions }) =>
        this.permissionService.updatePermissionstatus(permissions).pipe(
          map((response) => {
            return fetchPermissionsSuccess({ permissions: response });
          }),
          catchError((error) =>
            of(
              updatePermissionsStatusFailed({ error: error.message }),
              fetchPermissions()
            )
          )
        )
      )
    )
  );

  createPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPermissions),
      exhaustMap(({ permissions }) =>
        this.permissionService.createPermissions(permissions).pipe(
          map(() => {
            return fetchPermissions();
          }),
          catchError((error) =>
            of(
              createPermissionsFailed({ error: error.message }),
              fetchPermissions()
            )
          )
        )
      )
    )
  );
  deletePermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePermissions),
      exhaustMap(({ ids }) =>
        this.permissionService.deletePermissions(ids).pipe(
          map((response) => {
            return fetchPermissionsSuccess({ permissions: response });
          }),
          catchError((error) =>
            of(
              deletePermissionsFailed({ error: error.message }),
              fetchPermissions()
            )
          )
        )
      )
    )
  );
}
