import {gql} from "../pkg/@apollo/client.js";
export const createUserMutation = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(
      user: { username: $username, email: $email, password: $password }
    ) {
      _id
      username
      email
      role
    }
  }
`;
export const createPostMutation = gql`
  mutation CreatePost(
    $image: String
    $title: String!
    $description: String
    $creatorId: ID!
  ) {
    createPost(
      post: {
        image: $image
        title: $title
        description: $description
        creatorId: $creatorId
      }
    ) {
      _id
      image
      title
      description
      creator {
        _id
        username
        email
        role
      }
    }
  }
`;
export const deletePostMutation = gql`
  mutation DeletePost($_id: ID!) {
    deletePost(_id: $_id)
  }
`;
export const assignRoleMutation = gql`
  mutation AssignRole($role: String!, $assignedBy: ID!, $assignedUser: ID!) {
    assignRole(
      role: $role
      assignedBy: $assignedBy
      assignedUser: $assignedUser
    ) {
      _id
      username
      email
      role
    }
  }
`;
export const createLikeMutation = gql`
  mutation CreateLike($postId: ID!, $creatorId: ID!) {
    createLike(like: { postId: $postId, creatorId: $creatorId }) {
      _id
      post {
        _id
      }
      creator {
        _id
      }
    }
  }
`;
export const deleteLikeMutation = gql`
  mutation DeleteLike($_id: ID!) {
    deleteLike(_id: $_id)
  }
`;
export const createCommentMutation = gql`
  mutation CreateComment($text: String!, $postId: ID!, $creatorId: ID!) {
    createComment(
      comment: { text: $text, postId: $postId, creatorId: $creatorId }
    ) {
      _id
      text
      post {
        _id
      }
      creator {
        _id
      }
    }
  }
`;
export const deleteCommentMutation = gql`
  mutation DeleteComment($_id: ID!) {
    deleteComment(_id: $_id)
  }
`;
export const deleteUserMutation = gql`
  mutation DeletUser($_id: ID!) {
    deleteUser(_id: $_id)
  }
`;
