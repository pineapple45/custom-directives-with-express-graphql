import { buildSchema } from 'graphql';

const schema = buildSchema(`

input PostInput {
    image: String
    title: String!
    description: String
    creatorId: ID!
}

type Post {
    _id: ID!
    image: String
    title: String!
    description: String
    creator: User!
    commentList: [Comment!]
    likeList: [Like!]
}

input CommentInput {
    text: String!
    postId: ID!
    creatorId: ID!
}

type Comment {
    _id: ID!
    text: String!
    post: Post!
    creator: User!
}

input LikeInput {
    postId: ID!
    creatorId: ID!
}

type Like {
    _id: ID!
    post: Post!
    creator: User!
}

enum Role {
    AUTH_USER
    ADMIN
    MODERATOR
}

input UserInput {
    username: String!
    email: String!
    password: String!
}

type User {
    _id: ID!
    username: String! 
    email: String!
    password: String
    role: Role!
    postList: [Post!]
    commentList: [Comment!]
    likeList: [Like!]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

type RootQuery {
  listUsers: [User!] 
  getUserById(_id: ID!): User!
  listPosts: [Post!]
  getPostById(_id: ID!): Post!
  listComments: [Comment!]
  getCommentById(_id: ID!): Comment!
  listLikes: [Like!]
  getLikeById(_id: ID!): Like!
  login(usernameOrEmail: String!, password: String!): AuthData!
}

type RootMutation {
  createUser(user: UserInput): User
  deleteUser(_id: ID!): String 
  createPost(post: PostInput): Post 
  deletePost(_id: ID!): String 
  createComment(comment: CommentInput): Comment
  deleteComment(_id: ID!): String 
  createLike(like: LikeInput): Like
  deleteLike(_id: ID!): String
  assignRole(role: String! , assignedBy: ID!, assignedUser: ID!): User 
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);

export default schema;
