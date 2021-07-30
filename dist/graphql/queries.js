import {gql} from "../pkg/@apollo/client.js";
export const loginUserQuery = gql`
  query Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      userId
      token
      tokenExpiration
      username
      role
    }
  }
`;
export const listPostsQuery = gql`
  query {
    listPosts {
      _id
      image
      title
      description
      creator {
        _id
        username
      }
      commentList {
        _id
        post {
          _id
        }
        creator {
          _id
        }
      }
      likeList {
        _id
        post {
          _id
        }
        creator {
          _id
        }
      }
    }
  }
`;
export const getPostByIdQuery = gql`
  query GetPostById($_id: ID!) {
    getPostById(_id: $_id) {
      _id
      image
      title
      description
      creator {
        username
      }
      commentList {
        _id
        text
        creator {
          username
        }
      }
    }
  }
`;
export const listUsersQuery = gql`
  query {
    listUsers {
      _id
      username
      email
      role
    }
  }
`;
export const getUserByIdQuery = gql`
  query GetUserById($_id: ID!) {
    getUserById(_id: _id) {
      _id
      username
      email
      role
      postList {
        _id
        title
      }
      commentList {
        _id
        text
      }
    }
  }
`;
