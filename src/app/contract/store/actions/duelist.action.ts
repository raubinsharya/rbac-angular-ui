import { createAction, props } from '@ngrx/store';
import { DueList } from '../../models/duelist.model';

export const fetchDueLists = createAction(
  '[CONTRACT][DUELIST] Fetch Duelists',
  props<{ salesOrgIdList: string[] }>()
);
export const fetchDueListsSuccess = createAction(
  '[CONTRACT][DUELIST] Fetch Duelists Success',
  props<{ dueLists: DueList[] }>()
);
export const fetchDueListsFailure = createAction(
  '[CONTRACT][DUELIST] Fetch Duelists Failure',
  props<{ error: string }>()
);
