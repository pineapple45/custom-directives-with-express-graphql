import Post from '../../../models/Post';

import { transformPost } from '../utils';

export interface PostType {
  _id?: string;
  image?: string;
  title: string;
  description?: string;
  creatorId: string;
}

interface PostArgsType {
  post: PostType;
}

export const listPosts = async () => {
  try {
    const posts = await Post.find();
    return posts.map((post: PostType) => {
      return transformPost(post);
    });
  } catch (error) {
    throw error;
  }
};

export const getPostById = async (args: { _id: string }) => {
  try {
    const post = await Post.findById(args._id);
    return transformPost(post);
  } catch (error) {
    throw error;
  }
};

export const createPost = async (args: PostArgsType) => {
  const post = new Post({
    image: args.post.image,
    title: args.post.title,
    description: args.post.description,
    creatorId: args.post.creatorId,
  });

  try {
    const result = await post.save();
    return transformPost(result);
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (_id: string) => {
  try {
    await Post.findByIdAndDelete(_id);
    return `post removed successfully`;
  } catch (error) {
    throw error;
  }
};
