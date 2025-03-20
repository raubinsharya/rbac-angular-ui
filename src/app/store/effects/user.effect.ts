import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../services/user.service';
import {
  userLogin,
  userLoginSuccess,
  userLoginFailed,
  fetchUserProfile,
  fetchUserProfileSuccess,
  fetchUserProfileFailed,
} from '../actions/user.action';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class UserEffect {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLogin),
      exhaustMap(({ email, password }) =>
        this.userService.login({ email, password }).pipe(
          map((response) => {
            localStorage.setItem('token', response.token);
            this.notificationService.showSuccess('Login Successful', 'Success');
            this.router.navigate(['/']);
            return userLoginSuccess({ user: response.user });
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
          catchError((error) =>
            of(fetchUserProfileFailed({ error: error.message }))
          )
        )
      )
    )
  );
}
