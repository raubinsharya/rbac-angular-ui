import { createAction, props } from '@ngrx/store';
import { UserRoleInterface } from '../../models/user-management.model';

export const fetchUserRoles = createAction(
  '[USER][MANAGEMENT][FETCH] Fetch Roles',
  props<{ email: string; name: string | undefined }>()
);
export const fetchUserRolesSuccess = createAction(
  '[USER][MANAGEMENT][FETCH][SUCCESS] Fetch Roles',
  props<{ userRoles: UserRoleInterface[]; name: string | undefined }>()
);
export const fetchUserRolesFailed = createAction(
  '[USER][MANAGEMENT][FETCH][FAILED] Fetch Roles',
  props<{ error: string; name: string | undefined }>()
);
