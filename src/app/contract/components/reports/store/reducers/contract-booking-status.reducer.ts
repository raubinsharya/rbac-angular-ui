import { createReducer, on } from '@ngrx/store';
import {
  fetchContractReport,
  fetchContractReportFailure,
  fetchContractReportSuccess,
} from '../actions/contract-report.action';
import { ContractBookingStatusModel } from '../../models/contract-booking-status.model';

export interface ContractReportState {
  reportData: Array<ContractBookingStatusModel>;
  error: string | null;
  loading: boolean;
}

export const initialState: ContractReportState = {
  reportData: [],
  error: null,
  loading: false,
};

export const contractBookingStatusReducer = createReducer(
  initialState,
  on(fetchContractReport, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(fetchContractReportSuccess, (state, { reportData }) => {
    return {
      ...state,
      loading: false,
      reportData,
    };
  }),
  on(fetchContractReportFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  })
);
