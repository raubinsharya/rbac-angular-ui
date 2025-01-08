import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { isDevMode } from '@angular/core';
import {
  contractBookingStatusReducer,
  ContractReportState,
} from './contract-booking-status.reducer';

export interface ContractReportFeatureState {
  contractBookingStatus: ContractReportState;
}

export const contractReportFeatureReducers: ActionReducerMap<ContractReportFeatureState> =
  {
    contractBookingStatus: contractBookingStatusReducer,
  };

export const metaReducers: MetaReducer<ContractReportFeatureState>[] =
  isDevMode() ? [] : [];
