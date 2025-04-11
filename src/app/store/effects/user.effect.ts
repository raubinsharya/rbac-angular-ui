import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../services/user.service';
import {
  userLogin,
  userLoginSuccess,
  userLoginFailed,
  fetchUserProfile,
  fetchUserProfileSuccess,
  fetchUserProfileFailed,
  fetchUserProfilePermissions,
  fetchUserProfilePermissionsSuccess,
  fetchUserProfilePermissionsFailed,
} from '../actions/user.action';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly router: Router
  ) {}

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLogin),
      exhaustMap(({ email, password }) =>
        this.userService.login({ email, password }).pipe(
          switchMap((response) => {
            localStorage.setItem('token', response.token);
            this.notificationService.showSuccess('Login Successful', 'Success');
            return this.userService.fetchUserProfilePermissions().pipe(
              tap({
                next: () => {
                  this.router.navigate(['/']);
                },
                error: () => {
                  this.router.navigate(['/']);
                },
              }),
              map(() => userLoginSuccess({ user: response.user })),
              catchError(() => of(userLoginSuccess({ user: response.user })))
            );
          }),
          catchError((error) => of(userLoginFailed({ error: error.message })))
        )
      )
    )
  );
  fetchUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUserProfile),
      exhaustMap(() =>
        this.userService.getUserProfile().pipe(
          map((profile) => {
            return fetchUserProfileSuccess({ user: profile });
          }),
          catchError((error) => of(fetchUserProfileFailed({ errors: error })))
        )
      )
    )
  );
  fetchUserProfilePermissions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUserProfilePermissions),
      exhaustMap(() =>
        this.userService.fetchUserProfilePermissions().pipe(
          map((permissions) => {
            return fetchUserProfilePermissionsSuccess({ permissions });
          }),
          catchError((error) =>
            of(fetchUserProfilePermissionsFailed({ errors: error }))
          )
        )
      )
    )
  );
}
