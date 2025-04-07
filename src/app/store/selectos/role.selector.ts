import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoleState } from '../reducers/role.reducer';

export const selectRolesState = createFeatureSelector<RoleState>('roles');

export const selectRoles = createSelector(
  selectRolesState,
  (state) => state.roles
);
export const selectRolesLoading = createSelector(
  selectRolesState,
  (state) => state.loading
);
export const selectRolesError = createSelector(
  selectRolesState,
  (state) => state.error
);
