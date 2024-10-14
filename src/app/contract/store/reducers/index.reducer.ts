import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { DueListState, dueListReducer } from './duelist.reducer';
import {
  ContractOverviewState,
  contractOverviewReducer,
} from './contract-overview.reducer';
import { isDevMode } from '@angular/core';

export interface ContractFeatureState {
  duelist: DueListState;
  overview: ContractOverviewState;
}

export const contractFeatureReducers: ActionReducerMap<ContractFeatureState> = {
  duelist: dueListReducer,
  overview: contractOverviewReducer,
};

export const metaReducers: MetaReducer<ContractFeatureState>[] = isDevMode()
  ? []
  : [];
