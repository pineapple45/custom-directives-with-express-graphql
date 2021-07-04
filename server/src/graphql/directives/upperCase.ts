export const upperCase = async (
  resolve: any,
  directiveArgs: any,
  obj: any,
  context: any,
  info: any
) => {
  const value = await resolve();
  return String(value).toUpperCase();
};
