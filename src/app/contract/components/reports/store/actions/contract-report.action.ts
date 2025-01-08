import { createAction, props } from '@ngrx/store';
import { ContractBookingStatusModel } from '../../models/contract-booking-status.model';

export interface ContractBookingStatusPayload {
  isInBetweenCreatedDate?: boolean;
  isNotEqualCreatedDate?: boolean;
  isEqualCreatedDate?: boolean;
  isBeforeCreatedDate?: boolean;
  salesOrgIdList: Array<string>;
  isAfterCreatedDate?: boolean;
  createdStartDate?: Date;
  createdEndDate?: Date;
  createdDate?: Date;
  bookedBy: string;
  status: string;
}

export const fetchContractReport = createAction(
  '[CONTRACT][REPORT] Fetch Contract Report',
  props<{ payload: ContractBookingStatusPayload }>()
);
export const fetchContractReportSuccess = createAction(
  '[CONTRACT][REPORT][SUCCESS] Fetch Contract Report Success',
  props<{ reportData: Array<ContractBookingStatusModel> }>()
);
export const fetchContractReportFailure = createAction(
  '[CONTRACT][REPORT][FAILURE] Fetch Contract Report Failure',
  props<{ error: string }>()
);
