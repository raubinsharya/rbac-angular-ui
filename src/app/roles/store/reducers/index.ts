import { ActionReducerMap } from '@ngrx/store';
import { rolesReducer, RolesState } from './roles.reducer';
import { rolePermissionsReducer, RolePermissionsState } from './role-permissions.reducer';
import { permissionsReducer, PermissionsState } from './permissions.reducer';


export interface RolesRootState {
  roles: RolesState;
  rolesPermissions: RolePermissionsState;
  permissions: PermissionsState;
}

export const rolesRootreducers: ActionReducerMap<RolesRootState> = {
  roles: rolesReducer,
  rolesPermissions: rolePermissionsReducer,
  permissions: permissionsReducer,
};
