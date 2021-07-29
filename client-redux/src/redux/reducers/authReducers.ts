import {
  CreateUserEnum,
  AssignRoleToUserEnum,
  DeleteUserEnum,
  LoginUserEnum,
  GetUserByIdEnum,
  ListUsersEnum,
} from '../action-types';

import {
  CreateUserAction,
  DeleteUserAction,
  AssignRoleToUserAction,
  LoginUserAction,
  GetUserByIdAction,
  ListUsersAction,
} from '../actions/authActions';

import {
  AssignRoleToUserStateType,
  DeleteUserStateType,
  CreateUserStateType,
  GetUserByIdStateType,
  LoginUserStateType,
  AuthData,
  UserType,
  ListUsersStateType,
} from '../types';

const createUserInitialState: CreateUserStateType = {
  loading: false,
  error: null,
  data: {} as UserType,
};

export const createUserReducer = (
  state = createUserInitialState,
  action: CreateUserAction
): CreateUserStateType => {
  switch (action.type) {
    case CreateUserEnum.CREATE_USER:
      return { ...state, loading: true };
    case CreateUserEnum.CREATE_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case CreateUserEnum.CREATE_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const loginUserInitialState: LoginUserStateType = {
  loading: false,
  error: null,
  data: {} as AuthData,
};

export const loginUserReducer = (
  state = loginUserInitialState,
  action: LoginUserAction
): LoginUserStateType => {
  switch (action.type) {
    case LoginUserEnum.LOGIN_USER:
      return { ...state, loading: true };
    case LoginUserEnum.LOGIN_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case LoginUserEnum.LOGIN_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case LoginUserEnum.LOGOUT:
      return { data: {} as AuthData, loading: false, error: null };
    default:
      return state;
  }
};

const deleteUserInitialState: DeleteUserStateType = {
  loading: false,
  error: null,
  data: null,
};

export const deleteUserReducer = (
  state = deleteUserInitialState,
  action: DeleteUserAction
): DeleteUserStateType => {
  switch (action.type) {
    case DeleteUserEnum.DELETE_USER:
      return { ...state, loading: true };
    case DeleteUserEnum.DELETE_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case DeleteUserEnum.DELETE_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const assignRoleTouserInitialState: AssignRoleToUserStateType = {
  loading: false,
  error: null,
  data: {} as UserType,
};

export const assignRoleToUserReducer = (
  state = assignRoleTouserInitialState,
  action: AssignRoleToUserAction
): AssignRoleToUserStateType => {
  switch (action.type) {
    case AssignRoleToUserEnum.ASSIGN_ROLE:
      return { ...state, loading: true };
    case AssignRoleToUserEnum.ASSIGN_ROLE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case AssignRoleToUserEnum.ASSIGN_ROLE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const getUserByIdInitialState: GetUserByIdStateType = {
  loading: false,
  error: null,
  data: {} as UserType,
};

export const getUserByIdReducer = (
  state = getUserByIdInitialState,
  action: GetUserByIdAction
): GetUserByIdStateType => {
  switch (action.type) {
    case GetUserByIdEnum.GET_USER_BY_ID:
      return { ...state, loading: true };
    case GetUserByIdEnum.GET_USER_BY_ID_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GetUserByIdEnum.GET_USER_BY_ID_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const listUsersInitialState: ListUsersStateType = {
  loading: false,
  error: null,
  data: [] as UserType[],
};

export const listUsersReducers = (
  state = listUsersInitialState,
  action: ListUsersAction
): ListUsersStateType => {
  switch (action.type) {
    case ListUsersEnum.LIST_USERS:
      return { ...state, loading: true };
    case ListUsersEnum.LIST_USERS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ListUsersEnum.LIST_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
