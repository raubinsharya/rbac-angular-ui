import { on } from '@ngrx/store';
import { QuoteDetailsType } from '../../models/contract-overview.model';
import {
  buildAndUpdateOverview,
  fetchContractOverview,
  fetchContractOverviewFailure,
  fetchContractOverviewSuccess,
  fetchEquipment,
  fetchEquipmentSuccess,
  fetchLinePartnerDetails,
  fetchPartnerDetails,
  fetchPartnerDetailsCancel,
  fetchPartnerDetailsFailed,
  fetchPartnerDetailsSuccess,
  requestSimulation,
  requestSimulationFailed,
  requestSimulationSuccess,
  resetOverview,
  updateOverview,
} from '../actions/contract-overview.action';
import { createImmerReducer } from 'ngrx-immer/store';
import {
  queryAndResetJSON,
  queryAndUpdateJSON,
  updateJSON,
} from '../../../../utils';
import { SimulationResponseType } from '../../models/SimulationResponse.model';

export interface ContractOverviewState {
  overview: QuoteDetailsType;
  original: QuoteDetailsType;
  error: string | null;
  loading: boolean;
  simulationLoading: boolean;
  partnerLoading: boolean;
  equipmentLoading: boolean;
  equipmentFetchError: string | null;
  partnerFetchError: string | null;
  simulationResponse: SimulationResponseType | null;
}

export const initialState: ContractOverviewState = {
  overview: {} as QuoteDetailsType,
  original: {} as QuoteDetailsType,
  error: null,
  loading: false,
  simulationLoading: false,
  partnerLoading: false,
  equipmentLoading: false,
  partnerFetchError: null,
  equipmentFetchError: null,
  simulationResponse: null,
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
  on(fetchPartnerDetails, fetchLinePartnerDetails, (state) => {
    state.partnerLoading = true;
    return state;
  }),
  on(fetchPartnerDetailsSuccess, (state) => {
    state.partnerLoading = false;
    return state;
  }),
  on(fetchPartnerDetailsFailed, (state, { error }) => {
    state.partnerLoading = false;
    state.partnerFetchError = error;
    return state;
  }),
  on(fetchPartnerDetailsCancel, (state) => {
    state.partnerLoading = false;
    return state;
  }),
  on(fetchEquipment, fetchLinePartnerDetails, (state) => {
    state.equipmentLoading = true;
    return state;
  }),
  on(fetchEquipmentSuccess, (state) => {
    state.equipmentLoading = false;
    return state;
  }),
  on(fetchPartnerDetailsFailed, (state, { error }) => {
    state.equipmentLoading = false;
    state.equipmentFetchError = error;
    return state;
  }),
  on(fetchPartnerDetailsCancel, (state) => {
    state.equipmentLoading = false;
    return state;
  }),
  on(requestSimulation, (state) => {
    state.simulationLoading = true;
    return state;
  }),
  on(requestSimulationSuccess, (state, { simulationResponse }) => {
    state.simulationLoading = false;
    state.simulationResponse = simulationResponse;
    return state;
  }),
  on(requestSimulationFailed, (state) => {
    state.simulationLoading = false;
    return state;
  })
);
