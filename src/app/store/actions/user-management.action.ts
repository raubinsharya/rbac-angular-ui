import { createAction, props } from '@ngrx/store';
import { UserRoleInterface } from '../../models/user-management.model';

export const fetchUserRoles = createAction(
  '[USER][MANAGEMENT][FETCH] FETCH ROLES',
  props<{ email: string; name: string | undefined }>()
);
export const fetchUserRolesSuccess = createAction(
  '[USER][MANAGEMENT][FETCH][SUCCESS] FETCH ROLES SUCCESS',
  props<{ userRoles: UserRoleInterface[]; name: string | undefined }>()
);
export const fetchUserRolesFailed = createAction(
  '[USER][MANAGEMENT][FETCH][FAILED] FETCH ROLES FAILED',
  props<{ error: string; name: string | undefined }>()
);
