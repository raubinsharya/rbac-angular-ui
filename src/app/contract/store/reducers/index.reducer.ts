import { ActionReducerMap } from '@ngrx/store';
import { DueListState, dueListReducer } from './duelist.reducer';
import {
  ContractOverviewState,
  contractOverviewReducer,
} from './contract-overview.reducer';

export interface ContractFeatureState {
  duelist: DueListState;
  overview: ContractOverviewState;
}

export const contractFeatureReducers: ActionReducerMap<ContractFeatureState> = {
  duelist: dueListReducer,
  overview: contractOverviewReducer,
};
