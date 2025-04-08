import { createReducer, on } from '@ngrx/store';
import {
  fetchUserPermissions,
  fetchUserPermissionsFailed,
  fetchUserPermissionsSuccess,
} from '../actions/user.action';
import { PermissionType } from '../../../models/permission.model';

export interface UserPermissionsState {
  error: string | null;
  loading: boolean;
  userPermissions: Array<PermissionType> | null;
}

export const initialState: UserPermissionsState = {
  error: null,
  loading: false,
  userPermissions: null,
};

export const userPermissionsReducer = createReducer(
  initialState,
  on(fetchUserPermissions, (state) => ({
    ...state,
    loading: true,
    userPermissions: [],
  })),
  on(fetchUserPermissionsSuccess, (state, { permissions }) => ({
    ...state,
    loading: false,
    userPermissions: permissions,
  })),
  on(fetchUserPermissionsFailed, (state, { error }) => ({
    ...state,
    loading: false,
    userPermissions: [],
    error,
  }))
);
