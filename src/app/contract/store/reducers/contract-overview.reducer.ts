import { createReducer, on } from '@ngrx/store';
import { QuoteDetailsType } from '../../models/contract-overview.model';
import {
  fetchContractOverview,
  fetchContractOverviewFailure,
  fetchContractOverviewSuccess,
} from '../actions/contract-overview.action';

export interface ContractOverviewState {
  overview: QuoteDetailsType | null;
  error: string | null;
  loading: boolean;
}

export const initialState: ContractOverviewState = {
  overview: null,
  error: null,
  loading: false,
};

export const contractOverviewReducer = createReducer(
  initialState,
  on(fetchContractOverview, (state) => ({
    ...state,
    loading: true,
  })),
  on(fetchContractOverviewSuccess, (state, { overview }) => ({
    ...state,
    overview,
    loading: false,
    error: null,
  })),
  on(fetchContractOverviewFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
