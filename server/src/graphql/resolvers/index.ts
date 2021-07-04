import * as usersResolver from './users';
import * as postsResolver from './posts';
import * as commentsResolver from './comments';
import * as likesResolver from './likes';

const rootResolver: any = {
  ...usersResolver,
  ...postsResolver,
  ...commentsResolver,
  ...likesResolver,
};

export default rootResolver;
