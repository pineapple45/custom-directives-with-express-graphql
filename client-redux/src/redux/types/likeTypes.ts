import { PostType } from './postTypes';
import { UserType } from './authTypes';

export interface LikeType {
  _id: string;
  post: PostType;
  creator: UserType;
}

export interface CreateLikeStateType {
  loading: boolean;
  error: string | null;
  data: LikeType;
}

export interface DeleteLikeStateType {
  loading: boolean;
  error: string | null;
  data: string | null;
}
