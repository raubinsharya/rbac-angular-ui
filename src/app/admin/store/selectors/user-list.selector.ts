import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersListState } from '../reducers/users-lists.reducer';
import { UserManagementFeatureState } from '../reducers/index.reducer';

export const selectUsersListState =
  createFeatureSelector<UserManagementFeatureState>('userManagementFeature');
// Users List
export const selectUsersList = createSelector(
  selectUsersListState,
  (state) => state.usersList.usersList
);
export const selectUsersListLoading = createSelector(
  selectUsersListState,
  (state) => state.usersList.loading
);
export const selectUsersListError = createSelector(
  selectUsersListState,
  (state) => state.usersList.error
);
// Users Roles
export const selectUsersRoles = createSelector(
  selectUsersListState,
  (state) => state.usersRoles.usersRoles
);
export const selectUsersRolesLoading = createSelector(
  selectUsersListState,
  (state) => state.usersRoles.loading
);
export const selectUsersRolesError = createSelector(
  selectUsersListState,
  (state) => state.usersRoles.error
);
// base url selector
export const selectBaseURLAndApplicationId = createSelector(
  selectUsersListState,
  (state) => {
    return {
      baseUrl: state.usersList.baseUrl,
      applicationId: state.usersList.applicationId,
    };
  }
);

// export const selectUserRoleUpdate = createSelector(
//   selectUsersListState,
//   (state) => state.usersList
// );
