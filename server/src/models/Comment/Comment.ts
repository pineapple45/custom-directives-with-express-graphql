import { Schema, model } from 'mongoose';

interface CommentType {
  text: string;
  postId: string;
  creatorId: string;
}

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default model('Comment', commentSchema);
