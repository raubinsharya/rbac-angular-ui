import { createAction, props } from '@ngrx/store';
import { QuoteDetailsType } from '../../models/contract-overview.model';

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
