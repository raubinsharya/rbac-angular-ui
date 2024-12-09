import { createReducer, on } from '@ngrx/store';
import { UserListType } from '../../model/user.model';
import {
  addRolesToUser,
  addRolesToUserFailure,
  addRolesToUserSuccess,
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
  removeRolesToUser,
  removeRolesToUserFailure,
  removeRolesToUserSuccess,
  updateBaseUrl,
} from '../actions/user-management.action';

export interface UsersListState {
  error: string | null;
  loading: boolean;
  usersList: Array<UserListType>;
  baseUrl: string;
  applicationId: number;
  userRoleUpdateLoading: boolean;
  userRoleUpdateError: string | null;
}

export const initialState: UsersListState = {
  error: null,
  loading: false,
  usersList: [],
  baseUrl: '',
  applicationId: 2,
  userRoleUpdateLoading: false,
  userRoleUpdateError: null,
};

export const UsersListStateReducer = createReducer(
  initialState,
  on(updateBaseUrl, (state, { baseUrl, applicationId }) => ({
    ...state,
    baseUrl,
    applicationId,
  })),
  on(fetchUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(fetchUsersSuccess, (state, { usersList }) => ({
    ...state,
    loading: false,
    usersList,
  })),
  on(fetchUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(addRolesToUser, (state) => {
    return { ...state, userRoleUpdateLoading: true };
  }),
  on(addRolesToUserSuccess, (state) => {
    return { ...state, userRoleUpdateLoading: false };
  }),
  on(addRolesToUserFailure, (state, { error }) => {
    return {
      ...state,
      userRoleUpdateLoading: false,
      userRoleUpdateError: error,
    };
  }),
  on(removeRolesToUser, (state) => {
    return { ...state, userRoleUpdateLoading: true };
  }),
  on(removeRolesToUserSuccess, (state) => {
    return { ...state, userRoleUpdateLoading: false };
  }),
  on(removeRolesToUserFailure, (state, { error }) => {
    return {
      ...state,
      userRoleUpdateLoading: false,
      userRoleUpdateError: error,
    };
  })
);
