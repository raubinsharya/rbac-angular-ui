import { ActionReducerMap } from '@ngrx/store';
import { usersReducer, UsersState } from './reducers/users.reducer';
import { rolesReducer, RolesState } from './reducers/roles.reducer';
import {
  permissionsReducer,
  PermissionsState,
} from './reducers/permissions.reducer';

export interface UsersRootState {
  users: UsersState;
  userRoles: RolesState;
  userPermissions: PermissionsState;
}

export const usersRootreducers: ActionReducerMap<UsersRootState> = {
  users: usersReducer,
  userRoles: rolesReducer,
  userPermissions: permissionsReducer,
};
