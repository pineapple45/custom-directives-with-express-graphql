import { Dispatch } from 'redux';
import {
  AssignRoleToUserEnum,
  CreateUserEnum,
  DeleteUserEnum,
  GetUserByIdEnum,
  ListUsersEnum,
  LoginUserEnum,
} from '../action-types';
import {
  AssignRoleToUserAction,
  CreateUserAction,
  DeleteUserAction,
  LoginUserAction,
  GetUserByIdAction,
  ListUsersAction,
} from '../actions/authActions';
import { Role, backendUrl } from '../constants';
import {
  assignRoleMutation,
  createUserMutation,
  deletUserMutation,
} from '../../graphql/mutations';
import {
  getUserByIdQuery,
  listUsersQuery,
  loginUserQuery,
} from '../../graphql/queries';

import { UserType } from '../types';

export interface CreateUserArgs {
  username: string;
  email: string;
  password: string;
}

export interface AssignRoleToUserArgs {
  role: string;
  assignedBy: string;
  assignedUser: string;
}

export interface LoginUserArgs {
  usernameOrEmail: string;
  password: string;
}

export const createUser = (args: CreateUserArgs) => {
  return async (dispatch: Dispatch<CreateUserAction>) => {
    dispatch({
      type: CreateUserEnum.CREATE_USER,
    });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: createUserMutation(args),
        headers: {
          'content-type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.errors && result.errors.length !== 0) {
        throw result.errors[0].message;
      }

      dispatch({
        type: CreateUserEnum.CREATE_USER_SUCCESS,
        payload: result.data.createUser,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CreateUserEnum.CREATE_USER_ERROR,
        payload: error,
      });
    }
  };
};

export const loginUser =
  (args: LoginUserArgs) => async (dispatch: Dispatch<LoginUserAction>) => {
    dispatch({
      type: LoginUserEnum.LOGIN_USER,
    });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: loginUserQuery(args),
        headers: {
          'content-type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.errors && result.errors.length !== 0) {
        throw result.errors[0].message;
      }

      dispatch({
        type: LoginUserEnum.LOGIN_USER_SUCCESS,
        payload: result.data.login,
      });

      result.data &&
        localStorage.setItem('userData', JSON.stringify(result.data.login));
    } catch (error) {
      console.log(error);
      dispatch({
        type: LoginUserEnum.LOGIN_USER_ERROR,
        payload: error,
      });
    }
  };

export const logoutUser = () => async (dispatch: Dispatch<LoginUserAction>) => {
  localStorage.clear();
  dispatch({
    type: LoginUserEnum.LOGOUT,
  });
};

export const deleteUser =
  (userId: string) =>
  async (dispatch: Dispatch<DeleteUserAction>, getState: any) => {
    const { loginUser } = getState();
    const { data } = loginUser;

    data === null &&
      dispatch({
        type: DeleteUserEnum.DELETE_USER,
        payload: 'Please Login to access users',
      });

    dispatch({
      type: DeleteUserEnum.DELETE_USER,
    });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: deletUserMutation(userId),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${data.token}`,
        },
      });

      const result = await response.json();
      if (result.errors && result.errors.length !== 0) {
        throw result.errors[0].message;
      }

      dispatch({
        type: DeleteUserEnum.DELETE_USER_SUCCESS,
        payload: result.data.deleteUser,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: DeleteUserEnum.DELETE_USER_ERROR,
        payload: error,
      });
    }
  };

export const assignRoleToUser =
  (args: AssignRoleToUserArgs) =>
  async (dispatch: Dispatch<AssignRoleToUserAction>, getState: any) => {
    const { loginUser } = getState();
    const { data } = loginUser;

    data === null &&
      dispatch({
        type: AssignRoleToUserEnum.ASSIGN_ROLE_ERROR,
        payload: 'Please Login to assign roles',
      });

    dispatch({
      type: AssignRoleToUserEnum.ASSIGN_ROLE,
    });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: assignRoleMutation(args),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${data.token}`,
        },
      });

      const result = await response.json();
      if (result.errors && result.errors.length !== 0) {
        throw result.errors[0].message;
      }

      dispatch({
        type: AssignRoleToUserEnum.ASSIGN_ROLE_SUCCESS,
        payload: result.data.assignRole,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: AssignRoleToUserEnum.ASSIGN_ROLE_ERROR,
        payload: error,
      });
    }
  };

export const getUserById =
  (_id: string) =>
  async (dispatch: Dispatch<GetUserByIdAction>, getState: any) => {
    const { loginUser } = getState();
    const { data } = loginUser;

    data === null &&
      dispatch({
        type: GetUserByIdEnum.GET_USER_BY_ID_ERROR,
        payload: 'Please Login to list user',
      });

    dispatch({
      type: GetUserByIdEnum.GET_USER_BY_ID,
    });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: getUserByIdQuery(_id),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${data.token}`,
        },
      });

      const result = await response.json();
      if (result.errors && result.errors.length !== 0) {
        throw result.errors[0].message;
      }

      dispatch({
        type: GetUserByIdEnum.GET_USER_BY_ID_SUCCESS,
        payload: result.data.getUserById,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GetUserByIdEnum.GET_USER_BY_ID_ERROR,
        payload: error,
      });
    }
  };

export const listUsers =
  () => async (dispatch: Dispatch<ListUsersAction>, getState: any) => {
    const { loginUser } = getState();
    const { data } = loginUser;

    data === null &&
      dispatch({
        type: ListUsersEnum.LIST_USERS_ERROR,
        payload: 'Please Login to view user list',
      });

    dispatch({
      type: ListUsersEnum.LIST_USERS,
    });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: listUsersQuery(),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${data.token}`,
        },
      });

      const result = await response.json();
      if (result.errors && result.errors.length !== 0) {
        throw result.errors[0].message;
      }

      dispatch({
        type: ListUsersEnum.LIST_USERS_SUCCESS,
        payload: result.data.listUsers,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ListUsersEnum.LIST_USERS_ERROR,
        payload: error,
      });
    }
  };
