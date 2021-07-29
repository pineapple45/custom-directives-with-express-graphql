import { UserType } from './authTypes';
import { CommentType } from './commentTypes';
import { LikeType } from './likeTypes';

export interface PostType {
  _id: string;
  title: string;
  description: string;
  image: string;
  creator: UserType;
  commentList: CommentType[];
  likeList: LikeType[];
}

export interface CreatePostStateType {
  loading: boolean;
  error: string | null;
  data: PostType;
}

export interface DeletePostStateType {
  loading: boolean;
  error: string | null;
  data: string | null;
}

export interface ListPostsStateType {
  loading: boolean;
  error: string | null;
  data: PostType[];
}

export interface GetPostByIdStateType {
  loading: boolean;
  error: string | null;
  data: PostType;
}
