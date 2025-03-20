import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);
export const selectLoginLoading = createSelector(
  selectUserState,
  (state) => state.loading
);
export const selectLoginError = createSelector(
  selectUserState,
  (state) => state.error
);
