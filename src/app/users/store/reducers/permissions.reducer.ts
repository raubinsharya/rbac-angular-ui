import { createReducer, on } from '@ngrx/store';
import {
  fetchPermissions,
  fetchPermissionsFailed,
  fetchPermissionsSuccess,
} from '../actions/user.action';
import { PermissionType } from '../../../models/permission.model';

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
    permissions: null,
  })),
  on(fetchPermissionsSuccess, (state, { permissions }) => ({
    ...state,
    loading: false,
    permissions,
  })),
  on(fetchPermissionsFailed, (state, { error }) => ({
    ...state,
    loading: false,
    permissions: null,
    error,
  }))
);
