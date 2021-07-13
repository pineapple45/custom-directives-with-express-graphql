import User from '../../models/User';
import Post from '../../models/Post';
import Comment from '../../models/Comment';
import Like from '../../models/Like';
import { LikeType } from './likes';
import { UserType } from './users';
import { CommentType } from './comments';
import { PostType } from './posts';

export const transformLike = (like: LikeType) => {
  return {
    _id: like._id,
    post: singlePost.bind(this, like.postId),
    creator: singleUser.bind(this, like.creatorId),
  };
};

export const transformComment = (comment: CommentType) => {
  return {
    _id: comment._id,
    text: comment.text,
    post: singlePost.bind(this, comment.postId),
    creator: singleUser.bind(this, comment.creatorId),
  };
};

export const transformPost = (post: PostType) => {
  return {
    _id: post._id,
    image: post.image,
    title: post.title,
    description: post.description,
    creator: singleUser.bind(this, post.creatorId),
    commentList: [], // return empty array for now. we will add comments functionality in a bit
    likeList: [], // return empty array for now. we will add likes functionality in a bit
  };
};

export const transformUser = (user: UserType) => {
  if (!user)
    return {
      _id: 'deleted_user',
      email: 'deleted_user',
      username: 'deleted_user',
      role: 'deleted_user',
      password: null,
      postList: [], // return empty array as user has been deleted!
      commentList: [], // return empty array as user has been deleted!
      likeList: [], // return empty array as user has been deleted!
      /* functionality can be increased so as all user's comments, likes or posts(for admins)
       could be deleted before the user itself is deleted from database  */
    };
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    password: null,
    postList: [], // return empty array for now. we will add posts functionality in a bit
    commentList: [], // return empty array for now. we will add comments functionality in a bit
    likeList: [], // return empty array for now. we will add likes functionality in a bit
  };
};

export const singleUser = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return transformUser(user);
  } catch (error) {
    throw error;
  }
};

export const postsByCreatorId = async (creatorId: string) => {
  try {
    const posts = await Post.find({ creatorId: creatorId });
    return posts.map((post: PostType) => {
      return transformPost(post);
    });
  } catch (error) {
    throw error;
  }
};

export const singlePost = async (postId: string) => {
  try {
    const post = await Post.findById(postId);
    return transformPost(post);
  } catch (error) {
    throw error;
  }
};

export const commentsByPostId = async (postId: string) => {
  try {
    const comments = await Comment.find({ postId: postId });
    return comments.map((comment: CommentType) => {
      return transformComment(comment);
    });
  } catch (error) {
    throw error;
  }
};

export const commentsByCreatorId = async (creatorId: string) => {
  try {
    const comments = await Comment.find({ creatorId: creatorId });
    return comments.map((comment: CommentType) => {
      return transformComment(comment);
    });
  } catch (error) {
    throw error;
  }
};

export const likesByPostId = async (postId: string) => {
  try {
    const likes = await Like.find({ postId: postId });
    return likes.map((like: any) => {
      return transformLike(like);
    });
  } catch (error) {
    throw error;
  }
};

export const likesByCreatorId = async (creatorId: string) => {
  try {
    const likes = await Like.find({ creatorId: creatorId });
    return likes.map((like: LikeType) => {
      return transformLike(like);
    });
  } catch (error) {
    throw error;
  }
};
