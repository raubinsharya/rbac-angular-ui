import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContractFeatureState } from '../reducers/index.reducer';

export const selectDueListState =
  createFeatureSelector<ContractFeatureState>('contractFeature');

export const selectDueLists = createSelector(
  selectDueListState,
  (state) => state.duelist.dueLists
);
export const selectDueListError = createSelector(
  selectDueListState,
  (state) => state.duelist.error
);
export const selectDueListLoading = createSelector(
  selectDueListState,
  (state) => state.duelist.loading
);
