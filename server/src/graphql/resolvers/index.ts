import * as usersResolver from './users';
import * as postsResolver from './posts';
import * as commentsResolver from './comments';

const rootResolver: any = {
  ...usersResolver,
  ...postsResolver,
  ...commentsResolver,
};

export default rootResolver;
