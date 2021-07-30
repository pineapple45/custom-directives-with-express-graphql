export const types = `
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
    commentList: [Comment]
    likeList: [Like]
}
`;

export const queries = `
listPosts: [Post!]
getPostById(_id: ID!): Post!
`;

export const mutations = `
createPost(post: PostInput): Post @hasAuthorisation(roles: [ADMIN])
  deletePost(_id: ID!): String @hasAuthorisation(roles: [ADMIN,MODERATOR])
`;

export const subscriptions = ``;
