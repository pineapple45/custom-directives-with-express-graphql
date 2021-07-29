import {
  CreateUserArgs,
  CreatePostArgs,
  CreateLikeArgs,
  CreateCommentArgs,
  AssignRoleToUserArgs,
} from '../redux/action-creators';

// create User mutation
export const createUserMutation = ({
  username,
  email,
  password,
}: CreateUserArgs) =>
  JSON.stringify({
    query: `mutation {
    createUser(user: {username: "${username}", email:"${email}", password:"${password}"}){
      _id
      username
      email
      role
    }
  }`,
  });

// create post mutation
export const createPostMutation = ({
  title,
  description,
  image,
  creatorId,
}: CreatePostArgs) =>
  JSON.stringify({
    query: `mutation {
    createPost(post: {image:"${image}",title:"${title}",description:"${description}",creatorId:"${creatorId}"}){
      _id
      image
      title
      description
      creator{
        _id
        username
        email
        role
      }
    }
  }`,
  });

// create post mutation
export const deletePostMutation = (_id: string) =>
  JSON.stringify({
    query: `mutation {
    deletePost(_id:"${_id}")
  }`,
  });

// create post mutation
export const assignRoleMutation = ({
  role,
  assignedBy,
  assignedUser,
}: AssignRoleToUserArgs) =>
  JSON.stringify({
    query: `mutation {
  assignRole(role: "${role}", assignedBy: "${assignedBy}",assignedUser:"${assignedUser}"){
    _id
    username
    email
    role
  }
}`,
  });

// create like mutation
export const createLikeMutation = ({ postId, creatorId }: CreateLikeArgs) =>
  JSON.stringify({
    query: `mutation {
      createLike(like: {postId: "${postId}",creatorId:"${creatorId}"}){
        _id
        post{
          _id
        }
        creator{
          _id
        }
      }
    }`,
  });

// delete like mutation
export const deleteLikeMutation = (_id: string) =>
  JSON.stringify({
    query: `mutation {
  deleteLike(_id:"${_id}")
}`,
  });

// create Comment mutation
export const createCommentMutation = ({
  text,
  postId,
  creatorId,
}: CreateCommentArgs) =>
  JSON.stringify({
    query: `mutation {
    createComment(comment: {text:"${text}",postId:"${postId}",creatorId:"${creatorId}"}){
      _id
      text
      post{
        _id
      }
      creator{
        _id
      }
    }
    }`,
  });

// delete Comment mutation
export const deleteCommentMutation = (_id: string) =>
  JSON.stringify({
    query: `mutation {
deleteComment(_id:"${_id}")
}`,
  });

// delete User mutation
export const deletUserMutation = (_id: string) =>
  JSON.stringify({
    query: `mutation {
deleteUser(_id:"${_id}")
}`,
  });
