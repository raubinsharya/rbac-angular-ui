import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersRootState } from '../reducers';

export const selectUsersRootState =
  createFeatureSelector<UsersRootState>('users');

// Roles
export const selectPermissionsState = createSelector(
  selectUsersRootState,
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
