import { UserType } from './users';

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
