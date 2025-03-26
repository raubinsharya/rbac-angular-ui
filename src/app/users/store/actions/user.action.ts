import { createAction, props } from '@ngrx/store';
import { UserProfileResponseType } from '../../../models/user.model';

export const fetchUsers = createAction('[USERS][FETCH] FETCH USERS');
export const fetchUsersSuccess = createAction(
  '[USERS][FETCH] FETCH USERS SUCCESS',
  props<{ users: Array<UserProfileResponseType> }>()
);
export const fetchUsersFailed = createAction(
  '[USERS][FETCH] FETCH USERS FAILED',
  props<{ error: string }>()
);
