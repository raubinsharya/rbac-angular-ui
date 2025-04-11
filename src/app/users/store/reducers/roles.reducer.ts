import { createReducer, on } from '@ngrx/store';
import { RoleType } from '../../../models/role.model';
import {
  fetchRoles,
  fetchRolesFailed,
  fetchRolesSuccess,
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
  on(fetchRoles, (state) => ({ ...state, loading: true, roles: null })),
  on(fetchRolesSuccess, (state, { roles }) => ({
    ...state,
    loading: false,
    roles,
  })),
  on(fetchRolesFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    roles: null,
  }))
);
