import { createReducer, on } from '@ngrx/store';
import { RoleType } from '../../model/role.model';
import {
  fetchRoles,
  fetchRolesFailure,
  fetchRoleSuccess,
} from '../actions/user-management.action';

export interface UsersRolesState {
  error: string | null;
  loading: boolean;
  usersRoles: Array<RoleType>;
}

export const initialState: UsersRolesState = {
  error: null,
  loading: false,
  usersRoles: [],
};

export const UsersRolesStateReducer = createReducer(
  initialState,
  on(fetchRoles, (state) => ({
    ...state,
    loading: true,
  })),
  on(fetchRoleSuccess, (state, { roles }) => ({
    ...state,
    loading: false,
    usersRoles: roles,
  })),
  on(fetchRolesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
