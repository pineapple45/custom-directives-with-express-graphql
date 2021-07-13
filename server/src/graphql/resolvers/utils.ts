import User from '../../models/User';
import Post from '../../models/Post';
import Comment from '../../models/Comment';
import { UserType } from './users';
import { PostType } from './posts';
import { CommentType } from './comments';

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
    postList: postsByCreatorId.bind(this, user._id!),
    commentList: commentsByCreatorId.bind(this, user._id!),
    likeList: [], // return empty array for now. we will add likes functionality in a bit
  };
};

export const transformPost = (post: PostType) => {
  return {
    _id: post._id,
    image: post.image,
    title: post.title,
    description: post.description,
    creator: singleUser.bind(this, post.creatorId),
    commentList: commentsByPostId.bind(this, post._id!),
    likeList: [], // return empty array for now. we will add likes functionality in a bit
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
