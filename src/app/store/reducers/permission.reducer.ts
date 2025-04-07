import { createReducer, on } from '@ngrx/store';
import {
  fetchPermissions,
  fetchPermissionsFailed,
  fetchPermissionsSuccess,
} from '../../users/store/actions/user.action';
import { PermissionType } from '../../models/permission.model';

export interface PermissionState {
  error: string | null;
  loading: boolean;
  permissions: PermissionType[] | null;
}

export const initialState: PermissionState = {
  error: null,
  loading: false,
  permissions: null,
};

export const permissionReducer = createReducer(
  initialState,
  on(fetchPermissions, (state) => ({ ...state, loading: true })),
  on(fetchPermissionsSuccess, (state, { permissions }) => ({
    ...state,
    loading: false,
    permissions,
  })),
  on(fetchPermissionsFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
