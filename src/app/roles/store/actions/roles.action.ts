import { createAction, props } from '@ngrx/store';
import { RoleType } from '../../../models/role.model';
import { PermissionType } from '../../../models/permission.model';

//FETCH Roles
export const fetchRoles = createAction('[ROLES][FETCH][ROLES] FETCH ROLES');
export const fetchRolesSuccess = createAction(
  '[ROLES][FETCH][ROLES] FETCH ROLES SUCCESS',
  props<{ roles: Array<RoleType> }>()
);
export const fetchRolesFailed = createAction(
  '[ROLES][FETCH][ROLES] FETCH ROLES FAILED',
  props<{ error: string }>()
);
//CREATE Roles
export const createRoles = createAction(
  '[ROLES][CREATE][ROLES] CREATE ROLES',
  props<{ roles: Array<{ slug: string; title: string }> }>()
);
export const createRolesSuccess = createAction(
  '[ROLES][CREATE][ROLES][SUCCESS] CREATE ROLES SUCCESS',
  props<{ roles: Array<RoleType> }>()
);
export const createRolesFailed = createAction(
  '[ROLES][CREATE][ROLES][FAILED] CREATE ROLES FAILED',
  props<{ error: string }>()
);
//delete Roles
export const deleteRoles = createAction(
  '[ROLES][DELETE][ROLES] DELETE ROLES',
  props<{ ids: Array<string> }>()
);
export const deleteRolesSuccess = createAction(
  '[ROLES][DELETE][ROLES][SUCCESS] DELETE ROLES SUCCESS',
  props<{ id: string }>()
);
export const deleteRolesFailed = createAction(
  '[ROLES][DELETE][ROLES][FAILED] DELETE ROLES FAILED',
  props<{ error: string }>()
);
// fetch permissions
export const fetchPermissions = createAction(
  '[ROLES][PERMISSIONS][FETCH][PERMISSIONS] FETCH PERMISSIONS'
);
export const fetchPermissionsSuccess = createAction(
  '[ROLES][PERMISSIONS][FETCH][PERMISSIONS][SUCCESS] FETCH PERMISSIONS SUCCESS',
  props<{ permissions: Array<RoleType> }>()
);
export const fetchPermissionsFailed = createAction(
  '[ROLES][PERMISSIONS][FETCH][PERMISSIONS][FAILED] FETCH PERMISSIONS FAILED',
  props<{ error: string }>()
);
// Add Permissions to Role
export const addPermissionsToRole = createAction(
  '[ROLE][ADD][PERMISSIONS] ADD PERMISSOINS TO ROLE',
  props<{ id: string; permissions: Array<string> }>()
);
export const addPermissionsToRoleSuccess = createAction(
  '[ROLES][ADD][PERMISSIONS][SUCCESS] ADD PERMISSOINS TO ROLE SUCCESS',
  props<{ permissions: PermissionType[] }>()
);
export const addPermissionsToRoleFailed = createAction(
  '[ROLES][ADD][PERMISSIONS][FAILED] ADD PERMISSOINS TO ROLE FAILED',
  props<{ error: string }>()
);
// Remove Permissions to Role
export const removePermissionFromRole = createAction(
  '[ROLES][REMOVE][PERMISSIONS] REMOVE PERMISSIONS FROM ROLE',
  props<{ id: string; permissions: Array<string> }>()
);
export const removePermissionFromRoleSuccess = createAction(
  '[ROLES][REMOVE][PERMISSIONS][SUCCESS] REMOVE PERMISSIONS FROM ROLE SUCCESS',
  props<{ permissions: PermissionType[] }>()
);
export const removePermissionFromRoleFailed = createAction(
  '[ROLES][REMOVE][PERMISSIONS][FAILED] REMOVE PERMISSIONS FROM ROLE FAILED',
  props<{ error: string }>()
);

// Role Permissions
export const fetchRolePermissions = createAction(
  '[ROLES][FETCH][PERMISSIONS] FETCH ROLES PERMISSIONS',
  props<{ id: string }>()
);
export const fetchRolePermissionsSuccess = createAction(
  '[ROLES][FETCH][PERMISSIONS][SUCCESS] FETCH ROLES PERMISSIONS SUCCESS',
  props<{ permissions: Array<PermissionType> }>()
);
export const fetchRolePermissionsFailed = createAction(
  '[ROLES][FETCH][PERMISSIONS] FETCH ROLES PERMISSIONS FAILED',
  props<{ error: string }>()
);
// Role Status Update
export const updateRoleStatus = createAction(
  '[ROLES][STATUS][UPDATE] ROLE STATUS UPDATE',
  props<{ roles: Array<{ role: string; status: boolean }> }>()
);
export const updateRoleStatusSuccess = createAction(
  '[ROLES][STATUS][UPDATE][SUCCESS] ROLE STATUS UPDATE SUCCESS',
  props<{ status: string }>()
);
export const updateRoleStatusFailed = createAction(
  '[ROLES][STATUS][UPDATE][FAILED] ROLE STATUS UPDATE FAILED',
  props<{ error: string }>()
);
