import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersRootState } from '..';

export const selectUsersRootState =
  createFeatureSelector<UsersRootState>('users');

export const selectUsersState = createSelector(
  selectUsersRootState,
  (state) => state.users
);
export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);
export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading
);
export const selectUsersError = createSelector(
  selectUsersState,
  (state) => state.error
);

export const selectRolesState = createSelector(
  selectUsersRootState,
  (state) => state.userRoles
);

export const selectUserRoles = createSelector(
  selectRolesState,
  (state) => state.roles
);
export const selectUserRolesLoading = createSelector(
  selectRolesState,
  (state) => state.loading
);
export const selectUserRolesError = createSelector(
  selectRolesState,
  (state) => state.error
);
