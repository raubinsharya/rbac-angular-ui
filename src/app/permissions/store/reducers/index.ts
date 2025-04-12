import { ActionReducerMap } from '@ngrx/store';
import { permissionsReducer, PermissionsState } from './permissions.reducer';

export interface PermissionsRootState {
  permissions: PermissionsState;
}

export const permissionsRootreducers: ActionReducerMap<PermissionsRootState> = {
  permissions: permissionsReducer,
};
