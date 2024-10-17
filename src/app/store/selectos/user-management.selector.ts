import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserManagementState } from '../reducers/user-management.reducer';

export const selectUserRoleState =
  createFeatureSelector<UserManagementState>('userRoles');

export const selectUserRoles = createSelector(
  selectUserRoleState,
  (state) => state.userRoles
);
export const selectRoles = createSelector(
  selectUserRoleState,
  (state) => state.roles
);
export const selectSalesOrg = createSelector(
  selectUserRoleState,
  (state) => state.salesOrg
);
export const selectUserRolesError = createSelector(
  selectUserRoleState,
  (state) => state.error
);
export const selectUserRolesLoading = createSelector(
  selectUserRoleState,
  (state) => state.loading
);
export const selectUserEmail = createSelector(
  selectUserRoleState,
  (state) => state.email
);
