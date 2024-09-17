import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContractFeatureState } from '../reducers/index.reducer';

export const selectContractState =
  createFeatureSelector<ContractFeatureState>('contractFeature');

export const selectContractOverview = createSelector(
  selectContractState,
  (state) => state.overview.overview
);
export const selectContractOverviewError = createSelector(
  selectContractState,
  (state) => state.overview.error
);
export const selectContractOverviewLoading = createSelector(
  selectContractState,
  (state) => state.overview.loading
);
