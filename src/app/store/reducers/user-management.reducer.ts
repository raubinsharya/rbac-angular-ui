import { createReducer, on } from '@ngrx/store';
import { UserRoleInterface } from '../../models/user-management.model';
import {
  fetchUserRoles,
  fetchUserRolesFailed,
  fetchUserRolesSuccess,
} from '../actions/user-management.action';

export interface UserManagementState {
  name: string | undefined;
  userRoles: UserRoleInterface[];
  roles: Array<string>;
  error: string | null;
  loading: boolean;
  salesOrg: Array<string>;
}

export const initialState: UserManagementState = {
  name: '',
  userRoles: [],
  roles: [],
  error: null,
  loading: false,
  salesOrg: [],
};

export const userRolesReducer = createReducer(
  initialState,
  on(fetchUserRoles, (state) => ({
    ...state,
    loading: true,
  })),
  on(fetchUserRolesSuccess, (state, { userRoles, name }) => ({
    ...state,
    name: name,
    userRoles,
    roles: userRoles.map((userRole) => userRole.employeeRole),
    loading: false,
    error: null,
    salesOrg: Array.from(
      new Set(userRoles.map((role) => role.employeeRole?.split('_')?.at(-1)))
    ) as Array<string>,
  })),
  on(fetchUserRolesFailed, (state, { error, name }) => ({
    ...state,
    name,
    loading: false,
    error,
  }))
);
