import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import {
  UserManagementState,
  userRolesReducer,
} from '../store/reducers/user-management.reducer';

export interface RootState {
  userRoles: UserManagementState;
}

export const reducers: ActionReducerMap<RootState> = {
  userRoles: userRolesReducer,
};

export const metaReducers: MetaReducer<RootState>[] = isDevMode() ? [] : [];
