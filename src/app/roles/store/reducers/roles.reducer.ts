import { createReducer, on } from '@ngrx/store';
import { RoleType } from '../../../models/role.model';
import {
  createRolesSuccess,
  fetchRoles,
  fetchRolesFailed,
  fetchRolesSuccess,
} from '../actions/roles.action';

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
