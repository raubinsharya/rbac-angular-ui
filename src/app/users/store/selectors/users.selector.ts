import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersRootState } from '../reducers';

export const selectUsersRootState =
  createFeatureSelector<UsersRootState>('users');
// Users
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
// Select User Roles
export const selectUserRolesState = createSelector(
  selectUsersRootState,
  (state) => state.userRoles
);

export const selectUserRoles = createSelector(
  selectUserRolesState,
  (state) => state.userRoles
);
export const selectUserRolesLoading = createSelector(
  selectUserRolesState,
  (state) => state.loading
);
export const selectUserRolesError = createSelector(
  selectUserRolesState,
  (state) => state.error
);

//Select User Permissions
export const selectUserPermissionsState = createSelector(
  selectUsersRootState,
  (state) => state.userPermissions
);

export const selectUserPermissions = createSelector(
  selectUserPermissionsState,
  (state) => state.userPermissions
);
export const selectUserPermissionsLoading = createSelector(
  selectUserPermissionsState,
  (state) => state.loading
);
export const selectUserPermissionsError = createSelector(
  selectUserPermissionsState,
  (state) => state.error
);
