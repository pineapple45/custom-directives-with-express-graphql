import { PostType } from './postTypes';
import { CommentType } from './commentTypes';
import { LikeType } from './likeTypes';

export interface UserType {
  _id: string;
  username: string;
  email: string;
  password?: null;
  role: string;
  postList?: PostType[];
  commentList?: CommentType[];
  likeList?: LikeType[];
}

export interface AuthData {
  userId: string;
  token: string;
  tokenExpiration: number;
}

export interface CreateUserStateType {
  loading: boolean;
  error: string | null;
  data: UserType;
}

export interface LoginUserStateType {
  loading: boolean;
  error: string | null;
  data: AuthData;
}

export interface DeleteUserStateType {
  loading: boolean;
  error: string | null;
  data: string | null;
}

export interface AssignRoleToUserStateType {
  loading: boolean;
  error: string | null;
  data: UserType;
}

export interface GetUserByIdStateType {
  loading: boolean;
  error: string | null;
  data: UserType;
}

export interface ListUsersStateType {
  loading: boolean;
  error: string | null;
  data: UserType[];
}
