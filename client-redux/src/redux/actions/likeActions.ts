import { CreateLikeEnum, DeleteLikeEnum } from '../action-types/index';

interface CreateLikeActionType {
  type: CreateLikeEnum.CREATE_LIKE;
}

interface CreateLikeSuccessActionType {
  type: CreateLikeEnum.CREATE_LIKE_SUCCESS;
  payload: any;
}

interface CreateLikeErrorActionType {
  type: CreateLikeEnum.CREATE_LIKE_ERROR;
  payload: any;
}

export type CreateLikeAction =
  | CreateLikeActionType
  | CreateLikeSuccessActionType
  | CreateLikeErrorActionType;

interface DeleteLikeActionType {
  type: DeleteLikeEnum.DELETE_LIKE;
}

interface DeleteLikeSuccessActionType {
  type: DeleteLikeEnum.DELETE_LIKE_SUCCESS;
  payload: any;
}

interface DeleteLikeErrorActionType {
  type: DeleteLikeEnum.DELETE_LIKE_ERROR;
  payload: any;
}

export type DeleteLikeAction =
  | DeleteLikeActionType
  | DeleteLikeSuccessActionType
  | DeleteLikeErrorActionType;
