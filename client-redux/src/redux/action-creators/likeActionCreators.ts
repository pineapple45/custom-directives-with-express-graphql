import { Dispatch } from 'redux';
import { CreateLikeEnum, DeleteLikeEnum } from '../action-types';
import { CreateLikeAction, DeleteLikeAction } from '../actions/likeActions';
import {
  createLikeMutation,
  deleteLikeMutation,
} from '../../graphql/mutations';
import { backendUrl } from '../constants';

export interface CreateLikeArgs {
  postId: string;
  creatorId: string;
}

export const createLike = (args: CreateLikeArgs) => {
  return async (dispatch: Dispatch<CreateLikeAction>, getState: any) => {
    const { loginUser } = getState();
    const { data } = loginUser;

    data === null &&
      dispatch({
        type: CreateLikeEnum.CREATE_LIKE_ERROR,
        payload: 'Please Login to like posts',
      });

    dispatch({
      type: CreateLikeEnum.CREATE_LIKE,
    });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: createLikeMutation(args),
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
        type: CreateLikeEnum.CREATE_LIKE_SUCCESS,
        payload: result.data.createLike,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CreateLikeEnum.CREATE_LIKE_ERROR,
        payload: error,
      });
    }
  };
};

export const deleteLike =
  (_id: string) =>
  async (dispatch: Dispatch<DeleteLikeAction>, getState: any) => {
    const { loginUser } = getState();
    const { data } = loginUser;

    data === null &&
      dispatch({
        type: DeleteLikeEnum.DELETE_LIKE_ERROR,
        payload: 'Please Login to remove comments',
      });

    dispatch({
      type: DeleteLikeEnum.DELETE_LIKE,
    });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: deleteLikeMutation(_id),
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
        type: DeleteLikeEnum.DELETE_LIKE_SUCCESS,
        payload: result.data.deleteLike,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: DeleteLikeEnum.DELETE_LIKE_ERROR,
        payload: error,
      });
    }
  };
