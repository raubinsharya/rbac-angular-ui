import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PermissionsRootState } from '../reducers';

export const selectPermissionsRootState =
  createFeatureSelector<PermissionsRootState>('permissions');

export const selectPermissionsState = createSelector(
  selectPermissionsRootState,
  (state) => state.permissions
);
export const selectPermissions = createSelector(
  selectPermissionsState,
  (state) => state.permissions
);
export const selectPermissionsLoading = createSelector(
  selectPermissionsState,
  (state) => state.loading
);
export const selectPermissionsError = createSelector(
  selectPermissionsState,
  (state) => state.error
);
