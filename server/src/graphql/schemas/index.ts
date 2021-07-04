//
import { buildSchema } from 'graphql';
import { addDirectiveResolveFunctionsToSchema } from 'graphql-directive';
import { upperCase, isAuthenticated, hasAuthorisation } from '../directives';

// import comparted schemas
import * as postsGQLSchema from './posts';
import * as commentsGQLSchema from './comments';
import * as likesGQLSchema from './likes';
import * as usersGQLSchema from './users';

const types: string[] = [];
const queries: string[] = [];
const mutations: string[] = [];
const subscriptions = [];
const schemas = [
  postsGQLSchema,
  commentsGQLSchema,
  likesGQLSchema,
  usersGQLSchema,
];

schemas.forEach((schema) => {
  types.push(schema.types);
  queries.push(schema.queries);
  mutations.push(schema.mutations);
  subscriptions.push(schema.subscriptions);
});

const schema = buildSchema(`

directive @upperCase on FIELD_DEFINITION | FIELD
directive @isAuthenticated on FIELD_DEFINITION | FIELD
directive @hasAuthorisation(roles: [Role!]) on FIELD_DEFINITION | FIELD

enum Role {
    AUTH_USER
    ADMIN
    MODERATOR
}

${types.join('\n')}


type RootQuery {
    ${queries.join('\n')}
}

type RootMutation {
${mutations.join('\n')}
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
