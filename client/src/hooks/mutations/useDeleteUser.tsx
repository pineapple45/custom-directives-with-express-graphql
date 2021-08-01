import { deleteUserMutation } from '../../graphql/mutations';
import { listUsersQuery } from '../../graphql/queries';
import { useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthProvider';

const useDeleteUser = () => {
  const { isLoggedIn } = useAuth();

  const [deleteUser, { data, loading, error }] =
    useMutation(deleteUserMutation);

  const handleDeleteUser = async (vars: any, options?: any) => {
    if (!isLoggedIn()) {
      return { error: true, data: { message: 'Please Login to delete users' } };
    }

    try {
      const { data } = await deleteUser({
        variables: { ...vars },
        refetchQueries: [{ query: listUsersQuery }],
      });

      return { error: false, data: data };
    } catch (error: any) {
      return { error: true, data: error };
    }
  };

  return {
    deleteUserMutationHandler: handleDeleteUser,
    data,
    isLoading: loading,
    error,
  };
};

export default useDeleteUser;
