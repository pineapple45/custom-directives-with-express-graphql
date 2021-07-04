import jwt from 'jsonwebtoken';

export const isAuthenticated = async (
  resolve: any,
  directiveArgs: any,
  obj: any,
  context: any,
  info: any
) => {
  // console.log(context.req);
  const authHeader = context.req.get('Authorization');
  console.log(authHeader);
  if (authHeader === undefined || context.authHeader === '')
    throw new Error(`you are unauthenticated`);

  const token = authHeader.split(' ')[1];
  if (!token || token === '') throw new Error('Token not found or has expired');

  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  } catch (error: any) {
    if (!token || token === '') throw new Error(error);
  }

  if (!decodedToken) throw new Error('Token verification failed');

  return resolve();
};
