import { deleteCommentMutation } from '../../graphql/mutations';
import { getPostByIdQuery } from '../../graphql/queries';
import { useMutation } from '@apollo/client';
import { useAuth } from '../../context/AuthProvider';

const useDeleteComment = () => {
  const { isLoggedIn } = useAuth();

  const [deleteComment, { data, loading, error }] = useMutation(
    deleteCommentMutation
  );

  const handleDeleteComment = async (vars: any, options?: any) => {
    if (!isLoggedIn()) {
      return {
        error: true,
        data: { message: 'Please Login to delete comments' },
      };
    }

    try {
      const { data } = await deleteComment({
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
    deleteCommentMutationHandler: handleDeleteComment,
    data,
    isLoading: loading,
    error,
  };
};

export default useDeleteComment;
