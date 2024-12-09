import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { UsersListState, UsersListStateReducer } from './users-lists.reducer';
import { UsersRolesState, UsersRolesStateReducer } from './users-roles.reducer';

export interface UserManagementFeatureState {
  usersList: UsersListState;
  usersRoles: UsersRolesState;
}

export const userManagementFeatureReducers: ActionReducerMap<UserManagementFeatureState> =
  {
    usersList: UsersListStateReducer,
    usersRoles: UsersRolesStateReducer,
  };

export const metaReducers: MetaReducer<UserManagementFeatureState>[] =
  isDevMode() ? [] : [];
