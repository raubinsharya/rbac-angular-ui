import { createReducer, on } from '@ngrx/store';
import {
  fetchDueLists,
  fetchDueListsSuccess,
  fetchDueListsFailure,
} from '../actions/duelist.action';
import { DueList } from '../../models/duelist.model';

export interface DueListState {
  dueLists: DueList[];
  error: string | null;
  loading: boolean;
}

export const initialState: DueListState = {
  dueLists: [],
  error: null,
  loading: false,
};

export const dueListReducer = createReducer(
  initialState,
  on(fetchDueLists, (state) => ({
    ...state,
    loading: true,
  })),
  on(fetchDueListsSuccess, (state, { dueLists }) => ({
    ...state,
    dueLists,
    loading: false,
    error: null,
  })),
  on(fetchDueListsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
