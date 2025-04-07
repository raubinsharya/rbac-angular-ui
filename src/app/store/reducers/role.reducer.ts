import { createReducer, on } from '@ngrx/store';
import {
  fetchUserProfile,
  fetchUserProfileFailed,
  fetchUserProfileSuccess,
  userLogin,
  userLoginFailed,
  userLoginSuccess,
} from '../actions/user.action';
import { RoleType } from '../../models/role.model';
import {
  fetchRoles,
  fetchRolesFailed,
  fetchRolesSuccess,
} from '../../users/store/actions/user.action';

export interface RoleState {
  error: string | null;
  loading: boolean;
  roles: RoleType[] | null;
}

export const initialState: RoleState = {
  error: null,
  loading: false,
  roles: null,
};

export const roleReducer = createReducer(
  initialState,
  on(fetchRoles, (state) => ({ ...state, loading: true })),
  on(fetchRolesSuccess, (state, { roles }) => ({
    ...state,
    loading: false,
    roles,
  })),
  on(fetchRolesFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
