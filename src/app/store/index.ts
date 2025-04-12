import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { UserState, userReducer } from './reducers/user.reducer';

export interface RoleRootState {
  user: UserState;
}

export const reducers: ActionReducerMap<RoleRootState> = {
  user: userReducer,
};

export const metaReducers: MetaReducer<RoleRootState>[] = isDevMode() ? [] : [];
