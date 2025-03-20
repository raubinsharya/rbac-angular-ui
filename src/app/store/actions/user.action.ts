import { createAction, props } from '@ngrx/store';
import { UserProfileResponseType } from '../../models/user.model';

export const userLogin = createAction(
  '[USER][LOGIN] LOGIN',
  props<{ email: string; password: string }>()
);
export const userLoginSuccess = createAction(
  '[USER][LOGIN][SUCCESS] LOGIN SUCCESS',
  props<{ user: UserProfileResponseType }>()
);
export const userLoginFailed = createAction(
  '[USER][LOGIN][FAILED] LOGIN FAILED',
  props<{ error: string }>()
);
export const fetchUserProfile = createAction(
  '[FETCH][USER][PROFILE] USER PROFILE'
);
export const fetchUserProfileSuccess = createAction(
  '[FETCH][USER][PROFILE][SUCCESS] USER PROFILE SUCCESS',
  props<{ user: UserProfileResponseType }>()
);
export const fetchUserProfileFailed = createAction(
  '[FETCH][USER][PROFILE][FAILED] USER PROFILE FAILED',
  props<{ error: string }>()
);
