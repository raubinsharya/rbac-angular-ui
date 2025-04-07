import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { UserState, userReducer } from './reducers/user.reducer';
import { roleReducer, RoleState } from './reducers/role.reducer';

export interface RootState {
  user: UserState;
  roles: RoleState;
}

export const reducers: ActionReducerMap<RootState> = {
  user: userReducer,
  roles: roleReducer,
};

export const metaReducers: MetaReducer<RootState>[] = isDevMode() ? [] : [];
