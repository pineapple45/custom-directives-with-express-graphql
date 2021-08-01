import { deletePostMutation } from '../../graphql/mutations';
import { listPostsQuery } from '../../graphql/queries';
import { useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthProvider';

const useDeletePost = () => {
  const { isLoggedIn } = useAuth();

  const [deletePost, { data, loading, error }] =
    useMutation(deletePostMutation);

  const handleDeletePost = async (vars: any, options?: any) => {
    if (!isLoggedIn()) {
      return { error: true, data: { message: 'Please Login to delete posts' } };
    }

    try {
      const { data } = await deletePost({
        variables: { ...vars },
        refetchQueries: [{ query: listPostsQuery }],
      });

      return { error: false, data: data };
    } catch (error: any) {
      return { error: true, data: error };
    }
  };

  return {
    deletePostMutationHandler: handleDeletePost,
    data,
    isLoading: loading,
    error,
  };
};

export default useDeletePost;
