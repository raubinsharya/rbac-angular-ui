import { ActionReducerMap } from '@ngrx/store';
import { usersReducer, UsersState } from './reducers/users.reducer';
import { rolesReducer, RolesState } from './reducers/roles.reducer';

export interface UsersRootState {
  users: UsersState;
  userRoles: RolesState;
}

export const usersRootreducers: ActionReducerMap<UsersRootState> = {
  users: usersReducer,
  userRoles: rolesReducer,
};
