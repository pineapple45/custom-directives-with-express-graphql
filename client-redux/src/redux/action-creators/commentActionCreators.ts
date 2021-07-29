import { Dispatch } from 'redux';
import {
  createCommentMutation,
  deleteCommentMutation,
} from '../../graphql/mutations';
import { CreateCommentEnum, DeleteCommentEnum } from '../action-types';
import {
  CreateCommentAction,
  DeleteCommentAction,
} from '../actions/commentActions';
import { backendUrl } from '../constants';

export interface CreateCommentArgs {
  text: string;
  postId: string;
  creatorId: string;
}

export const createComment = (args: CreateCommentArgs) => {
  return async (dispatch: Dispatch<CreateCommentAction>, getState: any) => {
    const { loginUser } = getState();
    const { data } = loginUser;

    data === null &&
      dispatch({
        type: CreateCommentEnum.CREATE_COMMENT_ERROR,
        payload: 'Please Login to comment on posts',
      });

    dispatch({
      type: CreateCommentEnum.CREATE_COMMENT,
    });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: createCommentMutation(args),
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
        type: CreateCommentEnum.CREATE_COMMENT_SUCCESS,
        payload: result.data.createComment,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CreateCommentEnum.CREATE_COMMENT_ERROR,
        payload: error,
      });
    }
  };
};

export const deleteComment =
  (_id: string) =>
  async (dispatch: Dispatch<DeleteCommentAction>, getState: any) => {
    const { loginUser } = getState();
    const { data } = loginUser;

    data === null &&
      dispatch({
        type: DeleteCommentEnum.DELETE_COMMENT_ERROR,
        payload: 'Please Login to delete comments',
      });

    dispatch({
      type: DeleteCommentEnum.DELETE_COMMENT,
    });

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: deleteCommentMutation(_id),
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
        type: DeleteCommentEnum.DELETE_COMMENT_SUCCESS,
        payload: result.data.deleteComment,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: DeleteCommentEnum.DELETE_COMMENT_ERROR,
        payload: error,
      });
    }
  };
