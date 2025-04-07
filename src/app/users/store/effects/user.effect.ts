import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../../services/notification.service';
import {
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
}
