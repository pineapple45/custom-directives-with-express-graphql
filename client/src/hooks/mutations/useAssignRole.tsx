import { assignRoleMutation } from '../../graphql/mutations';
import { listUsersQuery } from '../../graphql/queries';
import { useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthProvider';

const useAssignRole = () => {
  const { isLoggedIn } = useAuth();

  const [assignRole, { data, loading, error }] =
    useMutation(assignRoleMutation);

  const handleAssignRole = async (vars: any, options?: any) => {
    if (!isLoggedIn()) {
      return { error: true, data: { message: 'Please Login to assign roles' } };
    }

    try {
      const { data } = await assignRole({
        variables: {
          ...vars,
        },
        refetchQueries: [{ query: listUsersQuery }],
      });

      return { error: false, data: data };
    } catch (error: any) {
      return { error: true, data: error };
    }
  };

  return {
    assignRoleMutationHandler: handleAssignRole,
    data,
    isLoading: loading,
    error,
  };
};

export default useAssignRole;
