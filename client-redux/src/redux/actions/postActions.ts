import {
  CreatePostEnum,
  DeletePostEnum,
  ListPostsEnum,
  GetPostByIdEnum,
} from '../action-types/index';

/* CreatePostActionType */
interface CreatePostActionType {
  type: CreatePostEnum.CREATE_POST;
}

interface CreatePostSuccessActionType {
  type: CreatePostEnum.CREATE_POST_SUCCESS;
  payload: any;
}

interface CreatePostErrorActionType {
  type: CreatePostEnum.CREATE_POST_ERROR;
  payload: any;
}

export type CreatePostAction =
  | CreatePostActionType
  | CreatePostSuccessActionType
  | CreatePostErrorActionType;

/* DeletePostActionType */

interface DeletePostActionType {
  type: DeletePostEnum.DELETE_POST;
}

interface DeletePostSuccessActionType {
  type: DeletePostEnum.DELETE_POST_SUCCESS;
  payload: any;
}

interface DeletePostErrorActionType {
  type: DeletePostEnum.DELETE_POST_ERROR;
  payload: any;
}

export type DeletePostAction =
  | DeletePostActionType
  | DeletePostSuccessActionType
  | DeletePostErrorActionType;

/* ListPostsActionType */
interface ListPostsActionType {
  type: ListPostsEnum.LIST_POSTS;
}

interface ListPostsSuccessActionType {
  type: ListPostsEnum.LIST_POSTS_SUCCESS;
  payload: any;
}

interface ListPostsErrorActionType {
  type: ListPostsEnum.LIST_POSTS_ERROR;
  payload: any;
}

export type ListPostsAction =
  | ListPostsActionType
  | ListPostsSuccessActionType
  | ListPostsErrorActionType;

/* ListPostByIdActionType */

interface GetPostByIdActionType {
  type: GetPostByIdEnum.GET_POST_BY_ID;
}

interface GetPostByIdSuccessActionType {
  type: GetPostByIdEnum.GET_POST_BY_ID_SUCCESS;
  payload: any;
}

interface GetPostByIdErrorActionType {
  type: GetPostByIdEnum.GET_POST_BY_ID_ERROR;
  payload: any;
}

export type GetPostByIdAction =
  | GetPostByIdActionType
  | GetPostByIdSuccessActionType
  | GetPostByIdErrorActionType;
