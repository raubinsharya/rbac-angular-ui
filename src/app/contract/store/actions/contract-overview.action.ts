import { createAction, props } from '@ngrx/store';
import { QuoteDetailsType } from '../../models/contract-overview.model';
import { PartnerResponseType } from '../../models/partner-response.model';
import { EquipmentType } from '../../models/equipment.model';

export interface PartnerPayload {
  customer: string;
  businessPartnerRoleId: string;
  distributionChannel: string;
  salesOrg: string;
  division: string;
  soldTo: string;
  idx?: number;
}
export interface EquipmentPayload {
  customer: string;
  businessPartnerRoleId: string;
  distributionChannel: string;
  salesOrg: string;
  division: string;
  soldTo: string;
  idx?: number;
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

export const fetchLinePartnerDetails = createAction(
  '[CONTRACT][OVERVIEW][FETCH][LINE][PARTNER] FETCH PARTNER',
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

// Equipments
export const fetchEquipment = createAction(
  '[CONTRACT][OVERVIEW][FETCH][EQUIPMENT] FETCH EQUIPMENT',
  props<{ payload: string }>()
);

export const fetchEquipmentSuccess = createAction(
  '[CONTRACT][OVERVIEW][FETCH][EQUIPMENT][SUCCESS] FETCH EQUIPMENT SUCCESS',
  props<{ equipments: EquipmentType[] }>()
);

export const fetchEquipmentFailed = createAction(
  '[CONTRACT][OVERVIEW][FETCH][EQUIPMENT][FAILED] FETCH EQUIPMENT FAILED',
  props<{ error: string }>()
);

export const fetchEquipmentCancel = createAction(
  '[CONTRACT][OVERVIEW][FETCH][EQUIPMENT][CANCEL] FETCH EQUIPMENT CANCEL'
);

// Equipment block End

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
export const updatetLinePartnerField = createAction(
  '[CONTRACT][OVERVIEW][UPDATE][LINE][PARTNER][FIELD] UPDATE PARTNER FIELD',
  props<{
    query: string;
    targetFields: Array<{ field: string; value: any }>;
  }>()
);
export const resetPartnerField = createAction(
  '[CONTRACT][OVERVIEW][RESET][PARTNER][FIELD] RESET PARTNER FIELD',
  props<{ query: string }>()
);
export const resetLinePartnerField = createAction(
  '[CONTRACT][OVERVIEW][RESET][LINE][PARTNER][FIELD] RESET PARTNER FIELD',
  props<{ query: string }>()
);

export const buildAndUpdateOverview = createAction(
  '[CONTRACT][OVERVIEW][BUILD][UPDATE] BUILD AND UPDATE OVERVIEW'
);
