import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RolesRootState } from '../reducers';

export const selectRolesRootState =
  createFeatureSelector<RolesRootState>('roles');

export const selectRolesState = createSelector(
  selectRolesRootState,
  (state) => state.roles
);
export const selectRoles = createSelector(
  selectRolesState,
  (state) => state.roles
);
export const selectRolesLoading = createSelector(
  selectRolesState,
  (state) => state.loading
);
export const selectRolesError = createSelector(
  selectRolesState,
  (state) => state.error
);
// select roles permissions
export const selectRolePermissionState = createSelector(
  selectRolesRootState,
  (state) => state.rolesPermissions
);
export const selectRolePermissions = createSelector(
  selectRolePermissionState,
  (state) => state.rolePermissions
);
export const selectRolePermissionsLoading = createSelector(
  selectRolePermissionState,
  (state) => state.loading
);
export const selectRolePermissionsError = createSelector(
  selectRolesState,
  (state) => state.error
);
