import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersRootState } from '../reducers';

export const selectUsersRootState =
  createFeatureSelector<UsersRootState>('users');

// Roles
export const selectRolesState = createSelector(
  selectUsersRootState,
  (state) => state.roles
);
export const selectRoles = createSelector(
  selectRolesState,
  (state) => state.roles
);
export const selectUsersLoading = createSelector(
  selectRolesState,
  (state) => state.loading
);
export const selectUsersError = createSelector(
  selectRolesState,
  (state) => state.error
);
