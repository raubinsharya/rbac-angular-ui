import { createAction, props } from '@ngrx/store';
import { UserProfileResponseType } from '../../../models/user.model';
import { RoleType } from '../../../models/role.model';

export const fetchUsers = createAction('[USERS][FETCH] FETCH USERS');
export const fetchUsersSuccess = createAction(
  '[USERS][FETCH] FETCH USERS SUCCESS',
  props<{ users: Array<UserProfileResponseType> }>()
);
export const fetchUsersFailed = createAction(
  '[USERS][FETCH] FETCH USERS FAILED',
  props<{ error: string }>()
);
export const fetchUserRoles = createAction(
  '[USERS][FETCH][ROLES] FETCH USERS ROLES',
  props<{ id: string }>()
);
export const fetchUserRolesSuccess = createAction(
  '[USERS][FETCH][ROLES] FETCH USERS ROLES SUCCESS',
  props<{ roles: Array<RoleType> }>()
);
export const fetchUserRolesFailed = createAction(
  '[USERS][FETCH][ROLES] FETCH USERS ROLES FAILED',
  props<{ error: string }>()
);
//Roles
export const fetchRoles = createAction('[ROLES][FETCH][ROLES] FETCH ROLES');
export const fetchRolesSuccess = createAction(
  '[ROLES][FETCH][ROLES] FETCH ROLES SUCCESS',
  props<{ roles: Array<RoleType> }>()
);
export const fetchRolesFailed = createAction(
  '[ROLES][FETCH][ROLES] FETCH ROLES FAILED',
  props<{ error: string }>()
);
//add Roles
export const addRolesToUser = createAction(
  '[ADD][ROLES][USER] ADD ROLES TO USER',
  props<{ userId: string; ids: Array<string> }>()
);
export const addRolesToUserSuccess = createAction(
  '[ADD][ROLES][USER][SUCCESS] ADD ROLES TO USER SUCCESS',
  props<{ roles: Array<RoleType> }>()
);
export const addRolesToUserFailed = createAction(
  '[ADD][ROLES][USER][FAILED] ADD ROLES TO USER FAILED',
  props<{ error: string }>()
);
//delete Roles
export const deleteRolesToUser = createAction(
  '[DELETE][ROLES][USER] DELETE ROLES TO USER',
  props<{ userId: string; ids: Array<string> }>()
);
export const deleteRolesToUserSuccess = createAction(
  '[DELETE][ROLES][USER][SUCCESS] DELETE ROLES TO USER SUCCESS',
  props<{ roles: Array<RoleType> }>()
);
export const deleteRolesToUserFailed = createAction(
  '[DELETE][ROLES][USER][FAILED] DELETE ROLES TO USER FAILED',
  props<{ error: string }>()
);
