import { createReducer, on } from '@ngrx/store';
import { RoleType } from '../../../models/role.model';
import {
  fetchUserRoles,
  fetchUserRolesFailed,
  fetchUserRolesSuccess,
} from '../actions/user.action';

export interface RolesState {
  error: string | null;
  loading: boolean;
  roles: Array<RoleType> | null;
}

export const initialState: RolesState = {
  error: null,
  loading: false,
  roles: null,
};

export const rolesReducer = createReducer(
  initialState,
  on(fetchUserRoles, (state) => ({ ...state, loading: true })),
  on(fetchUserRolesSuccess, (state, { roles }) => ({
    ...state,
    loading: false,
    roles,
  })),
  on(fetchUserRolesFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
