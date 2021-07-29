import { PostType } from './postTypes';
import { UserType } from './authTypes';

export interface CommentType {
  _id: string;
  text: string;
  post: PostType;
  creator: UserType;
}

export interface CommentStateType {
  loading: boolean;
  error: string | null;
  data: CommentType | CommentType[] | string | null;
}

export interface CreateCommentStateType {
  loading: boolean;
  error: string | null;
  data: CommentType;
}

export interface DeleteCommentStateType {
  loading: boolean;
  error: string | null;
  data: string | null;
}
