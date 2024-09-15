import { ActionReducerMap } from '@ngrx/store';
import { DueListState, dueListReducer } from './duelist.reducer';

export interface ContractFeatureState {
  duelist: DueListState;
}

export const contractFeatureReducers: ActionReducerMap<ContractFeatureState> = {
  duelist: dueListReducer,
};
