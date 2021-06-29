import { Schema, model } from 'mongoose';

export enum Role {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  AUTH_USER = 'AUTH_USER',
}

interface UserSchemaType {
  username: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new Schema<UserSchemaType>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    requried: true,
    min: [6, 'password must be greater or equal to 6 characters'],
  },
  role: {
    type: String,
    default: Role.AUTH_USER,
  },
});

export default model('User', userSchema);
