import Like from '../../../models/Like';
import { transformLike } from '../utils';

export interface LikeType {
  _id?: string;
  postId: string;
  creatorId: string;
}

interface LikeArgsType {
  like: LikeType;
}

export const listLikes = async () => {
  try {
    const likes = await Like.find();
    return likes.map((like: LikeType) => {
      return transformLike(like);
    });
  } catch (error) {
    throw error;
  }
};

export const getLikeById = async (args: { _id: string }) => {
  try {
    const like = await Like.findById(args._id);
    return transformLike(like);
  } catch (error) {
    throw error;
  }
};

export const createLike = async (args: LikeArgsType) => {
  const like = new Like({
    postId: args.like.postId,
    creatorId: args.like.creatorId,
  });

  try {
    const result = await like.save();
    return transformLike(result);
  } catch (error) {
    throw error;
  }
};

export const deleteLike = async (_id: string) => {
  try {
    await Like.findByIdAndDelete(_id);
    return `like removed successfully`;
  } catch (error) {
    throw error;
  }
};
