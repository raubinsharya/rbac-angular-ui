import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PermissionState } from '../reducers/permission.reducer';

export const selectRolesState = createFeatureSelector<PermissionState>('permissions');

export const selectPermissions = createSelector(
  selectRolesState,
  (state) => state.permissions
);
export const selectPermissionsLoading = createSelector(
  selectRolesState,
  (state) => state.loading
);
export const selectPermissionsError = createSelector(
  selectRolesState,
  (state) => state.error
);
