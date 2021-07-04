import Comment from '../../../models/Comment';
import { transformComment } from '../utils';

export interface CommentType {
  _id: string;
  text: string;
  postId: string;
  creatorId: string;
}

interface CommentArgsType {
  comment: CommentType;
}

export const listComments = async () => {
  try {
    const comments = await Comment.find();
    return comments.map((comment: CommentType) => {
      return transformComment(comment);
    });
  } catch (error) {
    throw error;
  }
};

export const getCommentById = async (args: { _id: string }) => {
  try {
    const comment = await Comment.findById(args._id);
    return transformComment(comment);
  } catch (error) {
    throw error;
  }
};

export const createComment = async (args: CommentArgsType) => {
  const comment = new Comment({
    text: args.comment.text,
    postId: args.comment.postId,
    creatorId: args.comment.creatorId,
  });

  try {
    const result = await comment.save();
    return transformComment(result);
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (_id: string) => {
  try {
    await Comment.findByIdAndDelete(_id);
    return `comment removed successfully`;
  } catch (error) {
    throw error;
  }
};
