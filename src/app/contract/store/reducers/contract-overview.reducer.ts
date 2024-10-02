import { on } from '@ngrx/store';
import { QuoteDetailsType } from '../../models/contract-overview.model';
import {
  buildAndUpdateOverview,
  fetchContractOverview,
  fetchContractOverviewFailure,
  fetchContractOverviewSuccess,
  fetchPartnerDetails,
  fetchPartnerDetailsFailed,
  fetchPartnerDetailsSuccess,
  resetOverview,
  updateOverview,
} from '../actions/contract-overview.action';
import { createImmerReducer } from 'ngrx-immer/store';
import {
  queryAndResetJSON,
  queryAndUpdateJSON,
  updateJSON,
} from '../../../../utils';

export interface ContractOverviewState {
  overview: QuoteDetailsType;
  original: QuoteDetailsType;
  error: string | null;
  loading: boolean;
  partnerLoading: boolean;
  partnerFetchError: string | null;
}

export const initialState: ContractOverviewState = {
  overview: {} as QuoteDetailsType,
  original: {} as QuoteDetailsType,
  error: null,
  loading: false,
  partnerLoading: false,
  partnerFetchError: null,
};

export const contractOverviewReducer = createImmerReducer(
  initialState,
  on(fetchContractOverview, (state) => ({
    ...state,
    loading: true,
  })),
  on(fetchContractOverviewSuccess, (state, { overview }) => ({
    ...state,
    overview,
    original: overview,
    loading: false,
    error: null,
  })),
  on(fetchContractOverviewFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(updateOverview, (state, { targetFields, query }) => {
    queryAndUpdateJSON(state.overview, query, targetFields);
    return state;
  }),
  on(resetOverview, (state, { query, fields }) => {
    queryAndResetJSON(state.original, state.overview, query, fields);
    return state;
  }),
  on(buildAndUpdateOverview, (state) => {
    state.overview = updateJSON(
      state.original,
      state.overview
    ) as QuoteDetailsType;
    return state;
  }),
  on(fetchPartnerDetails, (state) => {
    state.partnerLoading = true;
    return state;
  }),
  on(fetchPartnerDetailsSuccess, (state, { partner }) => {
    state.partnerLoading = false;
    return state;
  }),
  on(fetchPartnerDetailsFailed, (state, { error }) => {
    state.partnerLoading = false;
    state.partnerFetchError = error;
    return state;
  })
);
