import { createCommentMutation } from '../../graphql/mutations';
import { getPostByIdQuery } from '../../graphql/queries';
import { useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthProvider';

const useCreateComment = () => {
  const { isLoggedIn } = useAuth();

  const [createComment, { data, loading, error }] = useMutation(
    createCommentMutation
  );

  const handleCreateComment = async (vars: any, options?: any) => {
    if (!isLoggedIn()) {
      return {
        error: true,
        data: { message: 'Please Login to create comments' },
      };
    }

    try {
      const { data } = await createComment({
        variables: {
          ...vars,
        },
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
    createCommentMutationHandler: handleCreateComment,
    data,
    isLoading: loading,
    error,
  };
};

export default useCreateComment;
