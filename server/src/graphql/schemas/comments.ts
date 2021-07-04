export const types = `
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
`;

export const queries = `
listComments: [Comment!]
getCommentById(_id: ID!): Comment! 
`;

export const mutations = `
createComment(comment: CommentInput): Comment
  deleteComment(_id: ID!): String @hasAuthorisation(roles: [ADMIN,MODERATOR])
`;

export const subscriptions = ``;
