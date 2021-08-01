import { loginUserQuery } from '../../graphql/queries';
import ApolloClient from '../../lib/apollo-client';
const client = ApolloClient({});

const useLoginUser = () => {
  const handleUserLogin = async (vars: any, options?: any) => {
    try {
      const { data } = await client.query({
        query: loginUserQuery,
        variables: vars,
      });

      return { error: false, data: data };
    } catch (error: any) {
      return { error: true, data: error };
    }
  };

  return {
    loginUserQueryHandler: handleUserLogin,
  };
};

export default useLoginUser;
