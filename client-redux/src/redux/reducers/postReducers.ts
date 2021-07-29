import {
  CreatePostEnum,
  DeletePostEnum,
  GetPostByIdEnum,
  ListPostsEnum,
} from '../action-types/index';
import {
  CreatePostAction,
  DeletePostAction,
  GetPostByIdAction,
  ListPostsAction,
} from '../actions/postActions';
import {
  GetPostByIdStateType,
  ListPostsStateType,
  DeletePostStateType,
  CreatePostStateType,
  PostType,
} from '../types';

const createPostInitialState: CreatePostStateType = {
  loading: false,
  error: null,
  data: {} as PostType,
};

export const createPostReducer = (
  state = createPostInitialState,
  action: CreatePostAction
): CreatePostStateType => {
  switch (action.type) {
    case CreatePostEnum.CREATE_POST:
      return { ...state, loading: true };
    case CreatePostEnum.CREATE_POST_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case CreatePostEnum.CREATE_POST_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const deletePostInitialState: DeletePostStateType = {
  loading: false,
  error: null,
  data: null,
};

export const deletePostReducer = (
  state = deletePostInitialState,
  action: DeletePostAction
): DeletePostStateType => {
  switch (action.type) {
    case DeletePostEnum.DELETE_POST:
      return { ...state, loading: true };
    case DeletePostEnum.DELETE_POST_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case DeletePostEnum.DELETE_POST_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const listPostsInitialState: ListPostsStateType = {
  loading: false,
  error: null,
  data: [] as PostType[],
};

export const listPostsReducer = (
  state = listPostsInitialState,
  action: ListPostsAction
): ListPostsStateType => {
  switch (action.type) {
    case ListPostsEnum.LIST_POSTS:
      return { ...state, loading: true };
    case ListPostsEnum.LIST_POSTS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ListPostsEnum.LIST_POSTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const getPostByIdInitialState: GetPostByIdStateType = {
  loading: false,
  error: null,
  data: {} as PostType,
};

export const getPostByIdReducer = (
  state = getPostByIdInitialState,
  action: GetPostByIdAction
): GetPostByIdStateType => {
  switch (action.type) {
    case GetPostByIdEnum.GET_POST_BY_ID:
      return { ...state, loading: true };
    case GetPostByIdEnum.GET_POST_BY_ID_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GetPostByIdEnum.GET_POST_BY_ID_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
