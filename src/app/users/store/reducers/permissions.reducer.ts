import { createReducer, on } from '@ngrx/store';
import {
  fetchUserPermissions,
  fetchUserPermissionsFailed,
  fetchUserPermissionsSuccess,
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
  on(fetchUserPermissions, (state) => ({ ...state, loading: true })),
  on(fetchUserPermissionsSuccess, (state, { permissions }) => ({
    ...state,
    loading: false,
    permissions,
  })),
  on(fetchUserPermissionsFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
