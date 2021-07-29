import { LoginUserArgs } from '../redux/action-creators';

export const loginUserQuery = ({ usernameOrEmail, password }: LoginUserArgs) =>
  JSON.stringify({
    query: `query {
      login(usernameOrEmail: "${usernameOrEmail}", password:"${password}"){
        userId
        token
        tokenExpiration
      }
    }`,
  });

export const listPostsQuery = () =>
  JSON.stringify({
    query: `query {
      listPosts{
        _id
        image
        title
        description
        creator{
          _id
          username
        }
        commentList{
          _id
          post{
            _id
          }
          creator{
            _id
          }
        }
        likeList{
          _id
          post{
            _id
          }
          creator{
            _id
          }
        }
      }
    }`,
  });

export const getPostByIdQuery = (_id: string) =>
  JSON.stringify({
    query: `query {
      getPostById(_id: "${_id}") {
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
    `,
  });

export const listUsersQuery = () =>
  JSON.stringify({
    query: `query {
      listUsers{
        _id
        username
        email
        role
      }
    }`,
  });

export const getUserByIdQuery = (_id: string) =>
  JSON.stringify({
    query: `query {
      getUserById(_id:"${_id}"){
        _id
        username
        email
        role
        postList{
          _id
          title
        }
        commentList{
          _id
          text
        }
      }
    }`,
  });
