import User, { Role } from '../../../models/User';
import { transformUser } from '../utils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
  role: Role;
  assignedBy: string;
  assignedUser: string;
}) => {
  try {
    const assigny = await User.findById(args.assignedBy);
    if (!assigny) {
      throw new Error('The user who is assigning role is not present in db');
    }

    const userToBeAssigned = await User.findById(args.assignedUser);
    if (userToBeAssigned._doc.role === 'ADMIN')
      throw new Error(`User is already assigned ${args.role} role`);

    const updatedUser = await User.updateOne(
      { _id: args.assignedUser },
      { $set: { role: args.role } }
    );

    const result = await User.findById(args.assignedUser);
    return transformUser(result);
  } catch (error) {
    throw error;
  }
};

export const createUser = async (args: UserArgsType) => {
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
  const login = checkIfValIsUsernameOrEmail(args.usernameOrEmail);

  if (login.type === 'email') {
    const emailCheck = await User.findOne({
      email: login.email,
    });

    if (!emailCheck) {
      throw new Error(`No account found with email ${login.email}`);
    }

    console.log('emailCheck', emailCheck);

    const data = passwordCheck(args, emailCheck);
    return data;
  } else {
    console.log(login.username);
    const usernameCheck = await User.findOne({
      username: login.username,
    });

    console.log(usernameCheck);

    if (!usernameCheck) {
      throw new Error(`No account found with username ${login.username}`);
    }

    const data = passwordCheck(args, usernameCheck);
    return data;
  }
};

const passwordCheck = async (args: UserLoginArgs, user: UserType) => {
  const isEqual = await bcrypt.compare(args.password, user.password);
  if (!isEqual) {
    throw new Error('Password is incorrect!');
  }
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: '1h',
    }
  );
  return { userId: user._id, token: token, tokenExpiration: 1 };
};

const checkIfValIsUsernameOrEmail = (usernameOrEmail: string) => {
  // Check if email
  if (/\@/.test(usernameOrEmail)) {
    //its email address
    // your code goes here
    return {
      type: 'email',
      email: usernameOrEmail,
    };
  } else {
    //its username
    // your code goes here
    return {
      type: 'username',
      username: usernameOrEmail,
    };
  }
};
