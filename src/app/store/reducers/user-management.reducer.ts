import { createReducer, on } from '@ngrx/store';
import { UserRoleInterface } from '../../models/user-management.model';
import {
  fetchUserRoles,
  fetchUserRolesFailed,
  fetchUserRolesSuccess,
} from '../actions/user-management.action';

export interface UserManagementState {
  name: string | undefined;
  email: string;
  userRoles: UserRoleInterface[];
  roles: Array<string>;
  error: string | null;
  loading: boolean;
  salesOrg: Array<string>;
}

export const initialState: UserManagementState = {
  name: '',
  email: '',
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
  on(fetchUserRolesSuccess, (state, { userRoles, name, email }) => {
    const roles = new Set();
    const salesOrgs = new Set();
    for (let role of userRoles) {
      const arr = role.employeeRole.split('_');
      const org = arr.pop();
      salesOrgs.add(org);
      roles.add(arr.join('_'));
    }
    return {
      ...state,
      name: name,
      email,
      userRoles,
      roles: Array.from(roles) as string[],
      loading: false,
      error: null,
      salesOrg: Array.from(salesOrgs) as string[],
    };
  }),
  on(fetchUserRolesFailed, (state, { error, name }) => ({
    ...state,
    name,
    loading: false,
    error,
  }))
);
