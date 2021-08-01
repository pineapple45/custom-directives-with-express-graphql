import { createLikeMutation } from '../../graphql/mutations';
import { getPostByIdQuery } from '../../graphql/queries';
import { useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthProvider';

const useCreateLike = () => {
  const { isLoggedIn } = useAuth();

  const [createLike, { data, loading, error }] =
    useMutation(createLikeMutation);

  const handleCreateLike = async (vars: any, options?: any) => {
    if (!isLoggedIn()) {
      return {
        error: true,
        data: { message: 'Please Login to interact with posts' },
      };
    }

    try {
      const { data } = await createLike({
        variables: { ...vars },
        refetchQueries: [
          { query: getPostByIdQuery, variables: { _id: options.postId } },
        ],
      });

      return { error: false, data: data };
    } catch (error: any) {
      return { error: true, data: error };
    }
  };

  return {
    createLikeMutationHandler: handleCreateLike,
    data,
    isLoading: loading,
    error,
  };
};

export default useCreateLike;
