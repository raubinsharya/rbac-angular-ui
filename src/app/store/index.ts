import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { UserState, userReducer } from './reducers/user.reducer';

export interface RootState {
  user: UserState;
}

export const reducers: ActionReducerMap<RootState> = {
  user: userReducer,
};

export const metaReducers: MetaReducer<RootState>[] = isDevMode() ? [] : [];
