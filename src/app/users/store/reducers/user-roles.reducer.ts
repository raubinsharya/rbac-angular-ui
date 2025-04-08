import { createReducer, on } from '@ngrx/store';
import { RoleType } from '../../../models/role.model';
import {
  fetchUserRoles,
  fetchUserRolesFailed,
  fetchUserRolesSuccess,
} from '../actions/user.action';

export interface UserRolesState {
  error: string | null;
  loading: boolean;
  userRoles: Array<RoleType> | null;
}

export const initialState: UserRolesState = {
  error: null,
  loading: false,
  userRoles: null,
};

export const userRolesReducer = createReducer(
  initialState,
  on(fetchUserRoles, (state) => ({ ...state, loading: true, userRoles: [] })),
  on(fetchUserRolesSuccess, (state, { roles }) => ({
    ...state,
    loading: false,
    userRoles: roles,
  })),
  on(fetchUserRolesFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    userRoles: [],
  }))
);
