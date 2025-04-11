import { createReducer, on } from '@ngrx/store';
import { RoleType } from '../../../models/role.model';
import {
  fetchUserRoles,
  fetchUserRolesFailed,
  fetchUserRolesSuccess,
} from '../actions/user.action';

export interface UserRolesState {
  errors: Array<{ message: string }> | null;
  loading: boolean;
  userRoles: Array<RoleType> | null;
}

export const initialState: UserRolesState = {
  errors: null,
  loading: false,
  userRoles: null,
};

export const userRolesReducer = createReducer(
  initialState,
  on(fetchUserRoles, (state) => ({ ...state, loading: true, userRoles: null })),
  on(fetchUserRolesSuccess, (state, { roles }) => ({
    ...state,
    loading: false,
    userRoles: roles,
  })),
  on(fetchUserRolesFailed, (state, { errors }) => ({
    ...state,
    loading: false,
    errors,
    userRoles: null,
  }))
);
