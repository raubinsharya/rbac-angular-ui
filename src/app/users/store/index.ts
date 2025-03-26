import { ActionReducerMap } from '@ngrx/store';
import { usersReducer, UsersState } from './reducers/users.reducer';

export interface RootState {
  users: UsersState;
}

export const reducers: ActionReducerMap<RootState> = {
  users: usersReducer,
};
