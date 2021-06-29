import { Schema, model } from 'mongoose';

interface PostType {
  image: string;
  title: string;
  description: string;
  creatorId: string;
}

const postSchema = new Schema<PostType>({
  image: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default model('Post', postSchema);
