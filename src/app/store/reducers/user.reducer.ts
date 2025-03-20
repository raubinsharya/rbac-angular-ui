import { createReducer, on } from '@ngrx/store';
import {
  fetchUserProfile,
  fetchUserProfileFailed,
  fetchUserProfileSuccess,
  userLogin,
  userLoginFailed,
  userLoginSuccess,
} from '../actions/user.action';
import { UserProfileResponseType } from '../../models/user.model';

export interface UserState {
  error: string | null;
  loading: boolean;
  user: UserProfileResponseType | null;
}

export const initialState: UserState = {
  error: null,
  loading: false,
  user: null,
};

export const userReducer = createReducer(
  initialState,
  on(userLogin, (state) => ({ ...state, loading: true })),
  on(userLoginSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
  })),
  on(userLoginFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchUserProfile, (state) => ({
    ...state,
    loading: true,
  })),
  on(fetchUserProfileSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
  })),
  on(fetchUserProfileFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
