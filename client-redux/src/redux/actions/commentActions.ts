import { CreateCommentEnum, DeleteCommentEnum } from '../action-types/index';

interface CreateCommentActionType {
  type: CreateCommentEnum.CREATE_COMMENT;
}

interface CreateCommentSuccessActionType {
  type: CreateCommentEnum.CREATE_COMMENT_SUCCESS;
  payload: any;
}

interface CreateCommentErrorActionType {
  type: CreateCommentEnum.CREATE_COMMENT_ERROR;
  payload: any;
}

export type CreateCommentAction =
  | CreateCommentActionType
  | CreateCommentSuccessActionType
  | CreateCommentErrorActionType;

interface DeleteCommentActionType {
  type: DeleteCommentEnum.DELETE_COMMENT;
}

interface DeleteCommentSuccessActionType {
  type: DeleteCommentEnum.DELETE_COMMENT_SUCCESS;
  payload: any;
}

interface DeleteCommentErrorActionType {
  type: DeleteCommentEnum.DELETE_COMMENT_ERROR;
  payload: any;
}

export type DeleteCommentAction =
  | DeleteCommentActionType
  | DeleteCommentSuccessActionType
  | DeleteCommentErrorActionType;
