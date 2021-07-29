import { Dispatch } from 'redux';

import {
  CreatePostAction,
  DeletePostAction,
  GetPostByIdAction,
  ListPostsAction,
} from '../actions/postActions';
import {
  createPostMutation,
  deletePostMutation,
} from '../../graphql/mutations';
import { getPostByIdQuery, listPostsQuery } from '../../graphql/queries';
import {
  CreatePostEnum,
  DeletePostEnum,
  GetPostByIdEnum,
  ListPostsEnum,
} from '../action-types';
import { backendUrl } from '../../redux/constants';
import { UserType, CommentType, LikeType } from '../types';

export interface CreatePostArgs {
  title: string;
  image: string;
  description: string;
  creatorId: string;
}

export const createPost = (args: CreatePostArgs) => {
  return async (dispatch: Dispatch<CreatePostAction>, getState: any) => {
    const { loginUser } = getState();
    const { data } = loginUser;

    data === null &&
      dispatch({
        type: CreatePostEnum.CREATE_POST_ERROR,
        payload: 'Please Login to create a post',
      });

    dispatch({
      type: CreatePostEnum.CREATE_POST,
    });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: createPostMutation(args),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${data.token}`,
        },
      });
      const result = await response.json();
      if (result.errors && result.errors.length !== 0) {
        throw result.errors[0].message;
      }
      dispatch({
        type: CreatePostEnum.CREATE_POST_SUCCESS,
        payload: result.data.createPost,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CreatePostEnum.CREATE_POST_ERROR,
        payload: error,
      });
    }
  };
};

export const listPosts = () => async (dispatch: Dispatch<ListPostsAction>) => {
  dispatch({
    type: ListPostsEnum.LIST_POSTS,
  });

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      body: listPostsQuery(),
      headers: {
        'content-type': 'application/json',
      },
    });
    const result = await response.json();
    if (result.errors && result.errors.length !== 0) {
      throw result.errors[0].message;
    }
    dispatch({
      type: ListPostsEnum.LIST_POSTS_SUCCESS,
      payload: result.data.listPosts,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ListPostsEnum.LIST_POSTS_ERROR,
      payload: error,
    });
  }
};

export const deletePost =
  (postId: string) =>
  async (dispatch: Dispatch<DeletePostAction>, getState: any) => {
    const { loginUser } = getState();
    const { data } = loginUser;

    data === null &&
      dispatch({
        type: DeletePostEnum.DELETE_POST_ERROR,
        payload: 'Please login to view posts',
      });

    dispatch({
      type: DeletePostEnum.DELETE_POST,
    });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: deletePostMutation(postId),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${data.token}`,
        },
      });

      const result = await response.json();
      if (result.errors && result.errors.length !== 0) {
        throw result.errors[0].message;
      }

      dispatch({
        type: DeletePostEnum.DELETE_POST_SUCCESS,
        payload: result.data.deletePost,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: DeletePostEnum.DELETE_POST_ERROR,
        payload: error,
      });
    }
  };

export const getPostById =
  (_id: string) => async (dispatch: Dispatch<GetPostByIdAction>) => {
    dispatch({
      type: GetPostByIdEnum.GET_POST_BY_ID,
    });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: getPostByIdQuery(_id),
        headers: {
          'content-type': 'application/json',
        },
      });

      const result = await response.json();
      if (result.errors && result.errors.length !== 0) {
        throw result.errors[0].message;
      }

      dispatch({
        type: GetPostByIdEnum.GET_POST_BY_ID_SUCCESS,
        payload: result.data.getPostById,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GetPostByIdEnum.GET_POST_BY_ID_ERROR,
        payload: error,
      });
    }
  };
