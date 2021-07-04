export const types = `
input LikeInput { 
    postId: ID!
    creatorId: ID!
}

type Like {
    _id: ID!
    post: Post!
    creator: User!
}
`;

export const queries = `
  listLikes: [Like!]
  getLikeById(_id: ID!): Like!
`;

export const mutations = `
createLike(like: LikeInput): Like
  deleteLike(_id: ID!): String
`;

export const subscriptions = ``;
