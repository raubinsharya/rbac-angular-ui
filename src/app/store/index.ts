import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { UserState, userReducer } from './reducers/user.reducer';
import { roleReducer, RoleState } from './reducers/role.reducer';
import {
  permissionReducer,
  PermissionState,
} from './reducers/permission.reducer';

export interface RootState {
  user: UserState;
  roles: RoleState;
  permissions: PermissionState;
}

export const reducers: ActionReducerMap<RootState> = {
  user: userReducer,
  roles: roleReducer,
  permissions: permissionReducer,
};

export const metaReducers: MetaReducer<RootState>[] = isDevMode() ? [] : [];
