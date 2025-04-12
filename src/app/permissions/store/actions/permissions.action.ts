import { createAction, props } from '@ngrx/store';
import { PermissionType } from '../../../models/permission.model';

//FETCH Permissions
export const fetchPermissions = createAction(
  '[PERMISSIONS][FETCH][PERMISSIONS] FETCH PERMISSIONS'
);
export const fetchPermissionsSuccess = createAction(
  '[PERMISSIONS][FETCH][PERMISSIONS] FETCH PERMISSIONS SUCCESS',
  props<{ permissions: Array<PermissionType> }>()
);
export const fetchPermissionsFailed = createAction(
  '[PERMISSIONS][FETCH][PERMISSIONS] FETCH PERMISSIONS FAILED',
  props<{ error: string }>()
);
//CREATE PERMISSIONS
export const createPermissions = createAction(
  '[PERMISSIONS][CREATE][PERMISSIONS] CREATE PERMISSIONS',
  props<{ permissions: Array<{ slug: string; title: string }> }>()
);
export const createPermissionsSuccess = createAction(
  '[PERMISSIONS][CREATE][PERMISSIONS][SUCCESS] CREATE PERMISSIONS SUCCESS',
  props<{ PERMISSIONS: Array<PermissionType> }>()
);
export const createPermissionsFailed = createAction(
  '[PERMISSIONS][CREATE][PERMISSIONS][FAILED] CREATE PERMISSIONS FAILED',
  props<{ error: string }>()
);
//delete PERMISSIONS
export const deletePermissions = createAction(
  '[PERMISSIONS][DELETE][PERMISSIONS] DELETE PERMISSIONS',
  props<{ ids: Array<string> }>()
);
export const deletePermissionsSuccess = createAction(
  '[PERMISSIONS][DELETE][PERMISSIONS][SUCCESS] DELETE PERMISSIONS SUCCESS',
  props<{ id: string }>()
);
export const deletePermissionsFailed = createAction(
  '[PERMISSIONS][DELETE][PERMISSIONS][FAILED] DELETE PERMISSIONS FAILED',
  props<{ error: string }>()
);

// Permissions Status Update
export const updatePermissionsStatus = createAction(
  '[PERMISSIONS][STATUS][UPDATE] PERMISSIONS STATUS UPDATE',
  props<{ permissions: Array<{ permission: string; status: boolean }> }>()
);
export const updatePermissionsStatusSuccess = createAction(
  '[PERMISSIONS][STATUS][UPDATE][SUCCESS] PERMISSIONS STATUS UPDATE SUCCESS',
  props<{ status: string }>()
);
export const updatePermissionsStatusFailed = createAction(
  '[PERMISSIONS][STATUS][UPDATE][FAILED] PERMISSIONS STATUS UPDATE FAILED',
  props<{ error: string }>()
);
