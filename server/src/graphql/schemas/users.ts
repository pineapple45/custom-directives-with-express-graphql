export const types = `
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

input UserInput {
    username: String!
    email: String!
    password: String!
}
`;

export const queries = `
listUsers: [User!] @hasAuthorisation(roles: [ADMIN])  
getUserById(_id: ID!): User! 
login(usernameOrEmail: String!, password: String!): AuthData!
`;

export const mutations = `
createUser(user: UserInput): User
  deleteUser(_id: ID!): String @hasAuthorisation(roles: [ADMIN])
  assignRole(role: String! , assignedBy: ID!, assignedUser: ID!): User @hasAuthorisation(roles: [ADMIN])

`;

export const subscriptions = ``;
