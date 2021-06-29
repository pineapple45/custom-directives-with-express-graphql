import { Schema, model } from 'mongoose';

interface LikeType {
  postId: string;
  creatorId: string;
}

const LikeSchema = new Schema<LikeType>({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default model('Like', LikeSchema);
