import { createReducer, on } from '@ngrx/store';
import { UserProfileResponseType } from '../../../models/user.model';
import {
  fetchUsers,
  fetchUsersFailed,
  fetchUsersSuccess,
} from '../actions/user.action';

export interface UsersState {
  error: string | null;
  loading: boolean;
  users: Array<UserProfileResponseType> | null;
}

export const initialState: UsersState = {
  error: null,
  loading: false,
  users: null,
};

export const usersReducer = createReducer(
  initialState,
  on(fetchUsers, (state) => ({ ...state, loading: true })),
  on(fetchUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users,
  })),
  on(fetchUsersFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
