import { combineReducers } from 'redux';
import {
  createPostReducer,
  deletePostReducer,
  listPostsReducer,
  getPostByIdReducer,
} from './postReducers';
import {
  createUserReducer,
  deleteUserReducer,
  assignRoleToUserReducer,
  listUsersReducers,
  loginUserReducer,
  getUserByIdReducer,
} from './authReducers';
import { createCommentReducer, deleteCommentReducer } from './commentReducers';
import { createLikeReducer, deleteLikeReducer } from './likeReducers';

const reducers = combineReducers({
  createPost: createPostReducer,
  deletePost: deletePostReducer,
  listPosts: listPostsReducer,
  getPostById: getPostByIdReducer,
  createUser: createUserReducer,
  loginUser: loginUserReducer,
  deleteUser: deleteUserReducer,
  assignRoleToUser: assignRoleToUserReducer,
  listUsers: listUsersReducers,
  getUserById: getUserByIdReducer,
  createComment: createCommentReducer,
  deleteComment: deleteCommentReducer,
  createLike: createLikeReducer,
  deleteLike: deleteLikeReducer,
});

export default reducers;

export * from './authReducers';
export * from './commentReducers';
export * from './likeReducers';
export * from './postReducers';
