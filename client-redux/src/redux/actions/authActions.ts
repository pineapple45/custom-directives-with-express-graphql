import {
  CreateUserEnum,
  DeleteUserEnum,
  AssignRoleToUserEnum,
  LoginUserEnum,
  ListUsersEnum,
  GetUserByIdEnum,
} from '../action-types/index';

interface CreateUserActionType {
  type: CreateUserEnum.CREATE_USER;
}

interface CreateUserSuccessActionType {
  type: CreateUserEnum.CREATE_USER_SUCCESS;
  payload: any;
}

interface CreateUserErrorActionType {
  type: CreateUserEnum.CREATE_USER_ERROR;
  payload: any;
}

export type CreateUserAction =
  | CreateUserActionType
  | CreateUserSuccessActionType
  | CreateUserErrorActionType;

interface DeleteUserActionType {
  type: DeleteUserEnum.DELETE_USER;
}

interface DeleteUserSuccessActionType {
  type: DeleteUserEnum.DELETE_USER_SUCCESS;
  payload: any;
}

interface DeleteUserErrorActionType {
  type: DeleteUserEnum.DELETE_USER_ERROR;
  payload: any;
}

export type DeleteUserAction =
  | DeleteUserActionType
  | DeleteUserSuccessActionType
  | DeleteUserErrorActionType;

interface LoginUserActionType {
  type: LoginUserEnum.LOGIN_USER;
}

interface LoginUserSuccessActionType {
  type: LoginUserEnum.LOGIN_USER_SUCCESS;
  payload: any;
}

interface LoginUserErrorActionType {
  type: LoginUserEnum.LOGIN_USER_ERROR;
  payload: any;
}

interface LogoutActionType {
  type: LoginUserEnum.LOGOUT;
}

export type LoginUserAction =
  | LoginUserActionType
  | LoginUserSuccessActionType
  | LoginUserErrorActionType
  | LogoutActionType;

interface AssignRoleToUserActionType {
  type: AssignRoleToUserEnum.ASSIGN_ROLE;
}

interface AssignRoleToUserSuccessActionType {
  type: AssignRoleToUserEnum.ASSIGN_ROLE_SUCCESS;
  payload: any;
}

interface AssignRoleToUserErrorActionType {
  type: AssignRoleToUserEnum.ASSIGN_ROLE_ERROR;
  payload: any;
}

export type AssignRoleToUserAction =
  | AssignRoleToUserActionType
  | AssignRoleToUserSuccessActionType
  | AssignRoleToUserErrorActionType;

/* ListUsersActionType */

interface ListUsersActionType {
  type: ListUsersEnum.LIST_USERS;
}

interface ListUsersSuccessActionType {
  type: ListUsersEnum.LIST_USERS_SUCCESS;
  payload: any;
}

interface ListUsersErrorType {
  type: ListUsersEnum.LIST_USERS_ERROR;
  payload: any;
}

export type ListUsersAction =
  | ListUsersActionType
  | ListUsersSuccessActionType
  | ListUsersErrorType;

/* ListUserByIdActionType */

interface GetUserByIdActionType {
  type: GetUserByIdEnum.GET_USER_BY_ID;
}

interface GetUserByIdSuccessActionType {
  type: GetUserByIdEnum.GET_USER_BY_ID_SUCCESS;
  payload: any;
}

interface GetUserByIdErrorType {
  type: GetUserByIdEnum.GET_USER_BY_ID_ERROR;
  payload: any;
}

export type GetUserByIdAction =
  | GetUserByIdActionType
  | GetUserByIdSuccessActionType
  | GetUserByIdErrorType;
