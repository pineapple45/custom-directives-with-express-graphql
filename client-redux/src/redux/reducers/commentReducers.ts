import { CreateCommentEnum, DeleteCommentEnum } from '../action-types/index';
import {
  CreateCommentAction,
  DeleteCommentAction,
} from '../actions/commentActions';

import {
  CommentStateType,
  CommentType,
  CreateCommentStateType,
  DeleteCommentStateType,
} from '../types';

const createCommentInitialState: CreateCommentStateType = {
  loading: false,
  error: null,
  data: {} as CommentType,
};

export const createCommentReducer = (
  state = createCommentInitialState,
  action: CreateCommentAction
): CreateCommentStateType => {
  switch (action.type) {
    case CreateCommentEnum.CREATE_COMMENT:
      return { ...state, loading: true };
    case CreateCommentEnum.CREATE_COMMENT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case CreateCommentEnum.CREATE_COMMENT_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteCommentInitialState: DeleteCommentStateType = {
  loading: false,
  error: null,
  data: null,
};

export const deleteCommentReducer = (
  state = deleteCommentInitialState,
  action: DeleteCommentAction
): CommentStateType => {
  switch (action.type) {
    case DeleteCommentEnum.DELETE_COMMENT:
      return { ...state, loading: true };
    case DeleteCommentEnum.DELETE_COMMENT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case DeleteCommentEnum.DELETE_COMMENT_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
