import { createPostMutation } from '../../graphql/mutations';
import { listPostsQuery } from '../../graphql/queries';
import { useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthProvider';

const useCreatePost = () => {
  const { isLoggedIn } = useAuth();

  const [createPost, { data, loading, error }] =
    useMutation(createPostMutation);

  const handleCreatePost = async (vars: any, options?: any) => {
    if (!isLoggedIn()) {
      return { error: true, data: { message: 'Please Login to create posts' } };
    }

    try {
      const { data } = await createPost({
        variables: { ...vars },
        refetchQueries: [{ query: listPostsQuery }],
      });

      return { error: false, data: data };
    } catch (error: any) {
      return { error: true, data: error };
    }
  };

  return {
    createPostMutationHandler: handleCreatePost,
    data,
    isLoading: loading,
    error,
  };
};

export default useCreatePost;
