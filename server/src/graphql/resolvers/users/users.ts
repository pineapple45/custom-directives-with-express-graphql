import User, { Role } from '../../../models/User';
import {
  transformUser,
  ValidateEmail,
  checkIfValIsUsernameOrEmail,
} from '../utils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError, StringValueNode } from 'graphql';

interface UserArgsType {
  user: UserType;
}

export interface UserType {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: Role;
}

interface UserLoginArgs {
  usernameOrEmail: string;
  password: string;
}

export const listUsers = async () => {
  try {
    const users = await User.find();
    return users.map((user: UserType) => {
      return transformUser(user);
    });
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (args: { _id: string }) => {
  try {
    const user = await User.findById(args._id);
    return transformUser(user);
  } catch (error) {
    throw error;
  }
};

export const assignRole = async (args: {
  role: Role | string;
  assignedBy: string;
  assignedUser: string;
}) => {
  try {
    if (
      args.role === '' ||
      args.assignedBy === '' ||
      args.assignedUser === ''
    ) {
      throw new Error('Please specify the role to be assigned');
    }

    const assigny = await User.findById(args.assignedBy);
    if (!assigny) {
      throw new Error('The user who is assigning role is not present in db');
    }

    const userToBeAssigned = await User.findById(args.assignedUser);
    if (userToBeAssigned.role === 'ADMIN')
      throw new Error(`User is already assigned ${args.role} role`);

    const updatedUser = await User.findOneAndUpdate(
      { _id: args.assignedUser },
      { role: args.role }
    );

    const result = await User.findById(args.assignedUser);

    return transformUser(result);
  } catch (error) {
    throw error;
  }
};

export const createUser = async (args: UserArgsType) => {
  if (
    args.user.email === '' ||
    args.user.username === '' ||
    args.user.password === ''
  )
    throw new Error('Please fill all form feilds ');

  if (!ValidateEmail(args.user.email))
    throw new Error('Please enter valid email');

  const userInDb = await User.findOne({
    email: args.user.email,
    username: args.user.username,
  });

  if (userInDb) {
    throw new Error(
      'user with same username or email already exists in database'
    );
  }

  const hashedPassword = await bcrypt.hash(args.user.password, 12);

  const user = new User({
    username: args.user.username,
    email: args.user.email,
    password: hashedPassword,
  });

  try {
    const result = await user.save();
    return transformUser(result);
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (_id: string) => {
  try {
    await User.findByIdAndDelete(_id);
    return `user account removed successfully`;
  } catch (error) {
    throw error;
  }
};

export const login = async (args: UserLoginArgs) => {
  if (args.usernameOrEmail === '' || args.password === '')
    throw new Error('Please fill all form feilds ');

  const loginArgs = checkIfValIsUsernameOrEmail(args.usernameOrEmail);

  if (loginArgs.type === 'email') {
    const emailCheck = await User.findOne({
      email: loginArgs.email,
    });

    if (!emailCheck) {
      throw new Error(`No account found with email ${loginArgs.email}`);
    }

    const data = passwordCheck(args, emailCheck);
    return data;
  } else {
    const usernameCheck = await User.findOne({
      username: loginArgs.username,
    });

    if (!usernameCheck) {
      throw new Error(`No account found with username ${loginArgs.username}`);
    }

    const data = passwordCheck(args, usernameCheck);
    return data;
  }
};

const passwordCheck = async (args: UserLoginArgs, user: UserType) => {
  const isEqual = await bcrypt.compare(args.password, user.password);
  if (!isEqual) {
    throw new GraphQLError('Password is incorrect!');
  }
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: '1h',
    }
  );
  return {
    userId: user._id,
    token: token,
    tokenExpiration: 1,
    username: user.username,
    role: user.role,
  };
};
