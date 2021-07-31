/* This file is for reference only and has no use in the project */
import { buildSchema } from 'graphql';
import { addDirectiveResolveFunctionsToSchema } from 'graphql-directive';
import { upperCase, isAuthenticated, hasAuthorisation } from '../directives';

const schema = buildSchema(`

directive @upperCase on FIELD_DEFINITION | FIELD
directive @isAuthenticated on FIELD_DEFINITION | FIELD
directive @hasAuthorisation(roles: [Role!]) on FIELD_DEFINITION | FIELD

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
    username: String! @upperCase
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
  listUsers: [User!] @hasAuthorisation(roles: [ADMIN])
  getUserById(_id: ID!): User!
  listPosts: [Post]
  getPostById(_id: ID!): Post!
  listComments: [Comment!]
  getCommentById(_id: ID!): Comment!
  listLikes: [Like!]
  getLikeById(_id: ID!): Like!
  login(usernameOrEmail: String!, password: String!): AuthData!
}

type RootMutation {
  createUser(user: UserInput): User
  deleteUser(_id: ID!): String @hasAuthorisation(roles: [ADMIN])
  createPost(post: PostInput): Post @hasAuthorisation(roles: [ADMIN])
  deletePost(_id: ID!): String @hasAuthorisation(roles: [ADMIN,MODERATOR])
  createComment(comment: CommentInput): Comment
  deleteComment(_id: ID!): String @hasAuthorisation(roles: [ADMIN,MODERATOR])
  createLike(like: LikeInput): Like
  deleteLike(_id: ID!): String
  assignRole(role: String! , assignedBy: ID!, assignedUser: ID!): User @hasAuthorisation(roles: [ADMIN])
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);

addDirectiveResolveFunctionsToSchema(schema, {
  upperCase,
  isAuthenticated,
  hasAuthorisation,
});

export default schema;
