import { CreateLikeEnum, DeleteLikeEnum } from '../action-types/index';
import { CreateLikeAction, DeleteLikeAction } from '../actions/likeActions';
import { CreateLikeStateType, DeleteLikeStateType, LikeType } from '../types';

const createLikeInitialState: CreateLikeStateType = {
  loading: false,
  error: null,
  data: {} as LikeType,
};

export const createLikeReducer = (
  state = createLikeInitialState,
  action: CreateLikeAction
): CreateLikeStateType => {
  switch (action.type) {
    case CreateLikeEnum.CREATE_LIKE:
      return { ...state, loading: true };
    case CreateLikeEnum.CREATE_LIKE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case CreateLikeEnum.CREATE_LIKE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const deleteLikeInitialState: DeleteLikeStateType = {
  loading: false,
  error: null,
  data: null,
};

export const deleteLikeReducer = (
  state = deleteLikeInitialState,
  action: DeleteLikeAction
): DeleteLikeStateType => {
  switch (action.type) {
    case DeleteLikeEnum.DELETE_LIKE:
      return { ...state, loading: true };
    case DeleteLikeEnum.DELETE_LIKE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case DeleteLikeEnum.DELETE_LIKE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
