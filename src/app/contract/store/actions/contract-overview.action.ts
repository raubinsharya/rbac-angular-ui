import { createAction, props } from '@ngrx/store';
import { QuoteDetailsType } from '../../models/contract-overview.model';
import { PartnerResponseType } from '../../models/partner-response.model';

export interface PartnerPayload {
  customer: string;
  businessPartnerRoleId: string;
  distributionChannel: string;
  salesOrg: string;
  division: string;
  soldTo: string;
}

export const fetchContractOverview = createAction(
  '[CONTRACT][OVERVIEW] Fetch Overview',
  props<{ sourceSystemHeaderId: string }>()
);

export const fetchContractOverviewSuccess = createAction(
  '[CONTRACT][OVERVIEW] Fetch Overview Success',
  props<{ overview: QuoteDetailsType }>()
);

export const fetchContractOverviewFailure = createAction(
  '[CONTRACT][OVERVIEW] Fetch Overview Failure',
  props<{ error: string }>()
);

export const fetchPartnerDetails = createAction(
  '[CONTRACT][OVERVIEW][FETCH][PARTNER] FETCH PARTNER',
  props<{ payload: PartnerPayload }>()
);
export const fetchPartnerDetailsSuccess = createAction(
  '[CONTRACT][OVERVIEW][FETCH][PARTNER][SUCCESS] FETCH PARTNER SUCCESS',
  props<{ partner: PartnerResponseType[] }>()
);
export const fetchPartnerDetailsFailed = createAction(
  '[CONTRACT][OVERVIEW][FETCH][PARTNER][FAILED] FETCH PARTNER FAILED',
  props<{ error: string }>()
);
export const fetchPartnerDetailsCancel = createAction(
  '[CONTRACT][OVERVIEW][FETCH][PARTNER][CANCEL] FETCH PARTNER CANCEL'
);

export const updateOverview = createAction(
  '[CONTRACT][OVERVIEW][UPDATE][HEADER] UPDATE HEADER',
  props<{
    query: string;
    targetFields: Array<{ field: string; value: any }>;
  }>()
);

export const resetOverview = createAction(
  '[CONTRACT][OVERVIEW][RESET][HEADER] RESET HEADER',
  props<{ query: string; fields?: Array<string> }>()
);
export const updatetPartnerField = createAction(
  '[CONTRACT][OVERVIEW][UPDATE][PARTNER][FIELD] UPDATE PARTNER FIELD',
  props<{
    query: string;
    targetFields: Array<{ field: string; value: any }>;
  }>()
);
export const resetPartnerField = createAction(
  '[CONTRACT][OVERVIEW][RESET][PARTNER][FIELD] RESET PARTNER FIELD',
  props<{ query: string }>()
);

export const buildAndUpdateOverview = createAction(
  '[CONTRACT][OVERVIEW][BUILD][UPDATE] BUILD AND UPDATE OVERVIEW'
);
