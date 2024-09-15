import { createAction, props } from '@ngrx/store';
import { DueList } from '../../models/duelist.model';

export const fetchDueLists = createAction('[DUELIST] Fetch Duelists');
export const fetchDueListsSuccess = createAction(
  '[DUELIST] Fetch Duelists Success',
  props<{ dueLists: DueList[] }>()
);
export const fetchDueListsFailure = createAction(
  '[DUELIST] Fetch Duelists Failure',
  props<{ error: string }>()
);
