import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RolesRootState } from '../reducers';


export const selectRolesRootState =
  createFeatureSelector<RolesRootState>('roles');

export const selectPermissionsState = createSelector(
  selectRolesRootState,
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
