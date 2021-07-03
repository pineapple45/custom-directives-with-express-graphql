import * as usersResolver from './users';
import * as postsResolver from './posts';

const rootResolver: any = {
  ...usersResolver,
  ...postsResolver,
};

export default rootResolver;
