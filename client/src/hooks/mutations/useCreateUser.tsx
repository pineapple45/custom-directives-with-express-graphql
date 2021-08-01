import { createUserMutation } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';

const useCreateUser = () => {
  const [createUser, { data, loading, error }] =
    useMutation(createUserMutation);

  const handleCreateUser = async (vars: any, options?: any) => {
    try {
      const { data } = await createUser({ variables: { ...vars } });
      return { error: false, data: data };
    } catch (error: any) {
      return { error: true, data: error };
    }
  };

  return {
    createUserMutationHandler: handleCreateUser,
    isLoading: loading,
    data,
    error,
  };
};

export default useCreateUser;
