import { deleteLikeMutation } from '../../graphql/mutations';
import { getPostByIdQuery } from '../../graphql/queries';
import { useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthProvider';

const useDeleteLike = () => {
  const { isLoggedIn } = useAuth();

  const [deleteLike, { data, loading, error }] =
    useMutation(deleteLikeMutation);

  const handleDeleteLike = async (vars: any, options?: any) => {
    if (!isLoggedIn()) {
      return {
        error: true,
        data: { message: 'Please Login to interact with posts' },
      };
    }

    try {
      const { data } = await deleteLike({
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
    deleteLikeMutationHandler: handleDeleteLike,
    data,
    isLoading: loading,
    error,
  };
};

export default useDeleteLike;
