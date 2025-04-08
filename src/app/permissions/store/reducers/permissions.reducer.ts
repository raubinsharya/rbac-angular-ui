import { createReducer, on } from '@ngrx/store';
import { PermissionType } from '../../../models/permission.model';
import {
  fetchPermissions,
  fetchPermissionsSuccess,
  fetchPermissionsFailed,
} from '../actions/permissions.action';

export interface PermissionsState {
  error: string | null;
  loading: boolean;
  permissions: Array<PermissionType> | null;
}

export const initialState: PermissionsState = {
  error: null,
  loading: false,
  permissions: null,
};

export const permissionsReducer = createReducer(
  initialState,
  on(fetchPermissions, (state) => ({
    ...state,
    loading: true,
    permissions: [],
  })),
  on(fetchPermissionsSuccess, (state, { permissions }) => ({
    ...state,
    loading: false,
    permissions,
  })),
  on(fetchPermissionsFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    permissions: [],
  }))
);
