import { createReducer, on } from '@ngrx/store';
import { PermissionType } from '../../../models/permission.model';
import {
  fetchPermissions,
  fetchPermissionsFailed,
  fetchPermissionsSuccess,
  fetchRolePermissions,
  fetchRolePermissionsFailed,
  fetchRolePermissionsSuccess,
} from '../actions/roles.action';

export interface RolePermissionsState {
  error: string | null;
  loading: boolean;
  rolePermissions: Array<PermissionType> | null;
}

export const initialState: RolePermissionsState = {
  error: null,
  loading: false,
  rolePermissions: null,
};

export const rolePermissionsReducer = createReducer(
  initialState,
  on(fetchRolePermissions, (state) => ({
    ...state,
    loading: true,
    rolePermissions: null,
  })),
  on(fetchRolePermissionsSuccess, (state, { permissions }) => ({
    ...state,
    loading: false,
    rolePermissions: permissions,
  })),
  on(fetchRolePermissionsFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    rolePermissions: null,
  }))
);
