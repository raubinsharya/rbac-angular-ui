import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContractReportFeatureState } from '../reducers/index.reducer';

export const selectContractReport =
  createFeatureSelector<ContractReportFeatureState>('contractReportFeature');

export const selecContractBookingStatus = createSelector(
  selectContractReport,
  (state) => state.contractBookingStatus.reportData
);
export const selecContractBookingStatusLoading = createSelector(
  selectContractReport,
  (state) => state.contractBookingStatus.loading
);
export const selecContractBookingStatusError = createSelector(
  selectContractReport,
  (state) => state.contractBookingStatus.error
);
