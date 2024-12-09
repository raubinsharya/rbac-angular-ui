import { createAction, props } from '@ngrx/store';
import { UserListType } from '../../model/user.model';
import { RoleType } from '../../model/role.model';
import { RoleAddResponse } from '../../services/user-management.service';

export const updateBaseUrl = createAction(
  '[USERMANAGEMENT][BASEURL] UPDATE BASE URL',
  props<{ baseUrl: string; applicationId: number }>()
);

export const fetchRoles = createAction(
  '[USERMANAGEMENT][ROLES] Fetch Roles',
  props<{ applicationId: number }>()
);
export const fetchRoleSuccess = createAction(
  '[USERMANAGEMENT][ROLES] Fetch Roles Success',
  props<{ roles: RoleType[] }>()
);
export const fetchRolesFailure = createAction(
  '[USERMANAGEMENT][ROLES] Fetch Roles Failure',
  props<{ error: string }>()
);

export const fetchUsers = createAction('[USERMANAGEMENT][USERS] Fetch USERS');
export const fetchUsersSuccess = createAction(
  '[USERMANAGEMENT][USERS] Fetch USERS Success',
  props<{ usersList: UserListType[] }>()
);
export const fetchUsersFailure = createAction(
  '[USERMANAGEMENT][USERS] Fetch USERS Failure',
  props<{ error: string }>()
);

// create user
export const createUser = createAction(
  '[USERMANAGEMENT][CREATE][USER] CREATE USER',
  props<{ email: string; roleIDs: Array<number> }>()
);
export const createUserSuccess = createAction(
  '[USERMANAGEMENT][CREATE][USER][SUCCESS] CREATE USER SUCCESS',
  props<{ createUserResponse: RoleAddResponse }>()
);
export const createUserFailure = createAction(
  '[USERMANAGEMENT][CREATE][USER][FAILURE] CREATE USER FAILURE',
  props<{ error: string }>()
);
// ADD ROLES TO USER
export const addRolesToUser = createAction(
  '[USERMANAGEMENT][ROLES][ADD] ADD ROLES',
  props<{ roleIDs: Array<number>; email: string }>()
);
export const addRolesToUserSuccess = createAction(
  '[USERMANAGEMENT][ROLES][ADD] ADD ROLES SUCCESS ',
  props<{ userAddResponse: RoleAddResponse }>()
);
export const addRolesToUserFailure = createAction(
  '[USERMANAGEMENT][ROLES][ADD] ADD ROLES FAILURE',
  props<{ error: string }>()
);
// REMOVE ROLES TO USER
export const removeRolesToUser = createAction(
  '[USERMANAGEMENT][ROLES][REMOVE] REMOVE ROLES',
  props<{ roleIDs: Array<number>; email: string }>()
);
export const removeRolesToUserSuccess = createAction(
  '[USERMANAGEMENT][ROLES][REMOVE] REMOVE ROLES SUCCESS ',
  props<{ userRoleRemoveResponse: any }>()
);
export const removeRolesToUserFailure = createAction(
  '[USERMANAGEMENT][ROLES][REMOVE] REMOVE ROLES FAILURE',
  props<{ error: string }>()
);
export const closeViewUserRoleDialog = createAction(
  '[USERMANAGEMENT][DIALOG][USER][ROLE] CLOSE USER ROLE DIALOG'
);
export const resetSaveButtonUserRoleDialog = createAction(
  '[USERMANAGEMENT][DIALOG][USER][ROLE][RESET][SAVE][BUTTON] RESET SAVE BUTTON USER ROLE DIALOG'
);
