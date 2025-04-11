import { createAction, props } from '@ngrx/store';
import { UserProfileResponseType } from '../../models/user.model';
import { PermissionType } from '../../models/permission.model';

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
  props<{ errors: Array<{ message: string }> }>()
);

export const fetchUserProfilePermissions = createAction(
  '[FETCH][USER][PROFILE][PERMISSIONS] USER PROFILE PERMISSIONS'
);
export const fetchUserProfilePermissionsSuccess = createAction(
  '[FETCH][USER][PROFILE][PERMISSIONS][SUCCESS] USER PROFILE PERMISSIONS SUCCESS',
  props<{ permissions: PermissionType[] }>()
);
export const fetchUserProfilePermissionsFailed = createAction(
  '[FETCH][USER][PROFILE][PERMISSIONS][FAILED] USER PROFILE PERMISSIONS FAILED',
  props<{ errors: Array<{ message: string }> }>()
);
